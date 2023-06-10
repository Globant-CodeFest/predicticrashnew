import pandas as pd

# Load the dataset
data = pd.read_csv('data.csv')

# Select relevant features (Year, Disaster Group, Disaster Subgroup, Country)
features = ['Year', 'Disaster Group', 'Disaster Subgroup', 'Country']

# Filter data for a specific year and country
specific_year = 2020
specific_country = 'China'
filtered_data = data[(data['Year'] == specific_year) & (data['Country'] == specific_country)]

# Check if there is any data available for the specified year and country
if filtered_data.empty:
    print("No data available for the specified year and country.")
else:
    # Count the occurrences of each Disaster Group and Disaster Subgroup
    disaster_group_counts = filtered_data['Disaster Group'].value_counts()
    disaster_subgroup_counts = filtered_data['Disaster Subgroup'].value_counts()

    if disaster_group_counts.empty or disaster_subgroup_counts.empty:
        print("No disaster group or subgroup data available for the specified year and country.")
    else:
        # Get the most common Disaster Group and Disaster Subgroup
        most_common_disaster_group = disaster_group_counts.idxmax()
        most_common_disaster_subgroup = disaster_subgroup_counts.idxmax()

        print("In {}, the most common disaster group in {} was: {}".format(specific_year, specific_country, most_common_disaster_group))
        print("The most common disaster subgroup in {} for {} was: {}".format(specific_year, specific_country, most_common_disaster_subgroup))
