import { cn } from "@/lib/utils";
import { CategoricalFormInputs, FormProps } from "@/types/form";
import { useController } from "react-hook-form";
import { Button } from "./ui/button";

const SwitchToggle = ({ form, name, label }: { form: FormProps; name: keyof CategoricalFormInputs; label: string }) => {
	const {
		field: { value, onChange }
	} = useController({
		name,
		control: form.control
	});

	const OPTIONS = ["No", "Yes"];

	return (
		<div className="flex items-center justify-between gap-4 py-3 border-b border-rose-soft">
			<span className="font-medium text-espresso/70 text-[15px] leading-snug cursor-default select-none">{label}</span>
			<div className="inline-flex rounded-full border border-rose-soft bg-white p-1 shrink-0">
				{OPTIONS.map((option, index) => (
					<Button
						key={index}
						variant="custom"
						size="custom"
						className={cn({
							"bg-terracotta text-white shadow-sm hover:text-white": index === value
						})}
						onClick={() => onChange(index)}>
						{option}
					</Button>
				))}
			</div>
		</div>
	);
};

export default SwitchToggle;
