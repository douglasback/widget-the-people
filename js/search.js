(function(){
    var petitions,
        petitionTitles;
    
    $.getJSON("/js/petitions.json", function(data){
        petitions = _.map(data.results, function(p){
            var pet = {};
            pet.title = p.title;
            pet.id = p.id;
            return pet;
        });
        console.log(petitions);
        petitionTitles = _.pluck(petitions, "title");
        $('#title-search').autocomplete({
            source: petitionTitles,
            minLength: 3

        });
    });
    
    var getPetitionId = function(){
        $('#form-search').on("submit", function(e){
            e.preventDefault();
            var needle = $('#title-search').val();
            var result = _.find(petitions, function(p){
                return p.title === needle;
            });
            console.log("petition id === " + result.id);
            $('#wrapper').append('<a href="http://wtp/?id=' + result.id +'">Get your widget');
        });
    };
    getPetitionId();
}());