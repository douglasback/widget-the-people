(function(window, document, undefined){
    _.templateSettings = {
      interpolate : /\{\{(.+?)\}\}/g
    };
    
    window.wtp = window.wtp || {};
    
    wtp.tpl = _.template('<h1>{{ title }}</h1>\
    <p>Goal: {{ signatures.threshold }}</p>\
    <p>Signatures: {{ signatures.count }}</p>\
    <p>Signatures needed: {{ signatures.needed }}</p>\
    <p><a href="{{ url }}">Sign the petition</a></p>\
    ');
    
    wtp.dispatchError = function(){
        console.log("an error, that's all i got");
    };
  $.getScript("https://petitions.whitehouse.gov/api/v1/petitions/50cb6d2ba9a0b1c52e000017.jsonp?&key=xeUpEtux3Egbt5V&callback=wtpcallback");
    
    window.wtpcallback = function(data){
        var petition;
        if (data.results.length > 0){
            petition = data.results[0];
        } else {
            wtp.dispatchError();
            return;
        }
        
        $('#wrapper').html(wtp.tpl({title: petition.title,
                                    signatures: {
                                        threshold: petition["signature threshold"],
                                        count: petition["signature count"],
                                        needed: petition["signatures needed"]
                                    },
                                    url: petition.url
                                    })
                                    );
        
        
    }
}(window, document));