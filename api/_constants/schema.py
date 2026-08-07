from typing import Optional

from pydantic import BaseModel

class InferencePayload(BaseModel):
    # REQUIRED for user input
    age_yrs: float
    weight_kg: float
    height_cm: float
    bmi: float
    cycle_length_days: float
    weight_gain_yn: int
    hair_growth_yn: int
    skin_darkening_yn: int
    hair_loss_yn: int
    pimples_yn: int
    fast_food_yn: int
    regexercise_yn: int
    pregnant_yn: int

    # OPTIONAL
    pulse_rate_bpm: Optional[float] = None
    rr_breathsmin: Optional[float] = None
    hb_gdl: Optional[float] = None
    cycle_ri: Optional[float] = None
    i_betahcg_miuml: Optional[float] = None
    ii_betahcg_miuml: Optional[float] = None
    fsh_miuml: Optional[float] = None
    lh_miuml: Optional[float] = None
    lhfsh_ratio: Optional[float] = None
    hip_inch: Optional[float] = None
    waist_inch: Optional[float] = None
    waisthip_ratio: Optional[float] = None
    tsh_miul: Optional[float] = None
    amh_ngml: Optional[float] = None
    prl_ngml: Optional[float] = None
    vit_d3_ngml: Optional[float] = None
    prg_ngml: Optional[float] = None
    rbs_mgdl: Optional[float] = None
    bp_systolic_mmhg: Optional[float] = None
    bp_diastolic_mmhg: Optional[float] = None
    
    follicle_no_l: Optional[int] = None
    avg_f_size_l_mm: Optional[float] = None
    follicle_no_r: Optional[int] = None
    avg_f_size_r_mm: Optional[float] = None
    total_follicles: Optional[int] = None
    follicles_difference: Optional[int] = None
    endometrium_mm: Optional[float] = None
