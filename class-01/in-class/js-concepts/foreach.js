'use strict';

console.log('hi');

// let arr = new Array();
// arr.push(3);
// arr.push(6);
// arr.push(8);

let arr = [2,4,6];

let times = new Array(100).fill('hair');

for(let i=0; i<arr.length; i++) {
  // let s = square(arr[i], i );
  // console.logs);
}

// for each element in the array, run this function
// I will give that function the current value and the current index ... for you
times.forEach( () => {
  console.log('john is soooo cool');
  // do I care about val or idx
});

arr.forEach( square );

// arr.forEach( square(6) );
// square(6)
// array.forEach();

function pos( val,idx ) {
  console.log(`We are at position ${idx}`);
}

function square(potatoe, idx) {
  console.log(`Index: ${idx} with ${potatoe} squares to ${potatoe*potatoe}`);
}
