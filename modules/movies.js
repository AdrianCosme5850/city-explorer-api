'use strict';
const axios = require('axios');

let cache = require('./cacheMovie.js');

async function getMovies(request, response, next) {
    let city = request.query.city;
    const key = 'movie: ' + city;
    if(cache[key] && (Date.now() - cache[key].time < 50000)){
        console.log('cache hit')}
     else {
        console.log('cache miss')
        cache[key] = {};
        cache[key].time = Date.now();
        cache[key].movieData = await axios.get(`https://api.themoviedb.org/3/search/movie/?api_key=${process.env.MOVIE_API_KEY}&query=${city}`);
    cache[key].cityMovies = cache[key].movieData.data.results.map(cityMovie => new Movie(cityMovie))
    
}
response.send(cache[key].cityMovies);
}
class Movie {
    constructor(movieData){
        this.title = movieData.original_title
        this.poster ='https://image.tmdb.org/t/p/w500' + movieData.poster_path
    }
}
module.exports = getMovies;