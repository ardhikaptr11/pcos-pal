"use client";

import { cn } from "@/lib/utils";
import { AlertCircle, AlertTriangle, CheckCircle2, Info, LucideIcon } from "lucide-react";
import { useEffect, useState } from "react";

interface RiskGaugeProps {
	confidence: number;
	labels: "positive" | "negative";
	riskLevel?: "low" | "moderate" | "high";
	positiveProba?: number;
}

const RiskGauge = ({ confidence, labels, riskLevel }: RiskGaugeProps) => {
	const [animatedScore, setAnimatedScore] = useState(0);

	useEffect(() => {
		const timer = setTimeout(() => {
			setAnimatedScore(confidence);
		}, 100);
		return () => clearTimeout(timer);
	}, [confidence]);

	const getStatusDetails = (): {
		badgeColor: string;
		label: string;
		Icon: LucideIcon;
		textColor?: string;
	} => {
		if (labels === "positive") {
			return {
				badgeColor: "bg-terracotta",
				label: "PCOS Indicated",
				Icon: AlertTriangle
			};
		}

		return {
			badgeColor: "bg-sage",
			label: "Negative",
			textColor: riskLevel === "high" ? "text-rose" : riskLevel === "moderate" ? "text-warning" : "text-sage",
			Icon: riskLevel === "high" ? AlertCircle : riskLevel === "moderate" ? Info : CheckCircle2
		};
	};

	const { badgeColor, textColor, label, Icon } = getStatusDetails();
	const percentage = Math.round(animatedScore * 100);

	const maxDash = 251.3;
	const strokeDashoffset = maxDash * (1 - animatedScore);
	const rotation = animatedScore * 180 - 90;

	return (
		<div className="md:col-span-2 bg-background flex flex-col items-center">
			<div className="relative w-full max-w-80 mx-auto">
				<svg viewBox="0 0 200 120" className="w-full">
					<defs>
						<linearGradient id="gaugeGrad" x1="0%" y1="0%" x2="100%" y2="0%">
							<stop offset="0%" stopColor="var(--sage)"></stop>
							<stop offset="50%" stopColor="var(--warning)"></stop>
							<stop offset="100%" stopColor="var(--brand-terracotta)"></stop>
						</linearGradient>
					</defs>
					<path
						d="M 20 100 A 80 80 0 0 1 180 100"
						stroke="var(--rose-soft)"
						strokeWidth="14"
						fill="none"
						strokeLinecap="round"
					/>
					<path
						d="M 20 100 A 80 80 0 0 1 180 100"
						stroke="url(#gaugeGrad)"
						strokeWidth="14"
						fill="none"
						strokeLinecap="round"
						strokeDasharray="251.3"
						strokeDashoffset={strokeDashoffset}
						style={{ transition: "stroke-dashoffset 1.2s cubic-bezier(0.22, 1, 0.36, 1)" }}
					/>
					<g
						style={{
							transform: `rotate(${rotation}deg)`,
							transformOrigin: "100px 100px",
							transition: "transform 1.2s cubic-bezier(0.22, 1, 0.36, 1)"
						}}>
						<line
							x1="100"
							y1="100"
							x2="100"
							y2="35"
							stroke="var(--espresso)"
							strokeWidth="2.5"
							strokeLinecap="round"
							style={{ transition: "stroke 1.2s ease" }}
						/>
						<circle cx="100" cy="100" r="6" fill="var(--espresso)" style={{ transition: "fill 1.2s ease" }} />
					</g>
				</svg>

				<div className="text-center -mt-2">
					<h3 className="text-5xl text-espresso tabular-nums leading-none">
						{percentage}
						<span className="text-2xl text-taupe">%</span>
						<span className="font-sans block mt-1 text-[11px] uppercase tracking-[0.2em] text-taupe font-medium">
							Model&apos;s Confidence
						</span>
					</h3>
				</div>
			</div>

			<div className="flex flex-col items-center justify-center mt-6 gap-2.5 px-4 text-center">
				<span
					className={cn(
						"inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[13px] font-medium text-white shadow-sm",
						badgeColor
					)}>
					<Icon className="size-4" aria-hidden="true" />
					{label}
				</span>
				{riskLevel && (
					<p className="text-[13px] text-espresso/70 font-medium max-w-70 text-center leading-[1.6] mt-2">
						You are classified as a <span className={cn("font-semibold capitalize", textColor)}>{riskLevel}-risk</span>{" "}
						profile for being diagnosed with PCOS.
					</p>
				)}
			</div>
		</div>
	);
};

export default RiskGauge;
