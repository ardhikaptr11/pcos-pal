import { ClientFormInputs, FormProps } from "@/types/form";
import { Info } from "lucide-react";
import { Controller } from "react-hook-form";
import { Button } from "./ui/button";
import { Field, FieldError, FieldLabel } from "./ui/field";
import { Input } from "./ui/input";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";

interface PropsType {
	form: FormProps;
	name: keyof ClientFormInputs;
	label: string;
	unit: string;
	placeholder?: string;
}

const InputNumber = ({ form, ...props }: PropsType) => {
	const { name, label, unit, placeholder } = props;

	return (
		<Controller
			name={name}
			control={form.control}
			render={({ field, fieldState }) => (
				<Field data-invalid={fieldState.invalid}>
					<div className="flex justify-between items-center">
						<FieldLabel htmlFor={name} className="block text-taupe uppercase tracking-[0.14em] text-[11px] font-medium">
							{label} {unit ? "·" : ""} <span className="normal-case tracking-normal text-taupe/70">{unit}</span>
						</FieldLabel>
						{name === "cycle_ri" && (
							<Tooltip>
								<TooltipTrigger
									render={
										<Button variant="ghost" size="icon-2xs">
											<Info className="text-taupe size-3" />
										</Button>
									}
								/>
								<TooltipContent side="top">
									<p className="text-sm">
										Select the number that best matches your cycle:
										<br />
										<b>2 = Regular</b> (always on time)
										<br />
										<b>4 = Irregular</b> (often early or late)
										<br />
										<b>5 = Very irregular</b> (frequently skips months)
									</p>
								</TooltipContent>
							</Tooltip>
						)}
					</div>
					<Input
						{...field}
						type="number"
						id={name}
						aria-invalid={fieldState.invalid}
						placeholder={!placeholder ? "—" : `e.g. ${placeholder}`}
						autoComplete="off"
					/>
					{fieldState.invalid && <FieldError errors={[fieldState.error]} />}
				</Field>
			)}
		/>
	);
};

export default InputNumber;
