const express = require('express');
const fs = require('fs');
const path = require('path');

// Initialize the Express app
const app = express();
const port = 3000; // Change this to your desired port

// File to store sensor data
const dataFile = path.join(__dirname, 'sensor_data.json');

// Middleware to parse JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Handle POST requests to save data
app.post('/sensor-data', (req, res) => {
  const { temperature, humidity } = req.body;

  if (temperature !== undefined && humidity !== undefined) {
    // Save data to the JSON file
    const sensorData = {
      temperature,
      humidity,
      timestamp: new Date().toISOString()
    };

    fs.writeFile(dataFile, JSON.stringify(sensorData, null, 2), (err) => {
      if (err) {
        console.error('Error saving data:', err);
        return res.status(500).json({ status: 'error', message: 'Failed to save data' });
      }
      res.json({ status: 'success', message: 'Data saved' });
    });
  } else {
    res.status(400).json({ status: 'error', message: 'Invalid data' });
  }
});

// Handle GET requests to retrieve data
app.get('/sensor-data', (req, res) => {
  if (fs.existsSync(dataFile)) {
    fs.readFile(dataFile, 'utf8', (err, data) => {
      if (err) {
        console.error('Error reading data:', err);
        return res.status(500).json({ status: 'error', message: 'Failed to read data' });
      }
      res.json(JSON.parse(data));
    });
  } else {
    res.status(404).json({ status: 'error', message: 'No data available' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
