import os
from http import HTTPStatus

from dotenv import load_dotenv
from fastapi import Depends, FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer

from api._config.loader import load_features
from api._config.log import setup_logger
from api._constants.schema import InferencePayload
from api._services.heuristic import Heuristic
from api._services.predictor import ModelPredictor

load_dotenv()

API_KEY = os.getenv("ML_MODEL_AUTH_HEADER")

# Paths to artifacts
ARTIFACTS_DIR = os.path.dirname(__file__)
FEATURES_JSON_PATH = os.path.join(ARTIFACTS_DIR, "model_features.json")
MODEL_XGB_PATH = os.path.join(ARTIFACTS_DIR, "model.xgb")

logger = setup_logger()

app = FastAPI(title="PCOS Pal API", version="1.0")
security = HTTPBearer(auto_error=False)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

predictor = None


def get_predictor():
    global predictor

    if predictor is None:
        try:
            predictor = ModelPredictor(MODEL_XGB_PATH)
        except Exception as e:
            logger.error(e)
            raise e

    return predictor


@app.post("/api/inference")
def predict_endpoint(payload: InferencePayload, auth: HTTPAuthorizationCredentials = Depends(security)):
    if not auth or auth.credentials != API_KEY:
        raise HTTPException(
            status_code=HTTPStatus.UNAUTHORIZED,
            detail="Unauthorized: Invalid or missing token",
        )
    data = payload.model_dump()
    feature_columns = load_features(FEATURES_JSON_PATH)

    # Count how many features are missing (NaN / None)
    total_features = len(feature_columns)
    provided = sum(1 for feature in feature_columns if data.get(feature) is not None)
    missing_count = total_features - provided

    try:
        pred = get_predictor()
        result = pred.predict(data)

        feature_contribs = pred.get_shap_contributions(feature_columns=feature_columns, data=data)

        return {
            **result,
            "feature_contributions": feature_contribs,
            "missing_features_count": missing_count,
        }
    except Exception as e:
        logger.error(f"XGBoost prediction failed, falling back to heuristic: {e}")
        heuristic = Heuristic(data)

        proba = heuristic.calculate()
        prediction = 1 if proba >= 0.5 else 0
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
