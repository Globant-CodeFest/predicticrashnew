import pandas as pd
from sklearn.experimental import enable_hist_gradient_boosting
from sklearn.ensemble import HistGradientBoostingClassifier
from sklearn.impute import SimpleImputer
from sklearn.pipeline import make_pipeline
from sklearn.compose import ColumnTransformer
from sklearn.preprocessing import LabelEncoder

# Load the dataset
data = pd.read_csv('data.csv')

# Select relevant features for prediction (Disaster Group, Disaster Subgroup, Year)
features = ['Disaster Group', 'Disaster Subgroup', 'Year']

# Filter data for the desired time range (e.g., 1900-2022 for training)
train_data = data[(data['Year'] >= 1900) & (data['Year'] <= 2021)]

if train_data.empty:
    print("Insufficient historical data available for training the model.")
else:
    # Encode categorical features
    label_encoder = LabelEncoder()
    for feature in ['Disaster Group', 'Disaster Subgroup']:
        train_data[feature] = label_encoder.fit_transform(train_data[feature])

    # Count the number of samples per class
    class_counts = train_data['Country'].value_counts()

    # Filter classes with at least two samples
    valid_classes = class_counts[class_counts >= 2].index

    # Filter the training data based on valid classes
    train_data = train_data[train_data['Country'].isin(valid_classes)]

    # Split the training data into features and target variable
    X_train = train_data[features]
    y_train = train_data['Country']

    # Create a pipeline for preprocessing and modeling
    preprocessing_pipeline = ColumnTransformer(
        transformers=[
            ('num_imputer', SimpleImputer(strategy='median'), ['Year'])
        ],
        remainder='passthrough'
    )

    model = make_pipeline(
        preprocessing_pipeline,
        HistGradientBoostingClassifier()
    )

    # Train the HistGradientBoostingClassifier model
    model.fit(X_train, y_train)

    # Prepare the prediction data
    prediction_data = pd.DataFrame(columns=features)
    prediction_data['Year'] = [2023]

    # Make predictions for the next year
    predicted_countries = model.predict(prediction_data)

    # Get the most probable country based on the prediction
    most_probable_country = max(set(predicted_countries), key=list(predicted_countries).count)

    print("The most probable country to have another disaster in 2023 is: {}".format(most_probable_country))
