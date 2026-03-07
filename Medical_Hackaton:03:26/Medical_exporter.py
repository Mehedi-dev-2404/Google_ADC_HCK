import joblib
import json


def export_artifacts():
    model = joblib.load('stress_model.pkl')
    scaler = joblib.load('scaler.pkl')
    features = joblib.load('features.pkl')

    documentation = {
        "model_type": "Logistic Regression (scikit-learn)",
        "input_features": features,
        "bias_mitigation": "No demographic data. Class weights balanced to prevent majority-class bias.",
        "threshold_trigger": 0.70,
        "interpretability": "Coefficients indicate feature direction/magnitude",
        "version": "1.0"
    }

    with open('model_card.json', 'w') as f:
        json.dump(documentation, f, indent=2)
    print("✓ Export complete: model_card.json")


if __name__ == "__main__":
    export_artifacts()