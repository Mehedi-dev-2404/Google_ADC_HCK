import pandas as pd
import numpy as np


def generate_data(n_samples=2000):
    np.random.seed(42)

    # 1. Generate Features
    data = {
        'hrv': np.random.uniform(20, 100, n_samples),
        'eda': np.random.uniform(0, 5, n_samples),
        'sleep_quality': np.random.uniform(0, 100, n_samples),
        'spoon_count': np.random.uniform(1, 10, n_samples),
        'sensory_load': np.random.uniform(1, 10, n_samples),
        'masking_level': np.random.uniform(1, 10, n_samples),
        'social_demands': np.random.randint(0, 10, n_samples)
    }

    df = pd.DataFrame(data)

    # 2. Create Balanced Target (50/50 split)
    # Lower threshold to ensure both classes exist
    stress_score = (
            (100 - df['hrv']) * 0.3 +
            (10 - df['spoon_count']) * 0.3 +
            df['masking_level'] * 0.2 +
            df['social_demands'] * 0.1 +
            df['sensory_load'] * 0.1
    )

    # Use median for 50/50 split
    threshold = np.median(stress_score)
    df['stress_label'] = (stress_score > threshold).astype(int)

    # Verify balance
    print(f"Class distribution: {df['stress_label'].value_counts().to_dict()}")

    # 3. Save
    df.to_csv('dataset.csv', index=False)
    print(f"Generated {n_samples} samples. Saved to dataset.csv")


if __name__ == "__main__":
    generate_data()