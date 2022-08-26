'use strict';

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const getMovies = require('./modules/movies.js')

const weather = require('./modules/weather.js');
const app = express();
app.use(cors());

app.get('/weather', weatherHandler);
app.get('/movie', getMovies)

function weatherHandler(request, response) {
  const lat = request.query.lat;
  const lon = request.query.lon;
  console.log(lat, lon)
  weather(lat, lon)
  .then(summaries => response.send(summaries))
  .catch((error) => {
    console.error(error);
    response.status(200).send('Sorry. Something went wrong!')
  });
}  

app.listen(process.env.PORT, () => console.log(`Server up on ${process.env.PORT}`));