# 🚀 GreenWay: Return Route Optimization 🗺️

✨ Proudly Presented by Team **ZOEO**: Tamanna Grover, Padmajaa, Nidhi, and Vigneshvar ✨

For the **Prestigious** ![K! HACKS 2.0](https://github.com/Padmajaa-S/GreenWay/blob/main/Essential-Images/Khacksimage.png)
# Return Fraud Detection System

## Overview
This project implements a **Return Fraud Detection System** that predicts whether a user is attempting return fraud based on past return history and purchase behavior. It consists of a **Vite.js frontend**, a **Node.js backend (Express.js)**, a **MongoDB database**, and a **Machine Learning model served via FastAPI**.

## Tech Stack
- **Frontend:** Vite.js (React)
- **Backend:** Node.js (Express.js)
- **Database:** MongoDB Atlas
- **Machine Learning Model API:** Python (FastAPI, joblib)
- **Deployment:** Can be hosted on Render, Vercel, or AWS

## Architecture
1. **User inputs User ID** in the Vite.js frontend.
2. **Frontend sends a request** to `http://localhost:5000/predict`.
3. **Express.js backend queries MongoDB** for user data.
4. **Backend forwards user data to FastAPI**, which hosts the ML model.
5. **ML model predicts spam or not** and sends back the response.
6. **Frontend displays the prediction.**

## Installation & Setup

### **1. Clone the Repository**
```bash
git clone https://github.com/your-username/return-fraud-detection.git
cd return-fraud-detection
```

### **2. Set Up the Backend (Node.js + Express)**
```bash
cd backend
npm install
node server.js
```

### **3. Set Up the Frontend (Vite.js + React)**
```bash
cd frontend
npm install
npm run dev
```

### **4. Set Up the ML Model API (FastAPI + Python)**
```bash
cd ml_api
pip install -r requirements.txt
uvicorn main:app --reload
```

## API Endpoints
### **Backend (Node.js - Express.js)**
- `POST /predict`
  - **Input:** `{ "user_id": "1234" }`
  - **Response:** `{ "user_id": "1234", "prediction": "SPAM" or "NOT SPAM" }`

### **ML Model API (FastAPI)**
- `POST /predict`
  - **Input:** JSON payload with user data
  - **Output:** `{ "prediction": "SPAM" or "NOT SPAM" }`

## Environment Variables
Create a `.env` file inside the **backend** directory with the following details:
```
MONGO_URI=mongodb+srv://your_username:your_password@your-cluster.mongodb.net/
```

## Deployment
- Frontend can be deployed on **Vercel or Netlify**.
- Backend and ML API can be deployed on **Render or AWS Lambda**.

## License
This project is licensed under the MIT License.

---
### **Contributors**
- [Your Name](https://github.com/your-username)

