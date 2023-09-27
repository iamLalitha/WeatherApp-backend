require('dotenv').config();
const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3001;

app.use(express.json());
app.use(cors());

app.get('/weather', async (req, res) => {
  const apiKey = process.env.OPENWEATHERMAP_API_KEY;
  const city = req.query.city;

  if (!apiKey || !city) {
    return res.status(400).json({ error: 'API key and city are required' });
  }

  try {
    const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`);
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching weather data:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
