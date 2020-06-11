'use strict';

// jQuery, find a thing with a selector, (maybe event), do something
$('#clicker').on('click', function() {
  // .text() ===== GETTER
  console.log('you clicked the button that says', $(this).text() );
  // .text('value') ====== SETTER
  $(this).text('ouch');

  $('ul.family li:first-child').html('<button>Foobar</button>');

  $('ul.family').fadeToggle(500);
});

$('ul.family li').on('click', hideMe);

function hideMe() {
  $(this).fadeOut();
}

$('form').on('submit', function() {
  console.log('saving data');
});


let $petsContainer = $('.pets');
let $petTemplate = $('.pet-template');


// ajax  = asynchronous javascript and XML
// $.ajax('http://alltheww2veteratnslist.com/allofthem')

console.log('starting to do the pet thing');

// go get someting, and THEN give me the data you found and run this function
$.ajax( './pets.json').then( function(data) {

  console.log('Got the pets', data);

  data.forEach((pet) => {

    // copy the template
    // Put in the words
    // append that to the ul
    let $thisPet = $petTemplate.clone();
    $thisPet.find('span').text(pet.name);// .parent().removeClass('pet-template');
    $thisPet.removeClass('pet-template');
    $petsContainer.append($thisPet);

    // $petsContainer.append(`<li><span>${pet}</span></li>`);
  });

});


console.log('done doing the pet thing');
