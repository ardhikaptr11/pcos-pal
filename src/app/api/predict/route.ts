import { calculateClinicalMetrics } from "@/lib/calculation";
import { PayloadSchema } from "@/lib/schema";
import { ClientFormOutputs } from "@/types/form";
import { NextResponse } from "next/server";
import z from "zod";

interface MLPayload extends ClientFormOutputs {
	bmi: number;
	lhfsh_ratio: number | null;
	waisthip_ratio: number | null;
	total_follicles: number | null;
	follicles_difference: number | null;
}

export const POST = async (request: Request) => {
	try {
		const body = await request.json();

		const parsed = PayloadSchema.safeParse(body);
		if (!parsed.success) {
			return NextResponse.json(
				{ message: "Invalid form input data", details: JSON.stringify(z.treeifyError(parsed.error), null, 2) },
				{
					status: 400
				}
			);
		}

		const data = parsed.data;

		const dataToBeCalculated = {
			height_cm: data.height_cm,
			weight_kg: data.weight_kg,
			lh_miuml: data.lh_miuml,
			fsh_miuml: data.fsh_miuml,
			waist_inch: data.waist_inch,
			hip_inch: data.hip_inch,
			follicle_no_l: data.follicle_no_l,
			follicle_no_r: data.follicle_no_r
		};

		const computedMetrics = calculateClinicalMetrics(dataToBeCalculated);

		const mlPayload: MLPayload = {
			...computedMetrics,
			...data
		};

		const mlEndpoint = process.env.ML_MODEL_ENDPOINT || "http://localhost:8000/api/inference";

		const headers: Record<string, string> = { "Content-Type": "application/json" };
		if (process.env.ML_MODEL_AUTH_HEADER) {
			headers["Authorization"] = `Bearer ${process.env.ML_MODEL_AUTH_HEADER}`;
		}

		try {
			const response = await fetch(mlEndpoint, {
				method: "POST",
				headers,
				body: JSON.stringify(mlPayload)
			});

			if (!response.ok) {
				const errorText = await response.text();
				return NextResponse.json({ message: response.statusText, details: errorText }, { status: response.status });
			}

			const result: unknown = await response.json();
			return NextResponse.json(result);
		} catch (err) {
			const message = err instanceof Error ? err.message : "Connection failed";

			console.warn("Could not connect to FastAPI server. Running in simulated fallback mode.", message);

			const proba = calculateHeuristicScore(mlPayload);
			const prediction = proba >= 0.5 ? 1 : 0;
			const riskLevel = proba >= 0.6 ? "high" : proba >= 0.25 ? "moderate" : "low";

			return NextResponse.json({
				status: "preview_mode",
				message: `FastAPI server unavailable (${message}). Returning simulated heuristic result.`,
				prediction,
				positive_proba: Number(proba.toFixed(4)),
				labels: prediction === 1 ? "positive" : "negative",
				confidence_score: Number((prediction === 1 ? proba : 1 - proba).toFixed(4)),
				risk: riskLevel,
				data: mlPayload // Include payload for inspectability
			});
		}
	} catch (err) {
		const message = err instanceof Error ? err.message : "Unknown error";
		return NextResponse.json({ error: "Failed to calculate inference features", details: message }, { status: 500 });
	}
};

// Helper for preview mode
function calculateHeuristicScore(data: MLPayload): number {
	let score = 0;
	if (data.bmi > 25) score += 20;
	if (data.weight_gain_yn === 1) score += 15;
	if (data.hair_growth_yn === 1) score += 15;
	if (data.skin_darkening_yn === 1) score += 10;
	if (data.hair_loss_yn === 1) score += 10;
	if (data.pimples_yn === 1) score += 10;
	if (data.cycle_length_days > 35) score += 20;

	return Math.min(score, 100) / 100;
}
