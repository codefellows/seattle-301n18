'use strict';

$('document').ready( function() {
  $('button').on('click', function() {
    // Why are we using siblings instead of just targeting 'ul'
    $(this).siblings('ul').toggleClass('on');
  });

  $('ul').on('click', 'li', function() {
    $(this).fadeOut(400);
    // Would this work? Why?/Why Not?
    // console.log(this.text());
  });
});

