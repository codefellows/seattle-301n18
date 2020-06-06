// Global identifiers

let $filterDropDown = $('#filter');
let $gallery = $('section');

$filterDropDown.on('change', filterHorns);

function Image(obj) {
  this.title = obj.title;
  this.description = obj.description;
  this.image = obj.image;
  this.keyword = obj.keyword;
}

Image.prototype.render = function() {
  let $card = $('.card-template').clone();
  $card.removeClass('card-template');
  $card.addClass(this.keyword);
  $card.find('header').text( this.title );
  $card.find('p').text( this.description );
  $card.find('img').attr('src', this.image);
  $gallery.append($card);
};

// Load Images from a file
// Run through a constructor
// Iterate that list and render them out
function loadImages() {
  // Use a pretend set
  // Stop pretending and do this with $.ajax()
  let images = [
    {
      title: 'Unicorn',
      description: 'This is a unicorn Picture',
      image: 'http://placehold.it/200x200?text=Unicorn',
      keyword: 'unicorn',
    },
    {
      title: 'Rhino',
      description: 'This is a rhino Picture',
      image: 'http://placehold.it/200x200?text=Rhino',
      keyword: 'rhino',
    },
  ];

  images.forEach( (img) => {
    let image = new Image(img);
    image.render();
  });

}


// When the filter is clicked, filter the stuff...
function filterHorns() {
  // Find the option that was picked
  let keyword = $(this).val();

  // Hide all the pics that don't match the option
  if ( keyword ) {
    $('.card').hide();
    $(`.${keyword}`).fadeIn();
  }
  else {
    $('.card').show();
  }
}


loadImages();
