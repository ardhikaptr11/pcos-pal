from typing import Any, Dict, List


class Heuristic:
    def __init__(self, data: Dict[str, Any]):
        self.data = data

    def calculate(self) -> float:
        # Safe checks for heuristic calculations
        score = 0.0

        # 1. BMI calculation
        weight = self.data.get("weight_kg")
        height = self.data.get("height_cm")
        bmi = self.data.get("bmi")
        if bmi is None and weight and height:
            height_m = height / 100
            bmi = weight / (height_m * height_m)

        if bmi and bmi > 25:
            score += 20.0

        # 2. Key symptoms
        if self.data.get("weight_gain_yn") == 1:
            score += 15.0
        if self.data.get("hair_growth_yn") == 1:
            score += 15.0
        if self.data.get("skin_darkening_yn") == 1:
            score += 10.0
        if self.data.get("hair_loss_yn") == 1:
            score += 10.0
        if self.data.get("pimples_yn") == 1:
            score += 10.0

        # 3. Cycle length
        cycle_length = self.data.get("cycle_length_days")
        if cycle_length and cycle_length > 35:
            score += 20.0

        # Normalize to [0.0, 1.0] range
        score_pct = min(score, 100.0) / 100.0
        return score_pct

    def build(self) -> List[Any]:
        contributions = []

        # BMI
        weight = self.data.get("weight_kg")
        height = self.data.get("height_cm")
        bmi = self.data.get("bmi")

        if bmi is None and weight and height:
            height_m = height / 100
            bmi = weight / (height_m * height_m) if height_m > 0 else 0
        if bmi is not None:
            if bmi > 30:
                contributions.append(
                    {
                        "feature": "bmi",
                        "label": "BMI",
                        "value": round(bmi, 1),
                        "direction": "raises",
                        "weight": round(bmi * 0.04, 2),
                    }
                )
            elif bmi > 25:
                contributions.append(
                    {
                        "feature": "bmi",
                        "label": "BMI",
                        "value": round(bmi, 1),
                        "direction": "raises",
                        "weight": round(bmi * 0.03, 2),
                    }
                )
            else:
                contributions.append(
                    {
                        "feature": "bmi",
                        "label": "BMI",
                        "value": round(bmi, 1),
                        "direction": "lowers",
                        "weight": round((25 - bmi) * 0.02, 2),
                    }
                )

        # Binary symptom features
        binary_features = [
            ("weight_gain_yn", "Recent weight gain", 0.40),
            ("hair_growth_yn", "Excess hair growth", 0.52),
            ("skin_darkening_yn", "Skin darkening", 0.33),
            ("hair_loss_yn", "Hair loss", 0.25),
            ("pimples_yn", "Acne / pimples", 0.26),
            ("fast_food_yn", "Fast food consumption", 0.15),
            ("regexercise_yn", "Regular exercise", 0.20),
        ]

        for feat, label, base_weight in binary_features:
            val = self.data.get(feat)
            if val is not None:
                val = int(val)
                if feat == "regexercise_yn":
                    # Exercise lowers risk when present
                    direction = "lowers" if val == 1 else "raises"
                else:
                    direction = "raises" if val == 1 else "lowers"
                contributions.append(
                    {
                        "feature": feat,
                        "label": label,
                        "value": val,
                        "direction": direction,
                        "weight": round(base_weight * (1.0 if val == 1 else 0.5), 2),
                    }
                )

        # Cycle length
        cycle = self.data.get("cycle_length_days")
        if cycle is not None:
            cycle = float(cycle)
            if cycle > 35:
                contributions.append(
                    {
                        "feature": "cycle_length_days",
                        "label": "Cycle length",
                        "value": cycle,
                        "direction": "raises",
                        "weight": round(min((cycle - 28) * 0.03, 0.80), 2),
                    }
                )
            else:
                contributions.append(
                    {
                        "feature": "cycle_length_days",
                        "label": "Cycle length",
                        "value": cycle,
                        "direction": "lowers",
                        "weight": round((35 - cycle) * 0.01, 2),
                    }
                )

        # Follicles
        total_f = self.data.get("total_follicles")
        if total_f is not None:
            total_f = float(total_f)
            if total_f > 12:
                contributions.append(
                    {
                        "feature": "total_follicles",
                        "label": "Total antral follicles",
                        "value": total_f,
                        "direction": "raises",
                        "weight": round(min(total_f * 0.05, 1.50), 2),
                    }
                )

        fol_right = self.data.get("follicle_no_r")
        if fol_right is not None:
            fol_right = float(fol_right)
            if fol_right > 6:
                contributions.append(
                    {
                        "feature": "follicle_no_r",
                        "label": "Follicles (right)",
                        "value": fol_right,
                        "direction": "raises",
                        "weight": round(min(fol_right * 0.06, 0.80), 2),
                    }
                )

        fol_left = self.data.get("follicle_no_l")
        if fol_left is not None:
            fol_left = float(fol_left)
            if fol_left > 6:
                contributions.append(
                    {
                        "feature": "follicle_no_l",
                        "label": "Follicles (left)",
                        "value": fol_left,
                        "direction": "raises",
                        "weight": round(min(fol_left * 0.06, 0.80), 2),
                    }
                )

        # AMH
        amh = self.data.get("amh_ngml")
        if amh is not None:
            amh = float(amh)
            if amh > 4.5:
                contributions.append(
                    {
                        "feature": "amh_ngml",
                        "label": "AMH",
                        "value": amh,
                        "direction": "raises",
                        "weight": round(min(amh * 0.08, 0.60), 2),
                    }
                )

        # LH/FSH ratio
        ratio = self.data.get("lhfsh_ratio")
        if ratio is not None:
            ratio = float(ratio)
            if ratio > 2:
                contributions.append(
                    {
                        "feature": "lhfsh_ratio",
                        "label": "LH / FSH ratio",
                        "value": ratio,
                        "direction": "raises",
                        "weight": round(min(ratio * 0.12, 0.50), 2),
                    }
                )

        # Cycle regularity index
        cri = self.data.get("cycle_ri")
        if cri is not None:
            cri = float(cri)
            contributions.append(
                {
                    "feature": "cycle_ri",
                    "label": "Cycle regularity index",
                    "value": cri,
                    "direction": "raises" if cri > 4 else "lowers",
                    "weight": round(abs(cri - 4) * 0.05, 2),
                }
            )

        # Sort by weight descending and take top signals
        contributions.sort(key=lambda x: x["weight"], reverse=True)
        return contributions[:8]
