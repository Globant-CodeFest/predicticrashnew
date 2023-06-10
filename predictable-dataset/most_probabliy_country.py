import pandas as pd

# Read the CSV file
data = pd.read_csv("data.csv", sep=',')

# Group the data by country and count the occurrences of natural disasters
country_disaster_counts = data.groupby("Country")["Disaster Type"].count()

# Sort the countries by the count of natural disasters in descending order
sorted_countries = country_disaster_counts.sort_values(ascending=False)

# Get the country with the highest count of natural disasters
most_likely_country = sorted_countries.index[0]

print("Country Most Likely to Have a New Natural Disaster:", most_likely_country)
