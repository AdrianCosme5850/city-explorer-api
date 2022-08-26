const axios = require('axios');

async function getWeather(request, response, next) {
    try{
        let city = request.query.city;
        let cityWeather = await axios.get(`http://api.weatherbit.io/v2.0/forecast/daily?key=${process.env.WEATHERBIT_API_KEY}&days=3&city=${city}`)
        let cityForecast = cityWeather.data.data.map(dayForecast => new Forecast(dayForecast));
        response.send(cityForecast)
        } catch(error) {
            next(error)
        }
}

class Forecast {
    constructor(weatherdata){
        this.date = weatherdata.datetime
        this.description = weatherdata.weather.description
    }
}

module.exports = getWeather;