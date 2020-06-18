'use strict';

// Event Listener on the search button
$('form').on('submit', getLocation);

function getLocation(e) {
  e.preventDefault();

  // 1. Get the word (city) the person typed?
  let city = $('#city-name').val();
  console.log('you searched for', city);

  // 2. $.ajax() to our server, asking for location, sending the city
  //    http://localhost:3000/location?city=seattle
  //    This will return some data... (lat,long,city name)
  $.ajax(`http://localhost:3000/location?city=${city}`)
    .then( locationData => {
      console.log('From the server', locationData);
      // 3. Render the map  renderMap(lat,long)
      renderMap(locationData);
      renderHeading(locationData);
      // 4. Get Restuarant Data
      getRestaurants(locationData);
    });

}


function renderMap(location) {
  let template = $('#map-template').html();
  let mapHTML = Mustache.render(template, location);
  $('#map').html(mapHTML);
}

function renderHeading(location) {
  let template = $('#heading-template').html();
  let headingHTML = Mustache.render(template, location);
  $('#heading').html(headingHTML);
}

function getRestaurants(location) {
  // $.ajax() to our server, asking for restaurants, sending lat,long
  // render them as a list, using the renderRestaurants()
  $.ajax('http://localhost:3000/restaurants')
    .then( restaurants => {
      console.log(restaurants);
      renderRestaurants(restaurants);
    });
}

function renderRestaurants(restaurants) {

  // Takes a list, renders them with mustache
  let $template = $('#restaurants-template').html();
  let $target = $('#restaurants');

  $target.empty();

  restaurants.forEach( (r) => {
    let rHTML = Mustache.render( $template, r );
    $target.append(rHTML);
  });

}
