"use client";

import { PredictionResponse } from "@/lib/action";
import { ClinicalData } from "@/lib/calculation";
import { ClientFormOutputs } from "@/types/form";
import { useState } from "react";

import FormSection from "../sections/FormSection";
import HeroSection from "../sections/HeroSection";
import ResultSection from "../sections/ResultSection";

export type Payload = ClinicalData & ClientFormOutputs;

const Content = () => {
	const [predictionResult, setPredictionResult] = useState<PredictionResponse | null>(null);
	const [rawPayload, setRawPayload] = useState<Payload | null>(null);

	return (
		<main className="max-w-310 w-full mx-auto">
			<HeroSection />
			<FormSection setPredictionResult={setPredictionResult} setRawPayload={setRawPayload} />
			{predictionResult && rawPayload && <ResultSection predictionResult={predictionResult} payload={rawPayload} />}
		</main>
	);
};

export default Content;
