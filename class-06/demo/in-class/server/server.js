'use strict';

// dotenv, express, cors
require('dotenv').config();
const express = require('express');
const cors = require('cors');

// this is MAGIC. Trust
// Anything from the .env file shows up here
const PORT = process.env.PORT;

// Get an "instance" of express as our app
const app = express();

app.use( cors() );

app.get('/location', (request,response) => {
  // Read in data that came from an external API
  let data = require('./data/location.json');
  // Adapt the data to match the contract
  let actualData = new Location(data[0]);
  // Send out the adapted data
  response.status(200).json(actualData);
});

function Location( obj ) {
  this.latitude = obj.lat;
  this.longitude = obj.lon;
  this.formatted_query = obj.display_name;
}

// $('thing').on('something', () => {})
app.get('/restaurants', (request, response) => {
  let data = require('./data/restaurants.json');

  let allRestaurants = [];
  data.nearby_restaurants.forEach( restObject => {
    let restaurant = new Restaurant(restObject);
    allRestaurants.push(restaurant);
  });

  response.status(200).json(allRestaurants);
});

function Restaurant(obj) {
  this.restaurant = obj.restaurant.name;
  this.locality = obj.restaurant.location.locality;
  this.cuisines = obj.restaurant.cuisines;
}

// app.put(), app.delete(), app.post()

app.use('*', (request,response) => {
  response.status(404).send('Huh?');
});

app.use((error, request, response, next) => {
  console.log(error);
  response.status(500).send('server is broken');
});

app.listen( PORT, () => console.log('Server running on port', PORT));

// Handle a request for location data
// Get a city from the client
// Fetch data from an API
// Adapt the data, using a Constructor Function
// Send the adapted data to the client


// Locaton Constructor Function
// Take in some big object, turn it into something that matches the contract


// Handle a request for restaurant data
// Get location information from the client (lat,long,city-name)
// Fetch data from an API
// Adapt the data, using a Constructor Function
// Send the adapted data to the client

// Restaurant Constructor Function
// Take in some big object, turn it into something that matches the contract
