import React, { useEffect, useState } from "react";
import axios from "axios";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Default marker fix for React-Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

function App() {
  const [location, setLocation] = useState("Coimbatore");
  const [days, setDays] = useState(5);
  const [weather, setWeather] = useState([]);
  const [coords, setCoords] = useState([11.0168, 76.9558]); // Default: Coimbatore
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchWeather = async (loc = location) => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.get(
        `http://localhost:5000/weather?location=${loc}`
      );

      if (response.data && response.data.list) {
        // Pick one forecast per day (12:00:00)
        const dailyData = response.data.list.filter((item) =>
          item.dt_txt.includes("12:00:00")
        );

        setWeather(dailyData.slice(0, days));

        // Save coordinates for map
        if (response.data.city && response.data.city.coord) {
          setCoords([response.data.city.coord.lat, response.data.city.coord.lon]);
        }
      } else {
        setError("No weather data found");
      }
    } catch (err) {
      setError("Error fetching weather");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWeather(location);
  }, [days]);

  const handleSearch = (e) => {
    e.preventDefault();
    fetchWeather(location);
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h1>🌤 Weather Forecast App</h1>

      {/* Search & Controls */}
      <form onSubmit={handleSearch} style={{ marginBottom: "20px" }}>
        <input
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder="Enter city, landmark, or zip"
          style={{ padding: "8px", marginRight: "10px" }}
        />
        <select
          value={days}
          onChange={(e) => setDays(parseInt(e.target.value))}
          style={{ padding: "8px", marginRight: "10px" }}
        >
          {[1, 2, 3, 4, 5].map((d) => (
            <option key={d} value={d}>
              {d} Day{d > 1 ? "s" : ""}
            </option>
          ))}
        </select>
        <button type="submit" style={{ padding: "8px 15px" }}>
          Get Forecast
        </button>
      </form>

      {/* Map */}
      <MapContainer
        center={coords}
        zoom={8}
        style={{ height: "300px", width: "100%", marginBottom: "20px" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; OpenStreetMap contributors"
        />
        <Marker position={coords}>
          <Popup>{location}</Popup>
        </Marker>
      </MapContainer>

      {/* Weather Data */}
      {loading && <h2>Loading...</h2>}
      {error && <h2>{error}</h2>}

      {weather.length > 0 ? (
        <ul>
          {weather.map((day, index) => (
            <li key={index} style={{ marginBottom: "15px" }}>
              <strong>{day.dt_txt.split(" ")[0]}</strong> -{" "}
              {day.weather[0].description} <br />
              🌡 Temp: {day.main.temp}°C | 💧 Humidity: {day.main.humidity}% | 💨{" "}
              Wind: {day.wind.speed} m/s
            </li>
          ))}
        </ul>
      ) : (
        !loading && <p>No forecast available</p>
      )}
    </div>
  );
}

export default App;
