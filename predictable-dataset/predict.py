# # # # import pandas as pd
# # # # import numpy as np
# # # # from sklearn.ensemble import RandomForestRegressor

# # # # # Load the CSV file
# # # # data = pd.read_csv('data.csv', sep=',')

# # # # # Filter the data to include only the relevant columns
# # # # relevant_columns = ['Year', 'Country']
# # # # filtered_data = data[relevant_columns]

# # # # # Group the data by country and count the number of disasters per year
# # # # disaster_counts = filtered_data.groupby(['Country', 'Year']).size().reset_index(name='Count')

# # # # # Create a pivot table to reshape the data
# # # # pivot_table = disaster_counts.pivot(index='Country', columns='Year', values='Count').fillna(0)

# # # # # Prepare the input data for the model
# # # # X = pivot_table.columns.values.reshape(-1, 1)
# # # # countries = pivot_table.index.values

# # # # # Initialize the model
# # # # model = RandomForestRegressor(n_estimators=100, random_state=42)

# # # # # Train the model
# # # # model.fit(X, pivot_table.values)

# # # # # Predict the most probable year for a new disaster for each country
# # # # predictions = model.predict(X)
# # # # predicted_years = np.argmax(predictions, axis=1) + min(X)

# # # # # Create a dictionary to store the results
# # # # results = dict(zip(countries, predicted_years))

# # # # # Print the predicted years for each country
# # # # for country, year in results.items():
# # # #     print(f"Country: {country}, Most Probable Year: {year}")

# # # import pandas as pd
# # # import numpy as np
# # # from sklearn.linear_model import LinearRegression

# # # # Read the CSV file
# # # df = pd.read_csv('data.csv', sep=',')

# # # # Create a new column for the year of the disaster
# # # df["Year"] = df["Start Year"]

# # # # Drop any rows that do not have a value for the "Country" column
# # # df = df[df["Country"].notnull()]

# # # # Drop any rows that contain a NaN value in the "Total Damages ('000 US$)" column
# # # df = df.dropna(axis=0, how="any", subset=["Total Damages ('000 US$)"])

# # # # Group the data by country
# # # grouped = df.groupby("Country")

# # # # Fit a linear regression model to the data for each country
# # # models = {}
# # # for country, group in grouped:
# # #     models[country] = LinearRegression()
# # #     models[country].fit(group["Year"].values.reshape(-1, 1), group["Total Damages ('000 US$)"].values)

# # # # Predict the year of the next disaster for each country
# # # predictions = {}
# # # for country, model in models.items():
# # #     predictions[country] = model.predict(np.array([2023]).reshape(-1, 1))[0]

# # # # Print the results
# # # for country, prediction in predictions.items():
# # #     print(f"The most probable year for a new disaster in {country} is {prediction}")

# # import pandas as pd
# # import numpy as np
# # from sklearn.linear_model import LinearRegression

# # # Read the CSV file
# # df = pd.read_csv('data.csv', sep=',')

# # # Create a new column for the year of the disaster
# # df["Year"] = df["Start Year"]

# # # Drop any rows that do not have a value for the "Country" column
# # df = df[df["Country"].notnull()]

# # # Drop any rows that contain a NaN value in the "Total Damages ('000 US$)" column
# # df = df.dropna(axis=0, how="any", subset=["Total Damages ('000 US$)"])

# # # Group the data by country
# # grouped = df.groupby("Country")

# # # Fit a linear regression model to the data for each country
# # models = {}
# # for country, group in grouped:
# #     models[country] = LinearRegression()
# #     models[country].fit(group["Year"].values.reshape(-1, 1), group["Total Damages ('000 US$)"].values)

# # # Predict the year of the next disaster for each country
# # predictions = {}
# # for country, model in models.items():
# #     predictions[country] = model.predict(np.array([2023]).reshape(-1, 1))[0]

# # # Print the results
# # for country, prediction in predictions.items():
# #     print(f"The most probable year for a new disaster in {country} is {prediction}.")

# import pandas as pd
# import numpy as np
# from sklearn.ensemble import RandomForestRegressor

# # Load the CSV file
# data = pd.read_csv('data.csv', sep=',')

# # Filter the data to include only the relevant columns
# relevant_columns = ['Year', 'Country']
# filtered_data = data[relevant_columns]

# # Group the data by country and count the number of disasters per year
# disaster_counts = filtered_data.groupby(['Country', 'Year']).size().reset_index(name='Count')

# # Create a pivot table to reshape the data
# pivot_table = disaster_counts.pivot(index='Country', columns='Year', values='Count').fillna(0)

# # Prepare the input data for the model
# X = pivot_table.columns.values.reshape(-1, 1)
# countries = pivot_table.index.values

# # Initialize the model
# model = RandomForestRegressor(n_estimators=100, random_state=42)

# # Train the model
# model.fit(X, pivot_table.values)

# # Predict the most probable year for a new disaster for each country
# predictions = model.predict(X)
# predicted_years = np.argmax(predictions, axis=1) + min(X)

# # Create a dictionary to store the results
# results = dict(zip(countries, predicted_years))

# # Print the predicted years for each country
# for country, year in results.items():
#     print(f"Country: {country}, Most Probable Year: {year}")

# import pandas as pd
# import numpy as np
# from sklearn.ensemble import RandomForestRegressor

# # Load the CSV file
# data = pd.read_csv('data.csv', sep=',')

# # Filter the data to include only the relevant columns
# relevant_columns = ['Year', 'Country']
# filtered_data = data[relevant_columns]

# # Group the data by country and count the number of disasters per year
# disaster_counts = filtered_data.groupby(['Country', 'Year']).size().reset_index(name='Count')

# # Create a pivot table to reshape the data
# pivot_table = disaster_counts.pivot(index='Country', columns='Year', values='Count').fillna(0)

# # Prepare the input data for the model
# X = pivot_table.columns.values.reshape(-1, 1)
# countries = pivot_table.index.values

# # Initialize the model
# model = RandomForestRegressor(n_estimators=100, random_state=42)

# # Prepare the predicted years array
# predicted_years = []

# # Train and predict for each country
# for i, country in enumerate(countries):
#     country_data = pivot_table.loc[country].values.reshape(-1, 1)
#     if np.sum(country_data) > 0:
#         model.fit(X, country_data.ravel())  # Reshape the target variable
#         predictions = model.predict(X)
#         predicted_year = np.argmax(predictions) + min(X)
#     else:
#         predicted_year = 'No data available'
#     predicted_years.append(predicted_year)

# # Create a dictionary to store the results
# results = dict(zip(countries, predicted_years))

# # Print the predicted years for each country
# for country, year in results.items():
#     print(f"Country: {country}, Most Probable Year: {year}")

import pandas as pd
import numpy as np
from sklearn.ensemble import RandomForestRegressor

# Load the CSV file
data = pd.read_csv('data.csv', sep=',')

# Filter the data to include only the relevant columns
relevant_columns = ['Year', 'Country']
filtered_data = data[relevant_columns]

# Group the data by country and count the number of disasters per year
disaster_counts = filtered_data.groupby(['Country', 'Year']).size().reset_index(name='Count')

# Create a pivot table to reshape the data
pivot_table = disaster_counts.pivot(index='Country', columns='Year', values='Count').fillna(0)

# Prepare the input data for the model
X = pivot_table.columns.values.reshape(-1, 1)
countries = pivot_table.index.values

# Initialize the model
model = RandomForestRegressor(n_estimators=100, random_state=42)

# Prepare the predicted years array
predicted_years = []

# Train and predict for each country
for i, country in enumerate(countries):
    country_data = pivot_table.loc[country].values.reshape(-1, 1)
    if np.sum(country_data) > 0:
        model.fit(X, country_data.ravel())  # Reshape the target variable
        predictions = model.predict(X)
        predicted_years_country = np.argmax(predictions) + min(X)
    else:
        predicted_years_country = 'No data available'
    predicted_years.append(predicted_years_country)

# Create a dictionary to store the results
results = dict(zip(countries, predicted_years))

# Print the predicted years for each country for the next 10 years
for country, year in results.items():
    print(f"Country: {country}")
    if year == 'No data available':
        print("No data available")
    else:
        print("Predicted Years:")
        for i in range(10):
            print(year + i)
    print()
