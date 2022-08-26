'use strict';

const express = require('express');
require('dotenv').config();
const cors = require('cors');
const axios = require('axios')
const app = express();
const getMovies = require('./movies')
const getWeather = require('./weather')


app.use(cors());

const PORT = process.env.PORT || 3002;

app.listen(PORT, () =>  console.log(`listening on ${PORT}`));
app.get('/weather', getWeather);
app.get('/movie', getMovies)
app.get('*', (request, response) => {
    response.send(`no route`)
});
app.use((error, request, response, next) => {
    response.status(500).send(error.message);
})
