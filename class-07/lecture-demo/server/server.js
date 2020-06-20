'use strict';

// TODO Set our server up!

// Bring in our npm libraries
const express = require('express');
const cors = require('cors');
const superagent = require('superagent');

// Bring in our dotenv package to let us talk to our .env file
require('dotenv').config();

// Grabbing our port number in our .env file
const PORT = process.env.PORT || 3000

// Launching express
const app = express();

// Enabling cors
app.use( cors() );

// Let's start the party!
app.listen( PORT, () => console.log(`Running on port ${PORT}`));

// Create some routes

app.get('/', (request, response) => {
  response.send('Hello World...again');
});

app.get('/location', (request, response) => {
  // for location route, we need to get location data, and send it to the front end.
  const API = `https://us1.locationiq.com/v1/search.php?key=${process.env.GEOCODE}&q=${request.query.city}&format=json`;

  superagent.get(API)
    .then(data => {
      // constructor
    let location = new Location(data.body[0], request.query.city);
    response.status(200).send(location);
    })
    .catch( () => {
      response.status(500).send(console.log('something went wrong.'));
    });
});

app.get('/restaurants', (request, response) => {
  // 
  const coordinates = {
    lat: request.query.latitude,
    lon: request.query.longitude
  }
  const API = `https://developers.zomato.com/api/v2.1/search?lat=${coordinates.lat}&lon=${coordinates.lon}`;
  superagent.get(API)
    .set('user-key', process.env.ZOMATO)
    .then(data => {
      let output = data.body.restaurants.map(object => {
        return new Restaurant(object.restaurant);
      });
      response.status(200).send(output);
    })
    .catch( () => {
      response.status(500).send(console.log('Something went wrong in restaurants'));
    })
})

function Location(obj, city){
  this.search_query = city;
  this.formatted_query = obj.display_name;
  this.latitude = obj.lat;
  this.longitude = obj.lon;
}

function Restaurant(obj){
  // we need the data from the API
  this.restaurant = obj.name;
  this.locality = obj.location.locality;
  this.cuisines = obj.cuisines;
}