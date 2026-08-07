import { ClientFormSchema } from "@/lib/schema";
import { UseFormReturn } from "react-hook-form";
import z from "zod";

export type ClientFormInputs = z.input<typeof ClientFormSchema>;
export type ClientFormOutputs = z.infer<typeof ClientFormSchema>;

export type BasicFormInputs = Pick<ClientFormInputs, "age_yrs" | "weight_kg" | "height_cm" | "cycle_length_days">;

export type CategoricalFormInputs = Pick<
	ClientFormInputs,
	| "weight_gain_yn"
	| "skin_darkening_yn"
	| "pimples_yn"
	| "regexercise_yn"
	| "hair_growth_yn"
	| "hair_loss_yn"
	| "fast_food_yn"
	| "pregnant_yn"
>;

export type AdvancedFormInputs = Omit<ClientFormInputs, keyof BasicFormInputs | keyof CategoricalFormInputs>;

export type FormProps = UseFormReturn<ClientFormInputs, undefined, ClientFormOutputs>;
