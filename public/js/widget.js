(function(window, document, undefined){
    _.templateSettings = {
      interpolate : /\{\{(.+?)\}\}/g
    };
    
    window.wtp = window.wtp || {};
    
    wtp.baseUrl = "https://petitions.whitehouse.gov/api/v1/";

    wtp.key = 'xeUpEtux3Egbt5V';
    
    wtp.idReg = new RegExp(/id=([A-Za-z0-9]*)/);
    
    wtp.tpl = _.template('<h1>{{ title }}</h1>\
    <p>Goal: {{ signatures.threshold }}</p>\
    <p>Signatures: {{ signatures.count }}</p>\
    <p>Signatures needed: {{ signatures.needed }}</p>\
    <p><a href="{{ url }}" target="_blank">Sign the petition</a></p>\
    ');
    
    wtp.thermometer = _.template('<div class="thermometer-wrap">\
    <div class="thermometer">\
    <div class="progress" style="width: {{ progress }}%;">\
    </div>\
    </div>\
    </div>');

    
    /*
    *
    */
    wtp.buildUrl = function(method, callback){
        console.log("building url");
        console.log(method);
        console.log(callback);
        console.log(wtp.baseUrl + method + '.jsonp?key=' + wtp.key + 'callback=' + callback);
        return wtp.baseUrl + method + '.jsonp?key=' + wtp.key + '&callback=' + callback;
    };
    
    wtp.dispatchError = function(){
        console.log("an error, that's all i got");
    };
    
    wtp.callback = function(data){
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
        var mercury = wtp.calculatePercentage(petition["signature count"],petition["signature threshold"]);
        $('#wrapper').append(wtp.thermometer({progress: mercury}))
        
    };
    
    wtp.calculatePercentage = function(count, threshold){
        var c = parseInt(count, 10),
            t = parseInt(threshold, 10),
            fill = c / t * 100;
            
        console.log(c / t * 100 + '%');
        
        return fill < 100 ? fill : 100;
    }
    
    $.getScript(wtp.buildUrl('petitions/' + petitionId, "wtp.callback"));
    
    
}(window, document));