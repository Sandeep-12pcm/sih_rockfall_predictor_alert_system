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

python -m venv model #create virtual environment for python libraries (recommended python v3.13)

model/Scripts/activate #activate the environment 

pip install -r requirements.txt #install python required libraries

### Run Model

python python .\simulate.py #start synthetic signal simulator 

uvicorn app.main:app --reload #run the model to start predictions

## FRONTEND

#(set .env file for supabase)

cd frontend

npm i

npm run dev

## BACKEND (for notifications, sms & mail alerts)

#(create .env file for twilio)

cd backend

npm i

nodemon server

# 📌 Usage

- Deploy sensors in the field to collect real-time geological data.

- The backend processes sensor data and runs prediction models.

- Dashboard displays slope stability status, rockfall probability, and historical records.

- Alerts are triggered if risk crosses threshold levels.

# 🎯 Applications

- Machines and Lives protection in pit holes mining areas

- Highway & railway projects in hilly regions

- Tunneling and mining safety

- Disaster management and early warning systems

- Infrastructure protection in landslide-prone areas

# 🛠️ Future Improvements

- Integration with satellite imagery & remote sensing data

- Integration with Senors

- Use real data for model trainings

- Advanced deep learning models for higher accuracy

- Mobile app for local authorities and travelers

- Predictive maintenance for sensors

# 👥 Team

Developed by "TECTONICS" as part of Smart India Hackathon (SIH).

(Sandeep, Krish Dhamecha, Abhishek Makwana, Manthan Parmar, Vishva Parmar)




