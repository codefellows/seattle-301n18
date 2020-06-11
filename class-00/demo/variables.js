// var == "globalish scope"
// let == "block scope"
// const == "constant" cannot be chane

const family = [];
family.push('john');
console.log(family);

const john = {
  hair: false
}

console.log(john);

john = ['cool', 'dude'];



function loop() {
  
  for ( let i = 0; i<10; i++ ) {
    console.log(i);
  }

  console.log('outside', i)
}

loop();

