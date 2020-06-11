'use strict';

// Read the data
let familyArr = [];

//constructor
function Family(member){
  this.name = member.FullName;
  this.age = member.age;
  this.works = member.works;
  familyArr.push(this);
}

// Iterate
function readJson(){
  $.ajax('./data.json').then(data =>{
    data.forEach(member =>{
      new Family(member);
    });
    render();
  });
};

// Render with Mustache
function render(){
  familyArr.forEach(member =>{
     let $template = $('#template').html();
     let rendered = Mustache.render($template, member);
     $('section').append(rendered);     
  });
}

readJson();