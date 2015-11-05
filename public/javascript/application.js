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
    var apiLink = city.l + '.json';
    // http://api.wunderground.com/api/3e541a2c882e2d33/conditions/q/CA/San_Francisco.json
    //http://api.wunderground.com/api/3e541a2c882e2d33/forecast/q/zmw:94125.1.99999.json
    //3e541a2c882e2d33
    $.ajax({
      url: 'http://api.wunderground.com/api/3e541a2c882e2d33/conditions/' + apiLink,
      method: 'GET',
      dataType: 'jsonp',
      // jsonp:    "cb",
      success:  function (data) {
        $('#searchResults').empty();
        var weather = data.current_observation.weather; //string
        var temp = data.current_observation.temp_c; //number
        var wind = data.current_observation.wind_kph; //number
        var feelsLike = data.current_observation.feelslike_c; //string
        var icon = data.current_observation.icon_url; //link to image
        console.log(weather);
      }
    })
  })

});
