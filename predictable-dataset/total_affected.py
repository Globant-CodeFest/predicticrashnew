import pandas as pd

# Read the CSV file
data = pd.read_csv("data.csv", sep=',')

# Convert the column to numeric
data["Total Affected"] = pd.to_numeric(data["Total Affected"], errors="coerce")

# Calculate the total number of people affected
total_affected = data["Total Affected"].sum()

print("Total Affected:", total_affected)

# 8.323.682.171.0