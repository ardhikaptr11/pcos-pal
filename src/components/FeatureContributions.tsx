import { PredictionResponse } from "@/lib/action";

const FeatureContributions = ({ contributions }: { contributions: PredictionResponse["feature_contributions"] }) => {
	const renderSignal = (
		key: string,
		name: string,
		valueStr: string,
		direction: "raises" | "lowers",
		weight: number
	) => {
		const isRaises = direction === "raises";
		const colorText = isRaises ? "text-terracotta" : "text-brand-sage";
		const colorBg = isRaises ? "bg-terracotta" : "bg-sage";
		const arrow = isRaises ? "↑ RAISES" : "↓ LOWERS";

		// Upper bound for bar width
		const maxWidth = 120;
		const barWidth = Math.max(10, Math.min((weight / 1.5) * maxWidth, maxWidth));

		return (
			<div key={key} className="flex justify-between items-end border-b border-rose-soft pb-4 mt-4">
				<p className="text-sm text-espresso">
					{name} {valueStr && <span className="text-taupe/60 text-xs ml-1 tabular-nums"> = {valueStr}</span>}
				</p>
				<div className="flex flex-col items-end gap-1.5 w-1/3">
					<span className={`text-[9px] font-bold tracking-[0.15em] uppercase ${colorText}`}>
						{arrow} · {weight.toFixed(2)}
					</span>
					<div className={`h-1 ${colorBg}`} style={{ width: `${barWidth}px` }} />
				</div>
			</div>
		);
	};

	return (
		<div className="flex flex-col">
			{contributions.length === 0 ? (
				<p className="text-sm text-taupe mt-4 italic">No prominent contributing signals detected.</p>
			) : (
				contributions.map((item, index) => {
					// Format decimal
					const valStr =
						item.value !== undefined && item.value !== null
							? typeof item.value === "number" && !Number.isInteger(item.value)
								? item.value.toFixed(1)
								: String(item.value)
							: "";

					return renderSignal(`feature-${index + 1}`, item.label, valStr, item.direction, item.weight);
				})
			)}
		</div>
	);
};

export default FeatureContributions;
