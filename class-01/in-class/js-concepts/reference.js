'use strict';

// complex things (objects, array) are passed by REFERENCE
// functions that take these as params, will produce a
// side effect IF you change the properties of the param

let person = {
  name: 'John',
  hair: false,
  age: 51,
};

let family = ['john', 'cat', 'zach', 'allie'];

addKid(family);

marry(person);

console.log(person);
console.log(family);

function addKid(f) {
  f.push('rosie');
}

// pass by reference
// "Side Effect"
function marry(prs) {
  prs.isMarried = true;
}

// Scalars (nums, strings, boolean) -- single values
// passed by value

let hair = false;
hasHair();

function hasHair(h) {
  h = true;
}
console.log(hair);

let name = 'john';
let uppername = properName(name);

function properName(n) {
  n = n.toUpperCase();
  return n;
}

console.log(name);
console.log(uppername);

