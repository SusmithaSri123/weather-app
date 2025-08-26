# 🌤 Weather Forecast App

A full-stack Weather Forecast App built with React and Node.js that allows users to view current weather and a multi-day forecast for any location, along with an interactive map.

### Features
* Search weather by city, landmark, or ZIP code
* Select forecast duration from 1 to 5 days
* Display temperature, humidity, wind speed, and weather description
* Interactive map showing the selected location
* Handles loading and error states gracefully

### Tech Stack
* **Frontend:** React, React-Leaflet, Axios
* **Backend:** Node.js, Express, Axios
* **API:** OpenWeatherMap 5-day / 3-hour Forecast API
* **Map:** Leaflet.js

### Installation
1. Clone the repository:

git clone https://github.com/your-username/weather-forecast-app.git
cd weather-forecast-app


2. Setup Backend:

cd backend
npm install


3. Open `index.js` and replace `REPLACE_WITH_YOUR_OPENWEATHER_KEY` with your OpenWeatherMap API key:

```javascript
const API_KEY = "YOUR_OPENWEATHER_API_KEY";
Start backend server:

node index.js
Backend runs at: http://localhost:5000

Setup Frontend:

cd ../frontend
npm install
npm start
Frontend runs at: http://localhost:3000








