const express = require('express');

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const cors = require('cors')
app.use(cors({
    origin:'*', 
    credentials:true,
    optionSuccessStatus:200,
}))

let sensorData = null;

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

app.get('/sensor-data', (req, res) => {
  if (sensorData) {
    res.json(sensorData);
  } else {
    res.status(404).json({ status: 'error', message: 'No data available' });
  }
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
