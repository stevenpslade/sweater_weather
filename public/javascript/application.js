$(function() {

  // var weather = data.current_observation.weather; //string
  // var temp = data.current_observation.temp_c; //number
  // var wind = data.current_observation.wind_kph; //number
  // var feelsLike = data.current_observation.feelslike_c; //string
  // var icon = data.current_observation.icon_url; //link to image

  function appendResults(city) {
    $('<button>')
    .data('link', city.l)
    .text(city.name)
    .addClass('showWeather')
    .appendTo('#searchResults');
  }

  function appendWeather(data) {
    var weather = data.weather; //string
    var temp = data.temp_c; //number
    var wind = data.wind_kph; //number
    var feelsLike = data.feelslike_c; //string
    var icon = data.icon_url; //link to image
    var garment;
    feelsNum = parseInt(feelsLike, 10);
    if (feelsNum < 10) {
      garment = 'images/sweater.jpg';
    } else {
      garment = 'images/jumpsuit.jpeg';
    }
    $('<h2>')
    .text('Feels like: ' + feelsLike + 'C')
    .append($('<img>')
      .attr('src', garment)
      .fadeIn(1000))
    .appendTo('#current');
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
    var apiLink = $(this).data("link") + '.json';
    $.ajax({
      url: 'http://api.wunderground.com/api/3e541a2c882e2d33/conditions/' + apiLink,
      method: 'GET',
      dataType: 'jsonp',
      // jsonp:    "cb",
      success:  function (data) {
        $('#searchResults').empty();
        $('#current').empty();
        data = data.current_observation;
        appendWeather(data);
      }
    })
  })

});
