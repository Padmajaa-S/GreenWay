# 🚀 GreenWay: Return Route Optimization System🗺️

✨ Proudly Presented by Team **ZOEO**: Tamanna Grover, Padmajaa, Nidhi, and Vigneshvar ✨

For the **Prestigious** ![K! HACKS 2.0](https://github.com/Padmajaa-S/GreenWay/blob/main/Essential-Images/Khacksimage.png)
Here’s a **README.md** file for your Greenway project. Let me know if you'd like any modifications! 🚀  

---

# Greenway - AI-Powered Return Optimization System  

Greenway is an AI-powered return management system designed to optimize logistics, reduce e-waste, and ensure efficient processing of product returns. The system consists of three portals:  

1. **User Portal** - Allows users to submit return requests, undergo spam detection, and verify product similarity.  
2. **Warehouse Portal** - Manages return evaluation, categorization, and processing based on item condition.  
3. **Admin Portal** - Provides a dashboard with analytics on return trends, sustainability metrics, and cost savings.  

## 🌟 Features  

✅ **Spam Detection** - Identifies fraudulent return requests using AI models.  
✅ **Image Similarity Analysis** - Ensures the uploaded product image matches the return reason.  
✅ **Warehouse Categorization** - Uses color coding (Red, Blue, Green, Yellow, Orange) to sort returned items.  
✅ **Defect Detection** - Evaluates damage levels for resale or repair decisions.  
✅ **Sustainable Logistics Optimization** - Plans return collection routes based on fuel efficiency and warehouse stocking needs.  

## 🏗️ Project Architecture  

- **Frontend**: Vite.js (React)  
- **Backend**: Node.js (Express)  
- **Database**: MongoDB  
- **Machine Learning**: Python (Flask API for AI models)  
- **Deployment**: Docker, AWS/GCP  

## 📡 API Endpoints  

| Endpoint              | Method | Description |
|----------------------|--------|-------------|
| `/api/returns` | `POST` | Submit a return request |
| `/api/spam-check` | `POST` | Check if a user is submitting fraudulent returns |
| `/api/similarity-check` | `POST` | Verify if the uploaded image matches the product description |
| `/api/warehouse/evaluate` | `POST` | Categorize return items using AI-based defect detection |
| `/api/route-optimize` | `GET` | Get the most sustainable return collection route |
| `/api/admin/metrics` | `GET` | View analytics on returns, sustainability, and cost savings |

## 📊 Return Categorization Logic  

- **Red** 🛑 - Unusable state → Sent for repair or parts resale  
- **Blue** 🔵 - Needs further review → Manual warehouse check  
- **Green** ✅ - Proper functionality → Sent back to seller  
- **Yellow** 🟡 - Minimal defect → Resold with a discount  
- **Orange** 🟠 - Manufacturing defect → Sent to warehouse for tinkering  

