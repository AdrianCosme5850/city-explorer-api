'use strict';

const express = require('express');
require('dotenv').config();
const cors = require('cors');
const axios = require('axios')
const app = express();


app.use(cors());

const PORT = process.env.PORT || 3002;

app.listen(PORT, () =>  console.log(`listening on ${PORT}`));
app.get('/weather', async(request, response, next) => {
    try{
    let city = request.query.city;
    let cityWeather = await axios.get(`http://api.weatherbit.io/v2.0/forecast/daily?key=${process.env.WEATHERBIT_API_KEY}&days=3&city=${city}`)
    let cityForecast = cityWeather.data.data.map(dayForecast => new Forecast(dayForecast));
    response.send(cityForecast)
    } catch(error) {
        next(error)
    }
} );
app.get('/movie', async(request, response) => {
        let city = request.query.city;
        let movieData = await axios.get(`https://api.themoviedb.org/3/search/movie/?api_key=${process.env.MOVIE_API_KEY}&query=${city}`);
        let cityMovies = movieData.data.results.map(cityMovie => new Movie(cityMovie))
        response.send(cityMovies)
    })
app.get('*', (request, response) => {
    response.send(`no route`)
});
app.use((error, request, response, next) => {
    response.status(500).send(error.message);
})
class Movie {
    constructor(movieData){
        this.title = movieData.original_title
        this.poster = movieData.poster_path
    }
}
class Forecast {
    constructor(weatherdata){
        this.date = weatherdata.datetime
        this.description = weatherdata.weather.description
    }
}
