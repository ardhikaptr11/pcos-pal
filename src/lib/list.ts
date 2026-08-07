import { BasicFormInputs, CategoricalFormInputs, AdvancedFormInputs } from "@/types/form";

const BASIC_INPUTS: { name: keyof BasicFormInputs; label: string; unit: string; placeholder: string }[] = [
	{ name: "age_yrs", label: "Age", unit: "yrs", placeholder: "25" },
	{ name: "height_cm", label: "Height", unit: "cm", placeholder: "155" },
	{ name: "weight_kg", label: "Weight", unit: "kg", placeholder: "68" },
	{ name: "cycle_length_days", label: "Cycle Length", unit: "days", placeholder: "28" }
];

const CATEGORICAL_INPUTS: { name: keyof CategoricalFormInputs; label: string }[] = [
	{ name: "weight_gain_yn", label: "Recent weight gain?" },
	{ name: "hair_growth_yn", label: "Excess hair growth?" },
	{ name: "skin_darkening_yn", label: "Skin darkening (neck/underarms)?" },
	{ name: "hair_loss_yn", label: "Noticeable hair loss?" },
	{ name: "pimples_yn", label: "Persistent pimples or acne?" },
	{ name: "fast_food_yn", label: "Fast food more than 3 times a week?" },
	{ name: "regexercise_yn", label: "Regular exercise routine?" },
	{ name: "pregnant_yn", label: "Currently pregnant?" }
];

const ADVANCED_INPUTS: Record<
	"vitals" | "hormones" | "ultrasound",
	{ name: keyof AdvancedFormInputs; label: string; unit: string }[]
> = {
	vitals: [
		{ name: "pulse_rate_bpm", label: "Pulse Rate", unit: "bpm" },
		{ name: "rr_breathsmin", label: "Respiratory Rate", unit: "breaths/min" },
		{ name: "bp_systolic_mmhg", label: "BP Systolic", unit: "mmHg" },
		{ name: "bp_diastolic_mmhg", label: "BP Diastolic", unit: "mmHg" },
		{ name: "waist_inch", label: "Waist", unit: "inch" },
		{ name: "hip_inch", label: "Hip", unit: "inch" }
	],
	hormones: [
		{ name: "hb_gdl", label: "Hemoglobin", unit: "g/dL" },
		{ name: "lh_miuml", label: "LH", unit: "mIU/mL" },
		{ name: "fsh_miuml", label: "FSH", unit: "mIU/mL" },
		{ name: "tsh_miul", label: "TSH", unit: "mIU/mL" },
		{ name: "amh_ngml", label: "AMH", unit: "ng/mL" },
		{ name: "prl_ngml", label: "Prolactin", unit: "ng/mL" },
		{ name: "vit_d3_ngml", label: "Vitamin D3", unit: "ng/mL" },
		{ name: "prg_ngml", label: "Progesterone", unit: "ng/mL" },
		{ name: "rbs_mgdl", label: "Random Blood Sugar", unit: "mg/dL" },
		{ name: "i_betahcg_miuml", label: "Beta-HCG (I)", unit: "mIU/mL" },
		{ name: "ii_betahcg_miuml", label: "Beta-HCG (II)", unit: "mIU/mL" },
		{ name: "cycle_ri", label: "Cycle Regularity Index", unit: "" }
	],
	ultrasound: [
		{ name: "follicle_no_l", label: "Follicles (Left Ovary)", unit: "count" },
		{ name: "avg_f_size_l_mm", label: "Avg Follicle Size (L)", unit: "mm" },
		{ name: "endometrium_mm", label: "Endometrium thickness", unit: "mm" },
		{ name: "follicle_no_r", label: "Follicles (Right Ovary)", unit: "count" },
		{ name: "avg_f_size_r_mm", label: "Avg Follicle Size (R)", unit: "mm" }
	]
};

export { BASIC_INPUTS, CATEGORICAL_INPUTS, ADVANCED_INPUTS };
