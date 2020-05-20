'use strict';

function get(selector) {
  let nodes;

  if (typeof selector === 'string') {
    nodes = document.querySelectorAll(selector);
  } else {
    nodes = selector.length ? selector : [selector];
  }

  return new DOMList(nodes);
}

function DOMList(nodes) {
  this.nodes = nodes;
}

DOMList.prototype.text = function() {
  return this.nodes[0].textContent;
};

DOMList.prototype.css = function(property, value) {
  return value ? this.nodes[0].style[property] = value : this.nodes[0].style[property];
};

DOMList.prototype.on = function(event, callback) {
  this.nodes.forEach(element => {
    element.addEventListener(event, () => callback( get(element) ));
  });
};
