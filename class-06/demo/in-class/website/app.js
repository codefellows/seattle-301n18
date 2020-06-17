'use strict';


// Event Listener on the search button
// $('form').on('submit', getLocation)


// getLocation()
// 1. Get the word (city) the person typed?
//    - jQuery input field .val()
// 2. $.ajax() to our server, asking for location, sending the city
//    http://localhost:3000/location?city=seattle
//    This will return some data... (lat,long,city name)
// 3. Render the map  renderMap(lat,long)
// 4. Get Restuarant Data
//    call getResturants(lat,long)


// renderMap(lat,long)
// Takes lat/long and draws the actual map

// getRestaurants(lat,long)
// $.ajax() to our server, asking for restaurants, sending lat,long
// render them as a list, using the renderRestaurants()

// renderRestaurants()
// Takes a list, renders them with mustache
