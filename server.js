'use strict';

const express = require('express');
require('dotenv').config();
let data = require('./data/weather.json')
let cors = require('cors');



const app =express();
app.use(cors())

const PORT = process.env.PORT || 3002;

app.listen(PORT, () =>  console.log(`listening on ${PORT}`));
app.get('/weather', (request, response) => {
    let city = request.query.city;
    let cityWeather = data.find(cities => cities.city_name === city);
    let cityForecast = new Forecast(cityWeather);
    response.send(cityForecast)

} );
app.get('*', (request, response) => {
    response.send(`no route`)
});
class Forecast {
    constructor(weatherdata){
        this.date = weatherdata.data[0].datetime
        this.description = weatherdata.data[0].weather.description
    }
}
