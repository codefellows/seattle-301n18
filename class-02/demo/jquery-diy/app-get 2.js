'use strict';

console.log(get('li:first-child').text());

get('li').on('click', function(element) {
  console.log(element.text());
});

get('div').on('click', function(element) {
  element.css('background','green');
  console.log(element.css('background'));
});
