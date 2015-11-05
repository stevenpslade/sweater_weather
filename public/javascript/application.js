$(function() {
//search request:
//http://autocomplete.wunderground.com/aq?query=

  $('#searchWeather').on('click', '.button-primary', function() {
    var userSearch = $("#searchBox").val();
    console.log(userSearch);
    $.ajax({
      url: 'http://autocomplete.wunderground.com/aq?query=' + userSearch,
      method: 'GET',
      dataType: 'jsonp',
      jsonp:    "cb",
      success:  function (data) {
        var i;
        for (i in data.RESULTS) {
            console.log(data.RESULTS[i]);
        }
    }
    })
    return false;
  })

});
