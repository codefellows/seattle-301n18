
console.log( greeting('John') );


function greeting(name) { 
  return `Hello, ${name}`;
}

let sayHi = function(name) { 
  return `Hi, ${name}`;
}

let yo = (name) => {
  return `Yo, ${name}`;
}

let hey = name => {
  return `Hey, ${name}`;
}

let hello = name => `Hello, ${name}`;

console.log( yo('Zach') );

console.log( hey('Allie') );

console.log( hello('Rosie') );

console.log( sayHi('Cathy') );


// Implicit return -- absent {}, the arrow function returns whatever's after the => automatically. Great for 1-liners!

let square = num => num * num;

