"use client";

import { PredictionResponse } from "@/lib/action";
import { cn } from "@/lib/utils";
import { ChevronDown, Copy, FileJson } from "lucide-react";
import { useState } from "react";
import FeatureContributions from "../FeatureContributions";
import { Payload } from "../layout/Content";
import RiskGauge from "../RiskGauge";
import { Button } from "../ui/button";

interface PropsType {
	predictionResult: PredictionResponse;
	payload: Payload;
}

const ResultSection = ({ predictionResult, payload }: PropsType) => {
	const [isOpen, setIsOpen] = useState(false);

	const [isCopied, setIsCopied] = useState(false);

	console.log(predictionResult);

	const handleCopy = async () => {
		try {
			await navigator.clipboard.writeText(JSON.stringify(payload, null, 2));
			setIsCopied(true);
			setTimeout(() => {
				setIsCopied(false);
			}, 2000);
		} catch (err) {
			console.error("Gagal menyalin teks: ", err);
		}
	};

	return (
		<section className="px-6 lg:px-10" id="result">
			<div className="space-y-6">
				<div className="space-y-1">
					<p className="text-[11px] uppercase tracking-[0.24em] text-taupe">04 · Result</p>
					<h2 className="font-serif text-3xl text-espresso">Your assessment</h2>
				</div>

				<div className="bg-white border border-rose-soft rounded-none overflow-hidden">
					<div className="grid md:grid-cols-5 gap-0">
						<div className="md:col-span-2 p-8 md:p-10 border-b md:border-b-0 md:border-r border-rose-soft bg-background">
							<h3 className="text-[11px] uppercase tracking-[0.24em] text-taupe font-sans">
								{predictionResult.status === "preview_mode" ? "Simulated Result" : "Your Result"}
							</h3>
							<RiskGauge
								labels={predictionResult.labels}
								confidence={predictionResult.confidence_score ?? predictionResult.positive_proba}
								riskLevel={predictionResult.risk_level}
							/>
						</div>
						<div className="md:col-span-3 p-8 md:p-10">
							<h3 className="font-display text-3xl text-espresso mb-1">What Influenced Your Screening</h3>
							<p className="text-taupe text-[15px] mb-6 leading-relaxed">
								The main indicators from your submitted information that played the biggest role in this evaluation,
								listed by importance.
							</p>
							<div className="space-y-8">
								<FeatureContributions contributions={predictionResult.feature_contributions} />
								<details className="mt-6 group" onClick={() => setIsOpen((prev) => !prev)}>
									<summary className="cursor-pointer text-taupe text-[13px] uppercase tracking-[0.18em] hover:text-espresso flex items-center gap-2 justify-between">
										<span className="inline-flex items-center gap-2 transition-all uppercase">
											<FileJson className="size-4" />
											Inspect Raw Inputs{" "}
										</span>

										<ChevronDown className={cn("size-4 transition-all", isOpen && "-rotate-180")} />
									</summary>
								</details>
								{isOpen && (
									<div className="relative mt-3">
										<pre className="p-4 bg-cream border border-rose-soft text-[11.5px] leading-relaxed text-espresso overflow-auto max-h-72 rounded-none font-mono">
											{JSON.stringify(payload, null, 2)}
										</pre>

										<div className="absolute top-2 right-2 group">
											<div className="pointer-events-none absolute -top-5 right-0 whitespace-nowrap rounded bg-rose-soft px-2 py-1 text-[10px] text-taupe opacity-0 transition-all duration-200 group-hover:opacity-100 group-hover:-translate-y-1">
												{isCopied ? "Copied!" : "Copy JSON"}

												<div className="absolute -bottom-1 right-2 border-x-4 border-t-4 border-x-transparent border-t-rose-soft" />
											</div>

											<Button onClick={handleCopy} variant="ghost" size="icon-xs" disabled={isCopied}>
												<Copy />
											</Button>
										</div>
									</div>
								)}
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default ResultSection;
