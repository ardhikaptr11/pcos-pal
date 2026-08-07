export const DEFAULT_VALUES = {
	age_yrs: "",
	weight_kg: "",
	height_cm: "",
	cycle_length_days: "",
	weight_gain_yn: undefined,
	hair_growth_yn: undefined,
	skin_darkening_yn: undefined,
	hair_loss_yn: undefined,
	pimples_yn: undefined,
	fast_food_yn: undefined,
	regexercise_yn: undefined,
	pregnant_yn: undefined,
	pulse_rate_bpm: "",
	rr_breathsmin: "",
	hb_gdl: "",
	cycle_ri: "",
	i_betahcg_miuml: "",
	ii_betahcg_miuml: "",
	fsh_miuml: "",
	lh_miuml: "",
	hip_inch: "",
	waist_inch: "",
	tsh_miul: "",
	amh_ngml: "",
	prl_ngml: "",
	vit_d3_ngml: "",
	prg_ngml: "",
	rbs_mgdl: "",
	bp_systolic_mmhg: "",
	bp_diastolic_mmhg: "",
	follicle_no_l: "",
	follicle_no_r: "",
	avg_f_size_l_mm: "",
	avg_f_size_r_mm: "",
	endometrium_mm: ""
};

const getRandomInt = (min: number, max: number): string => {
	return Math.floor(Math.random() * (max - min + 1) + min).toString();
};

const getRandomFloat = (min: number, max: number, decimals: number = 1): string => {
	return (Math.random() * (max - min) + min).toFixed(decimals);
};

const getRandomBinary = (): number => {
	return Math.random() > 0.5 ? 1 : 0;
};

export const generateSample = () => {
	const height_cm = parseFloat(getRandomFloat(140, 180));
	const height_m = height_cm / 100;
	const target_bmi = parseFloat(getRandomFloat(18.5, 40.0));
	const weight_kg = (target_bmi * (height_m * height_m)).toFixed(1);

	const cycle_ri = [2, 4, 5][Math.floor(Math.random() * 3)].toString();

	const pregnant_yn = Math.random() > 0.85 ? 1 : 0;
	const i_betahcg_miuml = pregnant_yn ? getRandomFloat(50.0, 5000.0) : getRandomFloat(1.0, 5.0);
	const ii_betahcg_miuml = pregnant_yn ? getRandomFloat(50.0, 5000.0) : getRandomFloat(1.0, 5.0);
	const prg_ngml = pregnant_yn ? getRandomFloat(15.0, 50.0) : getRandomFloat(0.1, 20.0);

	return {
		age_yrs: getRandomInt(15, 45),
		height_cm: height_cm.toFixed(1),
		weight_kg: weight_kg.toString(),
		cycle_length_days: getRandomInt(21, 90),
		weight_gain_yn: getRandomBinary(),
		hair_growth_yn: getRandomBinary(),
		skin_darkening_yn: getRandomBinary(),
		hair_loss_yn: getRandomBinary(),
		pimples_yn: getRandomBinary(),
		fast_food_yn: getRandomBinary(),
		regexercise_yn: getRandomBinary(),
		pregnant_yn: pregnant_yn,
		pulse_rate_bpm: getRandomInt(60, 100),
		rr_breathsmin: getRandomInt(12, 24),
		bp_systolic_mmhg: getRandomInt(90, 150),
		bp_diastolic_mmhg: getRandomInt(60, 90),
		waist_inch: getRandomInt(24, 45),
		hip_inch: getRandomInt(32, 55),
		hb_gdl: getRandomFloat(10.0, 16.0),
		lh_miuml: getRandomFloat(1.0, 25.0),
		fsh_miuml: getRandomFloat(2.0, 15.0),
		tsh_miul: getRandomFloat(0.5, 5.5),
		amh_ngml: getRandomFloat(0.5, 15.0),
		prl_ngml: getRandomFloat(5.0, 35.0),
		vit_d3_ngml: getRandomFloat(10.0, 60.0),
		prg_ngml: prg_ngml,
		rbs_mgdl: getRandomInt(70, 200),
		i_betahcg_miuml: i_betahcg_miuml,
		ii_betahcg_miuml: ii_betahcg_miuml,
		cycle_ri: cycle_ri,
		follicle_no_l: getRandomInt(0, 25),
		avg_f_size_l_mm: getRandomFloat(5.0, 25.0),
		follicle_no_r: getRandomInt(0, 25),
		avg_f_size_r_mm: getRandomFloat(5.0, 25.0),
		endometrium_mm: getRandomFloat(3.0, 15.0)
	};
};
