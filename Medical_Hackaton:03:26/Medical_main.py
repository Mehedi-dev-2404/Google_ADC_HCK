#!/usr/bin/env python3
"""
Stress Detection ML Pipeline
Run: python Medical_main.py
"""

import sys
import joblib
import numpy as np


def run_pipeline():
    print("🚀 Starting Stress Detection Pipeline\n")

    try:
        # Step 1: Generate Data
        print("📊 [1/5] Generating synthetic dataset...")
        from Medical_data_generator import generate_data
        generate_data(n_samples=2000)
        print("✓ Dataset created: dataset.csv\n")

        # Step 2: Train Model
        print("🧠 [2/5] Training logistic regression model...")
        from Medical_model_trainer import train_model
        train_model()
        print("✓ Model trained & saved\n")

        # Step 3: Export Artifacts
        print("📦 [3/5] Exporting artifacts & documentation...")
        from Medical_exporter import export_artifacts
        export_artifacts()
        print("✓ Export complete\n")

        # Step 4: Generate Visualizations
        print("🎨 [4/5] Generating visualizations...")
        from Medical_visualizer import generate_plots
        generate_plots()
        print("✓ Visualizations saved to /plots/\n")

        # Step 5: Live Prediction Tests (Multiple Scenarios)
        print("🧪 [5/5] Running live prediction tests...\n")
        run_test_scenarios()

        # Final Summary
        print("✅ Pipeline Finished Successfully!")
        print("\n📁 Deliverables for Mehedi:")
        print("   • stress_model.pkl  → Load with joblib.load()")
        print("   • scaler.pkl        → Preprocess input the same way")
        print("   • features.pkl      → Expected input order")
        print("   • model_card.json   → Ethics/transparency docs")
        print("\n📊 Visualizations (for slides/report):")
        print("   • plots/01_correlation_heatmap.png")
        print("   • plots/02_class_distribution.png")
        print("   • plots/03_roc_curve.png")
        print("   • plots/04_feature_importance.png ← Ethics slide")
        print("   • plots/05_confusion_matrix.png")
        print("\n🔑 Threshold: Trigger help prompt if probability > 0.70")

        return 0

    except ImportError as e:
        print(f"❌ Import Error: {e}")
        print("💡 Run: pip install scikit-learn joblib pandas numpy matplotlib")
        return 1
    except FileNotFoundError as e:
        print(f"❌ File Error: {e}")
        return 1
    except Exception as e:
        print(f"❌ Unexpected Error: {e}")
        import traceback
        traceback.print_exc()
        return 1


def run_test_scenarios():
    """Test model with multiple stress scenarios"""
    model = joblib.load('stress_model.pkl')
    scaler = joblib.load('scaler.pkl')
    features = joblib.load('features.pkl')

    # Define test scenarios
    scenarios = [
        {
            "name": "🟢 Low Stress (Healthy)",
            "input": {
                'hrv': 85, 'eda': 1.0, 'sleep_quality': 90, 'spoon_count': 9,
                'sensory_load': 2, 'masking_level': 2, 'social_demands': 2
            },
            "expected": "Low stress, no trigger"
        },
        {
            "name": "🟡 Moderate Stress (Warning)",
            "input": {
                'hrv': 55, 'eda': 2.5, 'sleep_quality': 60, 'spoon_count': 5,
                'sensory_load': 5, 'masking_level': 5, 'social_demands': 5
            },
            "expected": "Moderate stress, borderline"
        },
        {
            "name": "🔴 High Stress (Critical)",
            "input": {
                'hrv': 30, 'eda': 4.5, 'sleep_quality': 40, 'spoon_count': 2,
                'sensory_load': 8, 'masking_level': 9, 'social_demands': 7
            },
            "expected": "High stress, trigger help"
        },
        {
            "name": "🔴 Burnout Risk (Extreme)",
            "input": {
                'hrv': 25, 'eda': 4.8, 'sleep_quality': 30, 'spoon_count': 1,
                'sensory_load': 10, 'masking_level': 10, 'social_demands': 9
            },
            "expected": "Extreme stress, urgent trigger"
        },
        {
            "name": "🟡 Low Sleep + High Demands",
            "input": {
                'hrv': 60, 'eda': 2.0, 'sleep_quality': 35, 'spoon_count': 4,
                'sensory_load': 4, 'masking_level': 6, 'social_demands': 8
            },
            "expected": "Sleep/deadline pressure"
        },
        {
            "name": "🟡 High Masking (Hidden Stress)",
            "input": {
                'hrv': 70, 'eda': 1.5, 'sleep_quality': 75, 'spoon_count': 6,
                'sensory_load': 3, 'masking_level': 9, 'social_demands': 4
            },
            "expected": "Masking-driven burnout risk"
        }
    ]

    print(f"{'Scenario':<35} {'Probability':<12} {'Trigger':<10} {'Expected'}")
    print("─" * 85)

    results = []
    for scenario in scenarios:
        X = np.array([[scenario["input"][f] for f in features]])
        X_scaled = scaler.transform(X)
        prob = model.predict_proba(X_scaled)[0][1]
        trigger = prob > 0.70

        trigger_str = "✅ YES" if trigger else "❌ NO"
        results.append({
            "name": scenario["name"],
            "probability": prob,
            "trigger": trigger,
            "expected": scenario["expected"]
        })

        print(f"{scenario['name']:<35} {prob:>10.2%}   {trigger_str:<10} {scenario['expected']}")

    # Summary stats
    print("\n📊 Test Summary:")
    triggered = sum(1 for r in results if r["trigger"])
    not_triggered = len(results) - triggered
    avg_prob = np.mean([r["probability"] for r in results])

    print(f"   • Total Scenarios: {len(results)}")
    print(f"   • Triggered Help: {triggered}")
    print(f"   • No Trigger: {not_triggered}")
    print(f"   • Average Stress Probability: {avg_prob:.2%}")

    # Verify model behavior
    print("\n✅ Model Behavior Validation:")
    low_stress = results[0]["probability"]
    high_stress = results[2]["probability"]
    if high_stress > low_stress:
        print(f"   ✓ High stress scenario ({high_stress:.2%}) > Low stress ({low_stress:.2%})")
    else:
        print(f"   ⚠ Warning: Model may not be differentiating stress levels correctly")


if __name__ == "__main__":
    sys.exit(run_pipeline())