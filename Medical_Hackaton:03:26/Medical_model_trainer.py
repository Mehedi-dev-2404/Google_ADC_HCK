import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import classification_report, roc_auc_score
import joblib


def train_model():
    # 1. Load Data
    try:
        df = pd.read_csv('dataset.csv')
    except FileNotFoundError:
        print("❌ Error: dataset.csv not found. Run Medical_data_generator.py first.")
        return

    features = ['hrv', 'eda', 'sleep_quality', 'spoon_count',
                'sensory_load', 'masking_level', 'social_demands']

    # Check if all features exist
    if not all(f in df.columns for f in features):
        print("❌ Error: Missing features in dataset.csv")
        return

    X = df[features].values
    y = df['stress_label'].values

    # 2. Verify Classes (Prevent single-class error)
    if len(np.unique(y)) < 2:
        print("❌ Error: Dataset contains only one class. Check Medical_data_generator.py logic.")
        return

    # 3. Preprocess
    scaler = StandardScaler()
    X_scaled = scaler.fit_transform(X)

    # Remove stratify to avoid crash if classes are slightly imbalanced
    X_train, X_test, y_train, y_test = train_test_split(
        X_scaled, y, test_size=0.2, random_state=42)

    # 4. Train Model
    model = LogisticRegression(max_iter=1000, class_weight='balanced')
    model.fit(X_train, y_train)

    # 5. Evaluate
    y_pred = model.predict(X_test)
    y_prob = model.predict_proba(X_test)[:, 1]

    print("\n📊 Model Performance:")
    print(classification_report(y_test, y_pred))
    print(f"ROC-AUC Score: {roc_auc_score(y_test, y_prob):.3f}")

    # 6. Feature Importance (for Ethics Slide)
    print("\n🔍 Feature Influence (Coefficients):")
    for feat, coef in zip(features, model.coef_[0]):
        direction = "↑ Risk" if coef > 0 else "↓ Risk"
        print(f"   {feat}: {coef:.3f} ({direction})")

    # 7. Save Artifacts
    joblib.dump(model, 'stress_model.pkl')
    joblib.dump(scaler, 'scaler.pkl')
    joblib.dump(features, 'features.pkl')
    print("\n✓ Artifacts saved: stress_model.pkl, scaler.pkl, features.pkl")


if __name__ == "__main__":
    train_model()