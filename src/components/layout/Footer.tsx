import React from "react";

export default function Footer() {
	return (
		<footer className="bg-background py-16 px-6 lg:px-12 border-t border-rose-border/40 mt-12">
			<div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-12 justify-between">
				<div className="max-w-xl">
					<span className="text-[10px] font-bold tracking-widest uppercase text-taupe mb-4 block">About</span>
					<h2 className="font-serif text-3xl text-espresso mb-4">Built as a companion, not a verdict.</h2>
					<p className="text-xs text-taupe leading-relaxed">
						PCOS Pal takes the primary clinical signals recognized in Rotterdam-informed literature — menstrual
						patterns, hyperandrogenism markers, metabolic and ultrasound findings — and forwards a computed feature
						payload to a supervised machine learning model. Derived features like BMI, LH/FSH ratio, waist-to-hip ratio,
						and total follicle count are calculated on the server before inference.
					</p>
					<p className="text-[10px] text-taupe/60 mt-8">© 2026 PCOS Pal. A screening companion.</p>
				</div>

				<div className="md:w-64">
					<span className="text-[10px] font-bold tracking-widest uppercase text-taupe mb-4 block">Auto-Computed</span>
					<ul className="text-xs text-taupe space-y-2">
						<li className="flex items-center gap-2">
							<span className="w-1.5 h-1.5 rounded-full border border-taupe"></span> BMI
						</li>
						<li className="flex items-center gap-2">
							<span className="w-1.5 h-1.5 rounded-full border border-taupe"></span> LH/FSH ratio
						</li>
						<li className="flex items-center gap-2">
							<span className="w-1.5 h-1.5 rounded-full border border-taupe"></span> Waist-to-hip ratio
						</li>
						<li className="flex items-center gap-2">
							<span className="w-1.5 h-1.5 rounded-full border border-taupe"></span> Total follicles
						</li>
						<li className="flex items-center gap-2">
							<span className="w-1.5 h-1.5 rounded-full border border-taupe"></span> Follicle difference
						</li>
					</ul>
					<p className="text-[10px] text-taupe/60 mt-8">Always consult a qualified clinician for a diagnosis.</p>
				</div>
			</div>
		</footer>
	);
}
