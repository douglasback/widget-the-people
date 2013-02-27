(function($){
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
    $('#form-search').on("submit", function(e){
      e.preventDefault();
      var needle = $('#title-search').val(),
          iframe,
          host;
      var result = _.find(petitions, function(p){
        return p.title === needle;
      });
      
      //Build iframe code
      iframe = '<iframe src="//' 
          + document.location.host 
          + '/widget/' + result.id 
          + '" style="width: 100%; height: 265px; border: 0;" scrolling="no"></iframe>';
      $('#generated-widget').val(iframe);
      
      // Populate preview area
      $('#preview-inner').html(iframe);
    });
  };
  
  loadPetitions();
  getPetitionId();
}(jQuery));