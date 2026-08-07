import { ClientFormOutputs } from "@/types/form";

export interface PredictionResponse {
	prediction: number;
	labels: "positive" | "negative";
	confidence_score: number;
	positive_proba?: number;
	risk_level?: "high" | "moderate" | "low";

	feature_contributions: {
		feature: string;
		label: string;
		value: number;
		direction: "raises" | "lowers";
		weight: number;
	}[];
	missing_features_count: number;
	status?: "preview_mode";
	message?: string;
}

export const predict = async (payload: ClientFormOutputs): Promise<PredictionResponse> => {
	const response = await fetch("/api/predict", {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(payload)
	});

	const result = (await response.json()) as PredictionResponse;

	if (!response.ok) {
		const message = result.message || "Internal server error";
		throw new Error(message);
	}

	return result;
};
