# Rockfall Prediction System

A smart solution developed under Smart India Hackathon (SIH) for predicting and mitigating rockfall hazards in hilly and mountainous regions. The system leverages IoT sensors, data analytics, and machine learning models to assess slope stability, detect early warning signs, and predict potential rockfall events to ensure safety and minimize damage.

# 🚀 Features

- Real-time Monitoring – Uses IoT sensors (accelerometers, vibration, weather, soil moisture, etc.) to collect live data.

- Machine Learning Prediction – AI-based models trained on environmental and geological datasets for rockfall prediction.

- Alert System – Early warning notifications via web dashboard, SMS, or app alerts.

- Data Visualization – Interactive dashboard for slope conditions, historical data, and prediction results.

- Scalable Architecture – Cloud-ready system that supports large-scale deployments.

- Customizable Account Settings

# 🏗️ System Architecture

- Sensors Layer – Hardware sensors for data collection.

- Data Processing Layer – Preprocessing, filtering, and anomaly detection.

- Prediction Model – ML/AI algorithms to predict probability of rockfall.

- Alert & Visualization Layer – Web dashboard and mobile notifications.

# 📊 Tech Stack

Frontend: Next.js + TailwindCSS

Backend: Supabase as backend + Express Node.js + FastAPI 

Database: MongoDB + PostgreSQL

ML Models: Python (scikit-learn, TensorFlow, PyTorch)

# ⚡ Installation & Setup

## Clone repository
git clone [https://github.com/Sandeep-12pcm/sih_rockfall_predictor_alert_system.git](https://github.com/Sandeep-12pcm/sih_rockfall_predictor_alert_system.git)

cd sih_rockfall_predictor_alert_system

## ML MODEL

### Setup

cd ml_model

python -m venv model # create virtual environment for python libraries (recommended python v3.13)

pip install -r requirements.txt # install python required libraries

### Run Model


## FRONTEND

cd frontend

npm i

npm run dev

## BACKEND (optional)

cd backend

npm i

nodemon server
