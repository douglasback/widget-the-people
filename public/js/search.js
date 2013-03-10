/*jshint forin:true, noarg:true, noempty:true, eqeqeq:true, bitwise:true, strict:true, undef:true, unused:true, curly:true, browser:true, jquery:true, indent:2, maxerr:50 */
/*global _:true */
(function($){
  "use strict";
  
  var petitions, // this will be an array containing the title and ID
      petitionTitles, // used for the typeahead/autocomplete input
      ENDPOINT = 'https://petitions.whitehouse.gov/api/v1/petitions.jsonp';
  
  var loadPetitions = function(){
    $('#spinner').fadeIn();

    $.getJSON(ENDPOINT + '?&key=' + window.wtp.APIKEY + '&limit=1000&callback=?', function(data){
      petitions = _.map(data.results, function(p){
        var pet = {};
        pet.title = p.title;
        pet.id = p.id;
        return pet;
      });

      //Attach petitionTitles to autocomplete widget
      petitionTitles = _.pluck(petitions, "title");
      $('#title-search').typeahead({
        source: petitionTitles,
        minLength: 2

      });
      $('#spinner').fadeOut();

    });
  };
  
  var getPetitionId = function(){
    $('#search').on("click", function(e){
      e.preventDefault();
      var needle = $('#title-search').val(),
          host = document.location.host,
          iframe,
          result,
          theme;
      result = _.find(petitions, function(p){
        return p.title === needle;
      });
      
      theme = $('.theme-selector input:checked').val();
      theme = theme ? "?theme=" + theme : '';
      //Build iframe code
      iframe = '<iframe src="//' +
          host + '/widget/' + result.id + theme +
          '" style="width: 100%; height: 265px; border: 0;" scrolling="no"></iframe>';
      $('#generated-widget').val(iframe);
      
      // Populate preview area
      $('#preview-inner').html(iframe);
    });
  };

  loadPetitions();
  getPetitionId();
}(jQuery));