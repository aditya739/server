const express = require('express');

// Initialize the Express app
const app = express();
const port = 3000; // Change this to your desired port

// Middleware to parse JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// In-memory storage for the latest sensor data
let sensorData = null;

// Handle POST requests to save data
app.post('/sensor-data', (req, res) => {
  const { temperature, humidity } = req.body;
  console.log("It hits the server")

  if (temperature !== undefined && humidity !== undefined) {
    // Store data in memory
    sensorData = {
      temperature,
      humidity,
      timestamp: new Date().toISOString(),
    };

    console.log(sensorData)

    res.json({ status: 'success', message: 'Data received', data: sensorData });
  } else {
    res.status(400).json({ status: 'error', message: 'Invalid data' });
  }
});

// Handle GET requests to retrieve data
app.get('/sensor-data', (req, res) => {
  if (sensorData) {
    res.json(sensorData);
  } else {
    res.status(404).json({ status: 'error', message: 'No data available' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
