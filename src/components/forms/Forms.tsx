"use client";

import BasicsDataForm from "@/components/forms/BasicsDataForm";
import { predict, PredictionResponse } from "@/lib/action";
import { calculateClinicalMetrics } from "@/lib/calculation";
import { DEFAULT_VALUES, generateSample } from "@/lib/data";
import { ClientFormSchema } from "@/lib/schema";
import { ClientFormInputs, ClientFormOutputs } from "@/types/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoaderCircle, PencilSparkles, RefreshCw, Sparkles } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { toast } from "sonner";
import { Payload } from "../layout/Content";
import { Button } from "../ui/button";
import AdvancedDataForm from "./AdvancedDataForm";
import ChoicesDataForm from "./ChoicesDataForm";

interface FormsProps {
	onValuesChange: (values: { weight: ClientFormInputs["weight_kg"]; height: ClientFormInputs["height_cm"] }) => void;
	onAssessmentComplete: (result: PredictionResponse, payload: Payload) => void;
	onReset: () => void;
}

const Forms = ({ onValuesChange, onAssessmentComplete, onReset }: FormsProps) => {
	// const [loading, startTransition] = useTransition();
	const [loading, setLoading] = useState(false);

	const form = useForm<ClientFormInputs, undefined, ClientFormOutputs>({
		resolver: zodResolver(ClientFormSchema),
		defaultValues: DEFAULT_VALUES
	});

	const weight = useWatch({ control: form.control, name: "weight_kg" });
	const height = useWatch({ control: form.control, name: "height_cm" });

	useEffect(() => {
		if (onValuesChange) {
			onValuesChange({ weight, height });
		}
	}, [weight, height, onValuesChange]);

	const fillSampleData = () => {
		const sampleData = generateSample();

		Object.entries(sampleData).forEach(([key, val]) => {
			form.setValue(key as keyof ClientFormInputs, val, {
				shouldValidate: true,
				shouldDirty: true
			});
		});
	};

	const onSubmit = async (data: ClientFormOutputs) => {
		const clinicalMetrics = calculateClinicalMetrics({
			height_cm: data.height_cm,
			weight_kg: data.weight_kg,
			lh_miuml: data.lh_miuml,
			fsh_miuml: data.fsh_miuml,
			waist_inch: data.waist_inch,
			hip_inch: data.hip_inch,
			follicle_no_l: data.follicle_no_l,
			follicle_no_r: data.follicle_no_r
		});

		setLoading(true);

		try {
			await new Promise((resolve) => setTimeout(resolve, 2500));

			const result = await predict(data);
			const payload = { ...data, ...clinicalMetrics };

			onAssessmentComplete(result, payload);

			form.reset(form.getValues(), {
				keepValues: true,
				keepIsSubmitSuccessful: true
			});

			setTimeout(() => {
				document.getElementById("result")?.scrollIntoView({ behavior: "smooth" });
			}, 200);
		} catch (err) {
			toast.error("Inference failed", {
				description: (err as Error).message
			});
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="col-span-12 lg:col-span-9">
			<div className="flex items-center justify-end gap-3">
				<Button
					variant="ghost"
					onClick={() => {
						form.reset(DEFAULT_VALUES);
						onReset();
						toast.success("Form cleared");
					}}
					className="flex items-center gap-1.5 text-xs text-taupe hover:text-espresso transition-colors px-3 py-2"
					disabled={!form.formState.isDirty && !form.formState.isSubmitSuccessful}>
					<RefreshCw className="size-3.5" />
					Reset
				</Button>
				<Button
					variant="ghost"
					onClick={() => {
						fillSampleData();
						toast.success("Sample data filled", { description: "All fields populated with sample data" });
					}}
					className="flex items-center gap-2 text-xs font-medium text-espresso bg-white border border-rose-soft rounded-full px-4 py-2 hover:bg-rose-soft/20 transition-colors shadow-sm"
					disabled={form.formState.isSubmitSuccessful}>
					<PencilSparkles className="size-3.5" />
					Test with sample data
				</Button>
			</div>
			<form className="space-y-10" id="pcos-classification" onSubmit={form.handleSubmit(onSubmit)}>
				<BasicsDataForm form={form} />
				<ChoicesDataForm form={form} />
				<AdvancedDataForm form={form} />

				<div className="flex items-center justify-end mt-2">
					<Button
						type="submit"
						variant="custom"
						form="pcos-classification"
						className="h-14 py-2 px-8 text-[15px] gap-2 shadow-sm bg-terracotta text-white hover:text-white"
						disabled={loading || (form.formState.isSubmitSuccessful && !form.formState.isDirty)}>
						{loading ? <LoaderCircle className="size-3.5 animate-spin" /> : <Sparkles className="size-3.5" />}
						{loading ? "Analyzing..." : "Run Assessment"}
					</Button>
				</div>
			</form>
		</div>
	);
};

export default Forms;
