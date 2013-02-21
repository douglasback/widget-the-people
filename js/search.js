(function(){
    var petitions,
        petitionTitles;
    
    $.getJSON("/js/petitions.json", function(data){
        petitions = data.results;
        petitionTitles = _.pluck(petitions, "title");
        $('#title-search').autocomplete({
            source: petitionTitles,
            minLength: 3

        });
    });
    
}());