#!/usr/bin/env python3
"""
Generate visualizations - simple version.
Run: python Medical_visualizer.py
"""

import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
from sklearn.metrics import roc_curve, confusion_matrix, roc_auc_score
import joblib
import os


def generate_plots():
    # Load artifacts
    df = pd.read_csv('dataset.csv')
    model = joblib.load('stress_model.pkl')
    scaler = joblib.load('scaler.pkl')
    features = joblib.load('features.pkl')

    # Prepare data
    X = df[features].values
    y = df['stress_label'].values
    X_scaled = scaler.transform(X)
    from sklearn.model_selection import train_test_split
    _, X_test, _, y_test = train_test_split(X_scaled, y, test_size=0.2, random_state=42)
    y_prob = model.predict_proba(X_test)[:, 1]
    y_pred = model.predict(X_test)

    os.makedirs('plots', exist_ok=True)
    print("📈 Generating plots...")

    # 1. Correlation Heatmap
    plt.figure(figsize=(8, 6))
    corr = df[features].corr()
    plt.imshow(corr, cmap='coolwarm', vmin=-1, vmax=1)
    plt.colorbar(label='Correlation')
    plt.xticks(range(len(features)), features, rotation=45, ha='right', fontsize=8)
    plt.yticks(range(len(features)), features, fontsize=8)
    for i in range(len(features)):
        for j in range(len(features)):
            plt.text(j, i, f'{corr.iloc[i, j]:.2f}', ha='center', va='center', fontsize=7)
    plt.title('Feature Correlation')
    plt.tight_layout()
    plt.savefig('plots/01_correlation.png', dpi=150)
    print("✓ 01_correlation.png")

    # 2. Class Distribution
    plt.figure(figsize=(6, 4))
    counts = df['stress_label'].value_counts().sort_index()
    plt.bar(['Low (0)', 'High (1)'], counts.values, color=['#4CAF50', '#F44336'])
    plt.title('Class Distribution')
    plt.ylabel('Count')
    plt.tight_layout()
    plt.savefig('plots/02_classes.png', dpi=150)
    print("✓ 02_classes.png")

    # 3. ROC Curve
    fpr, tpr, _ = roc_curve(y_test, y_prob)
    auc = roc_auc_score(y_test, y_prob)
    plt.figure(figsize=(6, 5))
    plt.plot(fpr, tpr, label=f'AUC = {auc:.3f}', color='#2196F3', linewidth=2)
    plt.plot([0, 1], [0, 1], 'k--')
    plt.xlabel('False Positive Rate')
    plt.ylabel('True Positive Rate')
    plt.title('ROC Curve')
    plt.legend()
    plt.grid(alpha=0.3)
    plt.tight_layout()
    plt.savefig('plots/03_roc.png', dpi=150)
    print("✓ 03_roc.png")

    # 4. Feature Coefficients (Ethics)
    coeffs = model.coef_[0]
    colors = ['#F44336' if c > 0 else '#4CAF50' for c in coeffs]
    plt.figure(figsize=(8, 5))
    plt.barh(features, coeffs, color=colors)
    plt.axvline(0, color='gray', linestyle='--', linewidth=0.5)
    plt.xlabel('Coefficient (↑ = More Risk)')
    plt.title('Feature Influence')
    plt.grid(axis='x', alpha=0.3)
    plt.tight_layout()
    plt.savefig('plots/04_features.png', dpi=150)
    print("✓ 04_features.png ← Ethics Slide")

    # 5. Confusion Matrix
    cm = confusion_matrix(y_test, y_pred)
    plt.figure(figsize=(5, 4))
    plt.imshow(cm, cmap='Blues')
    plt.colorbar(label='Count')
    for i in range(2):
        for j in range(2):
            plt.text(j, i, str(cm[i, j]), ha='center', va='center', fontsize=14, fontweight='bold')
    plt.title('Confusion Matrix')
    plt.ylabel('Actual')
    plt.xlabel('Predicted')
    plt.xticks([0, 1], ['Low', 'High'])
    plt.yticks([0, 1], ['Low', 'High'])
    plt.tight_layout()
    plt.savefig('plots/05_confusion.png', dpi=150)
    print("✓ 05_confusion.png")

    print(f"\n✅ All 5 plots saved to /plots/")
    print("💡 Tip: Run `open plots/*.png` on Mac to view them")


if __name__ == "__main__":
    generate_plots()