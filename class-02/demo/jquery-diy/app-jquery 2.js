

$(document).ready(function () {
  const ajaxSettings = {
    method: 'get',
    dataType: 'json'
  };

  $.ajax('./stuff.json', ajaxSettings)
    .then(data => {
      data.people.forEach(person => {
        $('ul').append(`<li>${person.name}</li>`);
        /*
        Use jQuery "clone" to create an object and use methods to set it up, rather than a template literal
        This is more verbose, but maybe more "correct"

        let $tpl = $('<li></li>').clone();
        $tpl.html( $('#personTemplate').html() );
        $tpl.find('.name').text(person.name);
        $tpl.find('.age').text(person.age);
        $('ul').append($tpl);
         */
      });
    });

  $('ul').on('click', 'li', function() {
    console.log($(this).text());
  });

  $('div').on('click', function() {
    $(this).css('background', 'green');
    console.log($(this).css('background'));
  });

  $('select').on('change', function() {
    $('div').slideUp();
    let selectedValue = $(this).val();
    $(`div[data-num=${selectedValue}`).fadeIn();
  });


});
