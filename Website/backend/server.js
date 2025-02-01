// import express from "express";
// import axios from "axios";
// import dotenv from "dotenv";

// dotenv.config();

// const app = express();
// const PORT = 3000;
// const ORS_API_KEY = "5b3ce3597851110001cf6248fbcf2a5ffc4a4cddba9d1d916d27cf85";

// app.get("/api/get-route", async (req, res) => {
//   const { startLat, startLng, endLat, endLng } = req.query;

//   if (!startLat || !startLng || !endLat || !endLng) {
//     return res.status(400).json({ error: "Missing coordinates" });
//   }

//   try {
//     const url = `https://api.openrouteservice.org/v2/directions/driving-car?api_key=${ORS_API_KEY}&start=${startLng},${startLat}&end=${endLng},${endLat}`;
//     const response = await axios.get(url);
    
//     res.json({
//       distance: response.data.routes[0].summary.distance / 1000, // Distance in km
//       duration: response.data.routes[0].summary.duration / 60, // Duration in mins
//       route: response.data.routes[0].geometry, // Encoded polyline for mapping
//     });
//   } catch (error) {
//     console.error("OpenRouteService API Error:", error);
//     res.status(500).json({ error: "Failed to fetch route" });
//   }
// });

// app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
