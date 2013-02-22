var https = require('https');



module.exports = {
    
    index: function(req,res){
        console.log("generating widget for " + req.params.id);
        var tmplVars = {},
            url = 'https://petitions.whitehouse.gov/api/v1/petitions/' + req.params.id + '.json?key=xeUpEtux3Egbt5V',
            viewRes = res;
        // tmplVars.pageType = 'widget';
        tmplVars.petitionId = req.params.id;
        console.log("connecting to api… " + url);
        https.get(url, function(res) {
            
            console.log("received data from API ");
              var body = '';

              res.on('data', function(chunk) {
                 body += chunk;
              });
              
              res.on('end', function() {
                var apiResponse = JSON.parse(body).results[0];
                tmplVars.title = apiResponse.title;
                tmplVars.signatures = {};
                var count = tmplVars.signatures.count = apiResponse["signature count"];
                var threshold = tmplVars.signatures.threshold = apiResponse["signature threshold"];
                tmplVars.signatures.needed = apiResponse["signatures needed"];
                
                tmplVars.progress = function(){
                    var c = parseInt(count, 10),
                        t = parseInt(threshold, 10),
                        fill = c / t * 100;
                        
                    console.log(c / t * 100 + '%');
                    
                    return fill < 100 ? fill : 100;
                };
                viewRes.render('widget.html', tmplVars);
              });
            }).on('error', function(e) {
              console.log("Got error: " + e.message);
         });
        
    }
};
