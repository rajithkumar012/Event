import pandas as pd
import numpy as np
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
from sklearn.metrics import classification_report
import pickle

# Load dataset
file_path = "event_dataset.xlsx"  # Ensure the file is in the project root folder
data = pd.read_excel(file_path)   # Read the Excel file

# Check data types to identify any date columns
print(data.dtypes)  # This will help identify which columns are dates

# Convert categorical variables into dummy/indicator variables
data = pd.get_dummies(data, columns=['title', 'location', 'category'], drop_first=True)

# Select features and labels
X = data.drop(columns=['popularity'])  # Drop popularity from features
y = data['popularity'].map({'Low': 0, 'Medium': 1, 'High': 2})  # Convert labels to numbers

# Identify and drop date columns
date_columns = X.select_dtypes(include=['object', 'datetime']).columns.tolist()
print("Dropping date columns:", date_columns)  # Log which columns are being dropped
X = X.drop(columns=date_columns, errors='ignore')  # Safely drop any date columns

# Normalize numerical features
numerical_features = ['attendees', 'ticket_price', 'past_attendance']  # Adjust this list based on your dataset
X[numerical_features] = StandardScaler().fit_transform(X[numerical_features])

# Train-Test Split
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Train Model
model = RandomForestClassifier(n_estimators=100, random_state=42)
model.fit(X_train, y_train)

# Evaluate Model
y_pred = model.predict(X_test)
print(classification_report(y_test, y_pred))

# Save Model
pickle.dump(model, open('model.pkl', 'wb'))
print("Model training complete! Saved as 'model.pkl'")
