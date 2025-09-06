# import pandas as pd
# import numpy as np

# # Load realistic dataset
# df = pd.read_csv("combined_weather_seismic_realistic.csv")

# # Number of new rows to generate
# target_size = 10000
# current_size = len(df)
# needed = target_size - current_size

# # ------------------------
# # Step 1: Bootstrap sample
# # ------------------------
# boot_df = df.sample(needed, replace=True, random_state=42).reset_index(drop=True)

# # ------------------------
# # Step 2: Add small noise to numeric columns
# # ------------------------
# numeric_cols = df.select_dtypes(include=[np.number]).columns.tolist()
# numeric_cols.remove("final_label")  # Don't add noise to labels

# for col in numeric_cols:
#     std = df[col].std() * 0.01  # 1% of std deviation
#     boot_df[col] = boot_df[col] + np.random.normal(0, std, size=len(boot_df))

# # ------------------------
# # Step 3: Keep final_label consistent
# # ------------------------
# # Recompute final_label if you still have original weather_label and quake_label
# # If not, just keep existing final_label from sampled rows

# # ------------------------
# # Step 4: Combine with original
# # ------------------------
# df_expanded = pd.concat([df, boot_df], axis=0).reset_index(drop=True)

# # Save
# df_expanded.to_csv("combined_weather_seismic_realistic_10000.csv", index=False)
# print("✅ Expanded dataset saved with 10,000 rows")
# print(df_expanded.head())
# print(df_expanded.shape)


import pandas as pd

# Load expanded dataset
df = pd.read_csv("combined_weather_seismic_realistic_10000.csv")

# Compute correlation matrix
corr_matrix = df.corr()

# Print correlation with final_label
print("Correlation with final_label:\n")
print(corr_matrix["final_label"].sort_values(ascending=False))

# Optional: full correlation matrix
# print("\nFull correlation matrix:\n", corr_matrix)
