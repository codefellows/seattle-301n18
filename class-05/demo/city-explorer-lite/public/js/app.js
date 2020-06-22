'use strict';

let server = 'http://localhost:3000';

function loadData() {

  $.ajax(`${server}/fake-data/location.json`)
    .then( location => {

      $.ajax( `${server}/fake-data/restaurants.json`)
        .then(restaurants => {
          renderMap();
          render(restaurants);
        });

    });

}

function renderMap() {
  let template = $('#map-template').html();
  let html = Mustache.render(template);
  $('#map').append(html);
}

function render(restaurants) {

  let template = $('#r-template').html();
  let target = $('#restaurants');

  restaurants.forEach( r => {
    let html = Mustache.render( template, r );
    target.append(html);
  });

}


loadData();
