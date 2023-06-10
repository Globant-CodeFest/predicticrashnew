import pandas as pd

# Read the CSV file
data = pd.read_csv("data.csv", sep=',')

# Remove the ' character from the column name
data.rename(columns={"Insured Damages ('000 US$)": "Insured Damages"}, inplace=True)

# Convert the column to numeric
data["Insured Damages"] = pd.to_numeric(data["Insured Damages"], errors="coerce")

# Calculate the total insured damages
total_insured_damages = data["Insured Damages"].sum()

print("Total Insured Damages (in US$):", total_insured_damages)

# 875.321.961.0