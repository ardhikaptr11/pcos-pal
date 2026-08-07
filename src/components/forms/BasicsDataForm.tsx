import { ClientFormInputs, FormProps } from "@/types/form";
import InputNumber from "../InputNumber";

const INPUTS: { name: keyof ClientFormInputs; label: string; unit: string; placeholder: string }[] = [
	{ name: "age_yrs", label: "Age", unit: "yrs", placeholder: "25" },
	{ name: "height_cm", label: "Height", unit: "cm", placeholder: "155" },
	{ name: "weight_kg", label: "Weight", unit: "kg", placeholder: "68" },
	{ name: "cycle_length_days", label: "Cycle Length", unit: "days", placeholder: "28" }
];

const BasicsDataForm = ({ form }: { form: FormProps }) => {
	return (
		<div className="space-y-8" id="basics">
			<div className="space-y-1">
				<p className="text-[11px] uppercase tracking-[0.24em] text-taupe">01 · Basics</p>
				<h2 className="font-serif text-3xl text-espresso">Tell us the essentials</h2>
			</div>

			<div className="bg-white border border-rose-soft p-6 md:p-8">
				<div className="grid md:grid-cols-4 gap-6">
					{INPUTS.map(({ name, label, unit, placeholder }) => (
						<InputNumber key={name} form={form} name={name} label={label} unit={unit} placeholder={placeholder} />
					))}
				</div>
			</div>
		</div>
	);
};

export default BasicsDataForm;
