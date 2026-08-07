// import { FormProps } from "@/types/form";
import { Beaker, HeartPulse, Stethoscope } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../ui/accordion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { FormProps } from "@/types/form";
import { ADVANCED_INPUTS } from "@/lib/list";
import InputNumber from "../InputNumber";

const AdvancedDataForm = ({ form }: { form: FormProps }) => {
	return (
		<Accordion id="advanced" className="bg-white border-rose-soft hover:border-brand transition-color rounded-none">
			<AccordionItem key="advanced" value="advanced">
				<AccordionTrigger className="p-6 border-rose-soft border-x-0 border-t-0">
					<div className="space-y-1">
						<p className="text-[11px] uppercase tracking-[0.24em] text-taupe font-sans">03 - Clinical Findings</p>
						<h2 className="text-3xl text-espresso">The essential health metrics</h2>
						<p className="text-taupe text-sm font-sans">Vitals, hormones, and ultrasound (optional)</p>
					</div>
				</AccordionTrigger>
				<AccordionContent>
					<Tabs defaultValue="vitals" className="block space-y-6">
						<TabsList variant="custom">
							<TabsTrigger value="vitals" className="rounded-none px-4! py-2! data-active:shadow-sm text-taupe">
								<HeartPulse className="size-3.5" />
								Vitals & Body
							</TabsTrigger>
							<TabsTrigger value="hormones" className="rounded-none px-4! py-2! data-active:shadow-sm text-taupe">
								<Beaker className="size-3.5" />
								Hormones & Blood
							</TabsTrigger>
							<TabsTrigger value="ultrasound" className="rounded-none px-4! py-2! data-active:shadow-sm text-taupe">
								<Stethoscope className="size-3.5" />
								Ultrasound
							</TabsTrigger>
						</TabsList>
						<TabsContent value="vitals">
							<div className="grid md:grid-cols-3 gap-x-6 gap-y-5">
								{ADVANCED_INPUTS.vitals.map(({ name, label, unit }) => (
									<InputNumber key={name} form={form} name={name} label={label} unit={unit} />
								))}
							</div>
						</TabsContent>
						<TabsContent value="hormones">
							<div className="grid md:grid-cols-3 gap-x-6 gap-y-5">
								{ADVANCED_INPUTS.hormones.map(({ name, label, unit }) => (
									<InputNumber key={name} form={form} name={name} label={label} unit={unit} />
								))}
							</div>
						</TabsContent>
						<TabsContent value="ultrasound">
							<div className="grid md:grid-cols-3 gap-x-6 gap-y-5">
								{ADVANCED_INPUTS.ultrasound.map(({ name, label, unit }) => (
									<InputNumber key={name} form={form} name={name} label={label} unit={unit} />
								))}
							</div>
						</TabsContent>
					</Tabs>
				</AccordionContent>
			</AccordionItem>
		</Accordion>
	);
};

export default AdvancedDataForm;
