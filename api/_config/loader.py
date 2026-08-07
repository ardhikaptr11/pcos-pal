import json
from typing import List

from api._config.log import setup_logger

logger = setup_logger()


def load_features(path: str):
    feature_columns: List[str] = []
    try:
        with open(path, "r") as f:
            feature_columns = json.load(f)

        logger.info(f"Successfully loaded {len(feature_columns)} feature columns.")

        return feature_columns
    except Exception as e:
        logger.error(f"Error loading feature columns: {e}")
        return feature_columns
