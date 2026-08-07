export type ClinicalData = {
	height_cm: number;
	weight_kg: number;
	lh_miuml: number | null;
	fsh_miuml: number | null;
	hip_inch: number | null;
	waist_inch: number | null;
	follicle_no_l: number | null;
	follicle_no_r: number | null;
};

export const calculateClinicalMetrics = (data: ClinicalData) => {
	const heightInMeters = data.height_cm / 100;

	return {
		bmi: heightInMeters > 0 ? Number((data.weight_kg / (heightInMeters * heightInMeters)).toFixed(2)) : 0,
		lhfsh_ratio:
			data.lh_miuml != null && data.fsh_miuml != null && data.fsh_miuml > 0
				? Number((data.lh_miuml / data.fsh_miuml).toFixed(2))
				: null,
		waisthip_ratio:
			data.waist_inch != null && data.hip_inch != null && data.hip_inch > 0
				? Number((data.waist_inch / data.hip_inch).toFixed(2))
				: null,
		total_follicles:
			data.follicle_no_l != null && data.follicle_no_r != null ? data.follicle_no_l + data.follicle_no_r : null,
		follicles_difference:
			data.follicle_no_l != null && data.follicle_no_r != null
				? Math.abs(data.follicle_no_l - data.follicle_no_r)
				: null
	};
};
