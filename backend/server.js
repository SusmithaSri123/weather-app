// backend/index.js
import express from "express";
import axios from "axios";
import cors from "cors";

const app = express();
app.use(cors());

const API_KEY = "REPLACE_WITH_YOUR_OPENWEATHER_KEY"; // <-- replace with your API key

app.get("/weather", async (req, res) => {
  const location = req.query.location;
  if (!location) {
    return res.status(400).json({ error: "Location is required" });
  }

  try {
    // 5-day / 3-hour forecast from OpenWeather
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/forecast?q=${location}&appid=${API_KEY}&units=metric`
    );

    res.json(response.data);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Failed to fetch weather data" });
  }
});

app.listen(5000, () => console.log("Backend running on http://localhost:5000"));
