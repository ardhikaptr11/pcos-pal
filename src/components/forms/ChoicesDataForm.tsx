import { CATEGORICAL_INPUTS } from "@/lib/list";
import { FormProps } from "@/types/form";
import { useFormState } from "react-hook-form";
import SwitchToggle from "../SwitchToggle";

const ChoicesDataForm = ({ form }: { form: FormProps }) => {
	const { errors } = useFormState({ control: form.control });

	const hasError = CATEGORICAL_INPUTS.some(({ name }) => errors[name]);

	return (
		<div className="space-y-8" id="symptoms">
			<div className="space-y-1">
				<p className="text-[11px] uppercase tracking-[0.24em] text-taupe">02 - Symptoms & Lifestyle</p>
				<h2 className="font-serif text-3xl text-espresso">A few honest yeses and nos</h2>
			</div>

			<div className="bg-white border border-rose-soft p-6 md:p-8 grid md:grid-cols-2 md:gap-x-10">
				{CATEGORICAL_INPUTS.map(({ name, label }) => (
					<SwitchToggle key={name} form={form} name={name} label={label} />
				))}
			</div>

			{hasError && <p className="mt-3 text-sm text-rose">Please answer all questions to continue.</p>}
		</div>
	);
};

export default ChoicesDataForm;
