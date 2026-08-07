from typing import Any, Dict, List

import numpy as np
import xgboost as xgb

from api._config.log import setup_logger
from api._constants.labels import FEATURE_LABELS
from api._services.heuristic import Heuristic

logger = setup_logger()


class ModelPredictor:
    OPTIMAL_THRESHOLD = 0.49213

    def __init__(self, model_path):
        self.model_path = model_path
        self.dmatrix: xgb.DMatrix | None = None

        # Calculated from the test dataset's ROC Curve

        try:
            logger.info(f"Loading model from {model_path}...")

            self.model = xgb.Booster()
            self.model.load_model(model_path)

            logger.info("Model successfully loaded into memory.")
        except Exception as e:
            raise RuntimeError(f"Model inisialization failed: {e}")

    def predict(self, input_data: dict) -> Dict[str, Any]:
        try:
            expected_features = self.model.feature_names

            if not expected_features:
                raise ValueError("Expected features not found in the model.")

            # Dynamic reordering & handle missing values
            ordered_values = [
                input_data.get(col) if input_data.get(col) is not None else np.nan for col in expected_features
            ]

            input_array = np.array([ordered_values], dtype=float)

            # Convert DataFrame to DMatrix dedicated for XGBoost native
            self.dmatrix = xgb.DMatrix(input_array, feature_names=expected_features)
            prediction_array = self.model.predict(self.dmatrix)

            proba = float(prediction_array[0])
            prediction = 1 if proba >= self.OPTIMAL_THRESHOLD else 0
            labels = "positive" if prediction == 1 else "negative"
            confidence_score = round(proba if prediction == 1 else (1.0 - proba), 4)

            result = {
                "prediction": prediction,
                "labels": labels,
                "confidence_score": confidence_score,
            }

            if labels == "negative":
                if proba >= 0.35:
                    risk_level = "high"
                elif proba >= 0.15:
                    risk_level = "moderate"
                else:
                    risk_level = "low"

                result["positive_proba"] = round(proba, 4)
                result["risk_level"] = risk_level

            return result
        except Exception as e:
            error_msg = f"Error during inference: {str(e)}"
            logger.error(error_msg)
            raise RuntimeError(error_msg)

    def get_shap_contributions(self, feature_columns: List[str], data: Dict[str, Any]) -> List[Dict[str, Any]]:
        contributions = []

        try:
            shap_values = self.model.predict(self.dmatrix, pred_contribs=True)
            # shap_values shape: (1, num_features + 1), last column is bias
            shap_row = shap_values[0][:-1]  # exclude bias term

            for i, feature in enumerate(feature_columns):
                shap_val = float(shap_row[i])
                if abs(shap_val) < 0.01:
                    continue  # skip negligible contributions

                raw_val = data.get(feature)
                label = FEATURE_LABELS.get(feature, feature.replace("_", " ").title())

                contributions.append(
                    {
                        "feature": feature,
                        "label": label,
                        "value": raw_val,
                        "direction": "raises" if shap_val > 0 else "lowers",
                        "weight": round(abs(shap_val), 2),
                    }
                )

            contributions.sort(key=lambda x: x["weight"], reverse=True)
            return contributions[:8]
        except Exception as e:
            heuristic = Heuristic(data)

            print(f"SHAP computation failed, falling back to heuristics: {e}")
            return heuristic.build()
