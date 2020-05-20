'use strict';

let API = 'http://localhost:3000';

// We need some globals for pagination purposes...
let page = 1;
let lastLocation = {};

function setEventListeners() {
  $('#search-form').on('submit', fetchCityData);
  $('#getMoreRestaurants').on('click', () => {
    ++lastLocation.page; // Next page ...
    getResource('restaurants',lastLocation);
  });
}

function fetchCityData(event) {

  event.preventDefault();

  let searchQuery = $('#input-search').val().toLowerCase();

  $('#map').hide();
  $('#title').hide();
  $('.columns section').hide();

  const ajaxSettings = {
    method: 'get',
    dataType: 'json',
    data: { city: searchQuery },
  };

  $.ajax(`${API}/location`, ajaxSettings)
    .then(location => {
      location.page = page;
      lastLocation = location;
      showTitle(location);
      displayMap(location);
      getResource('restaurants', location);
      getResource('places', location);
    })
    .catch(error => {
      console.error(error);
    });
}

function displayMap(location) {
  let template = $('#image-template').html();
  let markup = Mustache.render(template, location);
  $('#map').html(markup);
  $('#map').show();
}

function showTitle(location) {
  let template = $('#title-template').html();
  let markup = Mustache.render(template, location);
  $('#title').html(markup);
  $('#title').show();
}

function getResource(resource, location) {

  let $container = $(`#${resource}`);
  let $target = $(`#${resource}-results`);
  let template = $(`#${resource}-results-template`).html();

  const ajaxSettings = {
    method: 'get',
    dataType: 'json',
    data: location,
  };

  $.ajax(`${API}/${resource}`, ajaxSettings)
    .then(result => {
      result.forEach(entry => {
        let markup = Mustache.render(template, entry);
        $target.append(markup);
      });
      $container.show();
    })
    .catch(error => {
      console.error(error);
    });

}

$('document').ready(function () {
  setEventListeners();
});
