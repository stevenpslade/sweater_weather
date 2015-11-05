$(function() {

  function appendResults(city) {
    $('<button>')
    .data('link', city.l)
    .text(city.name)
    .addClass('showWeather')
    .appendTo('#searchResults');
  }

  $('#searchWeather').on('click', '.button-primary', function() {
    var userSearch = $("#searchBox").val();
    $.ajax({
      url: 'http://autocomplete.wunderground.com/aq?query=' + userSearch,
      method: 'GET',
      dataType: 'jsonp',
      jsonp:    "cb",
      success:  function (data) {
        $('#searchResults').empty();
        var i;
        for (i in data.RESULTS) {
          city = data.RESULTS[i];
          appendResults(city);
        }
      }
    })
    return false;
  })

  $('#searchResults').on('click', 'button.showWeather', function() {
    alert('works');
  })

});
