'use strict';

function setEventListeners() {
  $('#search-form').on('submit', fetchCityData);
}

function fetchCityData(event) {

  event.preventDefault();

  let searchQuery = $('#input-search').val().toLowerCase();

  $("#map").hide();
  $("#title").hide();
  $(".columns section").hide();

  const ajaxSettings = {
    method: 'get',
    dataType: 'json',
    data: { city: searchQuery }
  };

  $.ajax(`/fake-data/location.json`, ajaxSettings)
    .then(location => {
      showTitle(location);
      displayMap(location);
      getRestaurants(location);
    })
    .catch(error => {
      console.error(error);
    });
}

function showTitle(location) {
  let template = $("#title-template").html();
  let markup = Mustache.render(template, location);
  $("#title").html(markup)
  $("#title").show();
}

function displayMap(location) {
  let template = $("#image-template").html();
  let markup = Mustache.render(template, location);
  $("#map").html(markup)
  $("#map").show();
}

function getRestaurants(location) {

  const ajaxSettings = {
    method: 'get',
    dataType: 'json',
    data: location
  };

  $.ajax(`/fake-data/restaurants.json`, ajaxSettings)
    .then(result => {
      let $container = $('#restaurants');
      let $list = $('#restaurant-results');
      let template = $('#restaurant-results-template').html();
      result.forEach(entry => {
        let markup = Mustache.render(template, entry);
        $list.append(markup);
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
