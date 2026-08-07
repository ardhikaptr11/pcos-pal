import { z } from "zod";

export const ClientFormSchema = z.object({
	age_yrs: z
		.string()
		.min(1, "Age is required")
		.regex(/^\d+$/, "Must be a positive integer number")
		.transform(Number)
		.pipe(z.number().min(12, "Minimum: 12 yrs").max(80, "Maximum: 80 yrs")),
	weight_kg: z
		.string()
		.min(1, "Weight is required")
		.regex(/^\d+(\.\d+)?$/, "Must be a valid number")
		.transform((val) => parseFloat(val))
		.pipe(z.number().min(35, "Minimum: 35kg").max(250, "Maximum: 250kg")),
	height_cm: z
		.string()
		.min(1, "Height is required")
		.regex(/^\d+(\.\d+)?$/, "Must be a valid number")
		.transform((val) => parseFloat(val))
		.pipe(z.number().min(100, "Minimum: 100 cm").max(220, "Maximum: 220 cm")),
	cycle_length_days: z
		.string()
		.min(1, "Cycle length is required")
		.regex(/^\d+$/, "Must be a positive integer number")
		.transform(Number)
		.pipe(z.number().min(10, "Minimum: 10 days").max(365, "Maximum: 365 days")),

	weight_gain_yn: z.number().min(0).max(1),
	hair_growth_yn: z.number().min(0).max(1),
	skin_darkening_yn: z.number().min(0).max(1),
	hair_loss_yn: z.number().min(0).max(1),
	pimples_yn: z.number().min(0).max(1),
	fast_food_yn: z.number().min(0).max(1),
	regexercise_yn: z.number().min(0).max(1),
	pregnant_yn: z.number().min(0).max(1),

	pulse_rate_bpm: z
		.union([z.string().regex(/^\d+(\.\d+)?$/, "Must be a valid number"), z.literal("")])
		.optional()
		.transform((val) => (val === "" || val === undefined ? null : parseFloat(val))),
	rr_breathsmin: z
		.union([z.string().regex(/^\d+$/, "Must be a positive integer number"), z.literal("")])
		.optional()
		.transform((val) => (val === "" || val === undefined ? null : Number(val))),
	bp_systolic_mmhg: z
		.union([z.string().regex(/^\d+$/, "Must be a positive integer number"), z.literal("")])
		.optional()
		.transform((val) => (val === "" || val === undefined ? null : Number(val))),
	bp_diastolic_mmhg: z
		.union([z.string().regex(/^\d+$/, "Must be a positive integer number"), z.literal("")])
		.optional()
		.transform((val) => (val === "" || val === undefined ? null : Number(val))),
	waist_inch: z
		.union([z.string().regex(/^\d+$/, "Must be a positive integer number"), z.literal("")])
		.optional()
		.transform((val) => (val === "" || val === undefined ? null : Number(val))),
	hip_inch: z
		.union([z.string().regex(/^\d+$/, "Must be a positive integer number"), z.literal("")])
		.optional()
		.transform((val) => (val === "" || val === undefined ? null : Number(val))),
	hb_gdl: z
		.union([z.string().regex(/^\d+(\.\d+)?$/, "Must be a valid number"), z.literal("")])
		.optional()
		.transform((val) => (val === "" || val === undefined ? null : parseFloat(val))),
	lh_miuml: z
		.union([z.string().regex(/^\d+(\.\d+)?$/, "Must be a valid number"), z.literal("")])
		.optional()
		.transform((val) => (val === "" || val === undefined ? null : parseFloat(val))),
	fsh_miuml: z
		.union([z.string().regex(/^\d+(\.\d+)?$/, "Must be a valid number"), z.literal("")])
		.optional()
		.transform((val) => (val === "" || val === undefined ? null : parseFloat(val))),
	tsh_miul: z
		.union([z.string().regex(/^\d+(\.\d+)?$/, "Must be a valid number"), z.literal("")])
		.optional()
		.transform((val) => (val === "" || val === undefined ? null : parseFloat(val))),
	amh_ngml: z
		.union([z.string().regex(/^\d+(\.\d+)?$/, "Must be a valid number"), z.literal("")])
		.optional()
		.transform((val) => (val === "" || val === undefined ? null : parseFloat(val))),
	prl_ngml: z
		.union([z.string().regex(/^\d+(\.\d+)?$/, "Must be a valid number"), z.literal("")])
		.optional()
		.transform((val) => (val === "" || val === undefined ? null : parseFloat(val))),
	vit_d3_ngml: z
		.union([z.string().regex(/^\d+(\.\d+)?$/, "Must be a valid number"), z.literal("")])
		.optional()
		.transform((val) => (val === "" || val === undefined ? null : parseFloat(val))),
	prg_ngml: z
		.union([z.string().regex(/^\d+(\.\d+)?$/, "Must be a valid number"), z.literal("")])
		.optional()
		.transform((val) => (val === "" || val === undefined ? null : parseFloat(val))),
	rbs_mgdl: z
		.string()
		.optional()
		.transform((v) => (v ? Number(v) : null)),
	i_betahcg_miuml: z
		.union([z.string().regex(/^\d+(\.\d+)?$/, "Must be a valid number"), z.literal("")])
		.optional()
		.transform((val) => (val === "" || val === undefined ? null : parseFloat(val))),
	ii_betahcg_miuml: z
		.union([z.string().regex(/^\d+(\.\d+)?$/, "Must be a valid number"), z.literal("")])
		.optional()
		.transform((val) => (val === "" || val === undefined ? null : parseFloat(val))),
	cycle_ri: z
		.union([z.string().regex(/^\d+$/, "Must be a positive integer number"), z.literal("")])
		.optional()
		.refine((val) => val === undefined || val === "" || ["2", "4", "5"].includes(val), {
			message: "Must be 2, 4, or 5"
		})
		.transform((val) => (val === "" || val === undefined ? null : Number(val))),
	follicle_no_l: z
		.union([z.string().regex(/^\d+$/, "Must be a positive integer number"), z.literal("")])
		.optional()
		.transform((val) => (val === "" || val === undefined ? null : Number(val))),
	avg_f_size_l_mm: z
		.union([z.string().regex(/^\d+(\.\d+)?$/, "Must be a valid number"), z.literal("")])
		.optional()
		.transform((val) => (val === "" || val === undefined ? null : parseFloat(val))),
	follicle_no_r: z
		.union([z.string().regex(/^\d+$/, "Must be a positive integer number"), z.literal("")])
		.optional()
		.transform((val) => (val === "" || val === undefined ? null : Number(val))),
	avg_f_size_r_mm: z
		.union([z.string().regex(/^\d+(\.\d+)?$/, "Must be a valid number"), z.literal("")])
		.optional()
		.transform((val) => (val === "" || val === undefined ? null : parseFloat(val))),
	endometrium_mm: z
		.union([z.string().regex(/^\d+(\.\d+)?$/, "Must be a valid number"), z.literal("")])
		.optional()
		.transform((val) => (val === "" || val === undefined ? null : parseFloat(val)))
});

export const PayloadSchema = z.object({
	age_yrs: z.number().min(12).max(80),
	weight_kg: z.number().min(35).max(250),
	height_cm: z.number().min(100).max(220),
	cycle_length_days: z.number().min(10).max(365),

	weight_gain_yn: z.number().min(0).max(1),
	hair_growth_yn: z.number().min(0).max(1),
	skin_darkening_yn: z.number().min(0).max(1),
	hair_loss_yn: z.number().min(0).max(1),
	pimples_yn: z.number().min(0).max(1),
	fast_food_yn: z.number().min(0).max(1),
	regexercise_yn: z.number().min(0).max(1),
	pregnant_yn: z.number().min(0).max(1),

	pulse_rate_bpm: z.number().nullable(),
	rr_breathsmin: z.number().nullable(),
	bp_systolic_mmhg: z.number().nullable(),
	bp_diastolic_mmhg: z.number().nullable(),
	waist_inch: z.number().nullable(),
	hip_inch: z.number().nullable(),
	hb_gdl: z.number().nullable(),
	lh_miuml: z.number().nullable(),
	fsh_miuml: z.number().nullable(),
	tsh_miul: z.number().nullable(),
	amh_ngml: z.number().nullable(),
	prl_ngml: z.number().nullable(),
	vit_d3_ngml: z.number().nullable(),
	prg_ngml: z.number().nullable(),
	rbs_mgdl: z.number().nullable(),
	i_betahcg_miuml: z.number().nullable(),
	ii_betahcg_miuml: z.number().nullable(),
	cycle_ri: z.number().nullable(),
	follicle_no_l: z.number().nullable(),
	avg_f_size_l_mm: z.number().nullable(),
	follicle_no_r: z.number().nullable(),
	avg_f_size_r_mm: z.number().nullable(),
	endometrium_mm: z.number().nullable()
});
