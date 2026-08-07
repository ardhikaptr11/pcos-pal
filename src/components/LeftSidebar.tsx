import React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface LeftSidebarProps {
	bmi: number | null;
	activeSection: string;
	hasResult: boolean;
}

export default function LeftSidebar({ bmi, activeSection, hasResult }: LeftSidebarProps) {
	const sections = [
		{ id: "basics", num: "01", label: "Basics" },
		{ id: "symptoms", num: "02", label: "Symptoms & lifestyle" },
		{ id: "advanced", num: "03", label: "Clinical findings (optional)" },
		{ id: "result", num: "04", label: "Result" }
	];

	return (
		<aside className="col-span-12 lg:col-span-3">
			<div className="lg:sticky lg:top-8 space-y-6">
				<div className="p-5 bg-white border border-rose-soft">
					<h3 className="text-[11px] uppercase tracking-[0.24em] text-taupe mb-3">BMI</h3>
					<div className="font-serif text-4xl text-espresso tabular-nums">{!bmi ? "—" : bmi}</div>
					<p className="mt-2 text-xs text-taupe leading-relaxed">Calculated instantly based on your height & weight.</p>
				</div>
				<div className="h-8 diagonal-divider" />
				<div className="space-y-3 pl-1">
					<h3 className="text-[11px] uppercase tracking-[0.24em] text-taupe">Section Flow</h3>
					<ol className="space-y-2.5 text-sm">
						{sections.map((section) => {
							const isActive = activeSection === section.id;
							return (
								<li key={section.id} className={cn(section.id === "result" && !hasResult && "hidden")}>
									<Link href={`#${section.id}`} className={cn("flex items-baseline gap-3", isActive && "font-bold")}>
										<span className="font-sans italic text-rose tabular-nums">{section.num}</span>
										<span className="text-espresso">{section.label}</span>
									</Link>
								</li>
							);
						})}
					</ol>
				</div>
			</div>
		</aside>

		// <div className="flex flex-col gap-12">
		// 	{/* Live BMI Ticker Card */}
		// 	<div className="flex flex-col gap-2 border-l-4 border-rose-border/50 pl-4 py-1">
		// 		<span className="text-[10px] font-bold tracking-widest uppercase text-taupe mb-1 flex items-center gap-2">
		// 			LIVE BMI <Activity className="w-3 h-3 text-brand-rose" />
		// 		</span>

		// 		{liveBmi !== null ? (
		// 			<div className="flex flex-col items-start gap-1">
		// 				<div className="flex items-baseline gap-1">
		// 					<span className="text-4xl font-serif text-espresso tracking-tight leading-none">{liveBmi}</span>
		// 				</div>
		// 				<p className="text-[10px] text-taupe mt-2 max-w-45 leading-relaxed">
		// 					Computed instantly from your height & weight. A determinant variable for the model runs.
		// 				</p>
		// 			</div>
		// 		) : (
		// 			<div className="flex flex-col items-start gap-1">
		// 				<div className="flex items-baseline gap-1">
		// 					<span className="text-4xl font-serif text-taupe/40 tracking-tight leading-none">--</span>
		// 				</div>
		// 				<p className="text-[10px] text-taupe mt-2 max-w-45 leading-relaxed">
		// 					Enter height and weight to calculate.
		// 				</p>
		// 			</div>
		// 		)}
		// 	</div>

		// 	{/* Section Flow Timeline */}
		// 	<div className="flex flex-col gap-4">
		// 		<span className="text-[10px] font-bold tracking-widest uppercase text-taupe mb-2">SECTION FLOW</span>
		// 		<div className="flex flex-col gap-3">
		// 			{sections.map((sec) => {
		// 				const isActive = activeSection === sec.id;
		// 				return (
		// 					<Link
		// 						href={`#${sec.id}`}
		// 						key={sec.id}
		// 						className={`flex items-center gap-3 transition-colors duration-300 ${isActive ? "text-terracotta" : "text-taupe"}`}>
		// 						<span className={`text-xs font-serif italic ${isActive ? "font-bold" : ""}`}>{sec.num}</span>
		// 						<span className={`text-sm ${isActive ? "font-semibold text-espresso" : ""}`}>{sec.label}</span>
		// 					</Link>
		// 				);
		// 			})}
		// 		</div>
		// 	</div>
		// </div>
	);
}
