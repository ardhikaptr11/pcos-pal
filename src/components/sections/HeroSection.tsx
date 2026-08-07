import { Compass, EyeOff, PencilSparkles } from "lucide-react";

const HeroSection = () => {
	return (
		<section className="px-6 lg:px-10 pt-16 pb-14">
			<div className="relative max-w-screen-2xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-y-14 lg:gap-x-12 items-end">
				<div className="col-span-1 lg:col-span-7 flex flex-col items-start">
					<div className="inline-flex items-center gap-2 px-3 py-1.5 bg-rose-soft/70 rounded-full text-[11px] uppercase tracking-[0.2em] text-rose mb-10 shadow-sm">
						<PencilSparkles className="size-3" />
						<span>Machine learning · Screening companion</span>
					</div>

					<h1 className="font-normal text-[54px] md:text-[76px] leading-[0.95] tracking-tight text-espresso">
						Built as companion <br />
						<span className="italic text-terracotta">not a verdict.</span>
					</h1>
				</div>

				<div className="col-span-1 lg:col-span-5 flex flex-col lg:pl-6">
					<p className="text-taupe text-[15px] leading-relaxed mb-4">
						<span className="font-serif text-terracotta font-semibold">PCOS Pal </span>helps review your key health
						signals such as menstrual patterns and hormonal signs guided by Rotterdam-informed literature. Simply answer
						twelve short questions about your body and habits. You also have the option to include lab work and
						ultrasound data. The tool will analyze your inputs to provide an early risk assessment. Your results stay in
						your browser and nothing is stored.
					</p>

					<div className="flex flex-wrap items-center gap-3 text-[11px] uppercase tracking-[0.15em] text-espresso/80 font-medium">
						<span className="flex items-center gap-2 px-4 py-2 border border-rose-soft/80 rounded-full bg-white/60 shadow-sm">
							<Compass className="size-3.5 text-terracotta" />
							Preliminary Screening
						</span>
						<span className="flex items-center gap-2 px-4 py-2 border border-rose-soft/80 rounded-full bg-white/60 shadow-sm">
							<EyeOff className="size-3.5 text-terracotta" />
							Privacy-first
						</span>
					</div>
				</div>
			</div>
		</section>
	);
};

export default HeroSection;

{
	/* <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-start md:justify-between gap-8">
  <div className="max-w-xl">
    <div className="flex items-center gap-2 text-brand-rose bg-rose/10 px-3 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase mb-6 w-fit">
      <PencilSparkles className="w-3 h-3 animate-pulse" />
      Machine Learning • Screening Companion
    </div>
    <h1 className="font-serif text-5xl lg:text-7xl text-espresso tracking-tight leading-tight">
      A quiet, considered <br />
      <span className="italic text-terracotta">look at your cycle.</span>
    </h1>
  </div>
  <div className="md:w-1/3 flex flex-col gap-6 text-sm text-taupe leading-relaxed font-sans">
    <p>
      Answer twelve short questions about your body and habits. Optionally add lab work and ultrasound data for a more precise assessment. Your results stay in your browser — nothing is stored.
    </p>
    <div className="flex items-center gap-8 text-[10px] font-bold tracking-widest uppercase text-espresso">
      <div className="flex flex-col gap-1">
        <span className="text-terracotta">ROTTERDAM-</span>
        <span>INFORMED</span>
      </div>
      <div className="flex flex-col gap-1">
        <span className="text-brand-sage">NOT A</span>
        <span>DIAGNOSIS</span>
      </div>
    </div>
  </div>
</div> */
}
