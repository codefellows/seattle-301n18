'use strict';

$(document).ready(function() {
  console.log('ready for stuff!');
  $.ajax('data-01.json')
    .then(data => {
      data.forEach(friend =>{
        render(friend);
      });
    })
});


function renderVanilla(object) { // 11 lines
  // make a copy of of the html template and remove the template labeling
  let sectionEl = document.getElementsByTagName('section')[0];
  let divEl = document.getElementById('target-template');
  let newDivEl = divEl.cloneNode();
  newDivEl.removeAttribute('id');

  // create our elements dynamically
  let h3El = document.createElement('h3');
  let imgEl = document.createElement('img');
  h3El.textContent = object.name;
  imgEl.src = object.image_url;

  // append those elements to the DOM

  newDivEl.appendChild(h3El);
  newDivEl.appendChild(imgEl);
  sectionEl.appendChild(newDivEl);
}

function renderJquery(object){ // 5 lines
  // make a copy of of the html template and remove the template labeling
  // let $template = $('#target-template').clone().removeAttr('id').append(`<h3>${object.name}</h3>`, `<img src="${object.image_url}"</img>`);

  $('section').append($('#target-template').clone().removeAttr('id').append(`<h3>${object.name}</h3>`, `<img src="${object.image_url}"</img>`));
  // $($template).removeAttr('id');
  // create our elements dynamically
  // $($template).append(`<img src="${object.image_url}"</img>`);
  
  // append to the DOM
}

// TODO:  Template the things

function render(object){
  // make a copy of the html template and remove the template labeling
  let $template = $('#template').html();

  // create our elements dynamically (not relavent in mustache)
  let rendered = Mustache.render($template, object);
  console.log(rendered);

  // append to the DOM
  $('#target').append(rendered)
}