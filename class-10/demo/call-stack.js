'use strict';

let name = 'Code Fellows';

function say(words) {
  let normalized = normalize(words);
  render(normalized);
}

function normalize(str) {
  return str.toUpperCase();
}

function render(stuff) {
  console.log(stuff);
}

say(name);

console.log(normalize('Rosie'));
