import numpy as np
import pickle
from sklearn.ensemble import RandomForestClassifier

# Train a simple model
model = RandomForestClassifier()
model.fit([[500, 50, 450], [2000, 100, 1800], [80, 25, 60]], [2, 2, 0])
pickle.dump(model, open('model.pkl', 'wb'))

def predict_popularity(event):
    model = pickle.load(open('model.pkl', 'rb'))
    input_data = np.array([[event['attendees'], event['ticket_price'], event['past_attendance']]])
    prediction = model.predict(input_data)
    return ['Low', 'Medium', 'High'][prediction[0]]
