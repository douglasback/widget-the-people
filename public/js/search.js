(function(){
    var petitions,
        petitionTitles;
    
    var getPetitionId = function(){
        $('#form-search').on("submit", function(e){
            e.preventDefault();
            var needle = $('#title-search').val(),
                iframe;
            var result = _.find(petitions, function(p){
                return p.title === needle;
            });
            console.log("petition id === " + result.id);
            //build iframe code
            iframe = '<iframe src="http://petition-promoter.herokuapp.com/widget/' + result.id +'" style="width: 100%; height: 265px; border: 0;"></iframe>';
            $('#generated-widget').val(iframe);
            // test preview
            $('#preview-inner').html(iframe);
        });
    };
    var loadPetitions = function(){
        $('#spinner').fadeIn();
       
       // /js/petitions.json local
       // https://petitions.whitehouse.gov/api/v1/petitions.jsonp?&key=xeUpEtux3Egbt5V&limit=1000&callback=?
       
        $.getJSON("https://petitions.whitehouse.gov/api/v1/petitions.jsonp?&key=xeUpEtux3Egbt5V&limit=1000&callback=?", function(data){
            petitions = _.map(data.results, function(p){
                var pet = {};
                pet.title = p.title;
                pet.id = p.id;
                return pet;
            });
            petitionTitles = _.pluck(petitions, "title");
            $('#title-search').typeahead({
                source: petitionTitles,
                minLength: 2

            });
            $('#spinner').fadeOut();
            
        });
    }
    loadPetitions();
    getPetitionId();
}());