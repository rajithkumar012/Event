Event Management System
A full-stack Event Management System built with Django REST Framework, React.js, and Machine Learning to predict event popularity.

📌 Features
✔️ Event CRUD (Create, Read, Update, Delete)
✔️ Event Popularity Prediction using Machine Learning (Random Forest Classifier)
✔️ REST API built with Django REST Framework
✔️ Frontend built with React.js
✔️ PostgreSQL/MySQL database
✔️ Machine Learning model using scikit-learn

🏗️ Tech Stack & Tools Used
Backend (Django & DRF)
✔️ Django 4.x (Web Framework)
✔️ Django REST Framework (DRF) (API Development)
✔️ PostgreSQL / MySQL (Database)
✔️ Poetry (Dependency Management)
✔️ Scikit-Learn (Machine Learning for Popularity Prediction)
✔️ Django ORM (Database Interactions)
Frontend (React.js & CSS)
✔️ React.js 18+
✔️ React Router
✔️ Axios (API Calls)
Machine Learning Model
✔️ Random Forest Classifier (Popularity Prediction)
✔️ Scikit-Learn
✔️ Pandas & NumPy
Objective
The goal of this project is to design and develop a full-stack web application that efficiently fetches, displays, and manages event data through a structured API. Additionally, a machine learning model is implemented to predict the popularity of events based on historical data and given attributes.

Setup Instructions
Prerequisites
Make sure you have the following installed:

Python 3.x
Poetry

Installation
Clone the repository:
git clone <repository-url>
cd <repository-directory>

Install dependencies:
poetry install
Set up the backend:

Navigate to the backend directory:
cd backend

Apply migrations:
python manage.py migrate

Run the server:
python manage.py runserver
Set up the frontend:

Navigate to the frontend directory:
cd ../frontend

Install React dependencies:
npm install

Start the React application:
npm start

Accessing the Application
The backend will be running on http://127.0.0.1:8000.
The frontend will be running on http://localhost:3000.

Usage
Use the frontend interface to fetch and display events.
Add new events through the form.
Monitor predictions on event popularity based on the machine learning model.
Contributing
Contributions are welcome! Please fork the repository and submit a pull request for any improvements.

License
This project is licensed under the MIT License - see the LICENSE file for details.
