var https = require('https'),
    moment = require('moment');


module.exports = {
    
    index: function(req,res){

        console.log("generating widget for " + req.params.id);

        var tmplVars = {},
            url = 'https://petitions.whitehouse.gov/api/v1/petitions/' + req.params.id + '.json?key=xeUpEtux3Egbt5V',
            viewRes = res;

        tmplVars.petitionId = req.params.id;
        console.log("connecting to api… " + url);
        
        // Make request to API
        https.get(url, function(res) {
            // Data came back
            console.log("received data from API");
              var body = '';
              
              // Write the response to body
              res.on('data', function(chunk) {
                 body += chunk;
              });
              
              res.on('end', function() {
                
                var apiResponse = JSON.parse(body).results[0];
                tmplVars.title = apiResponse.title;
                tmplVars.signatures = {};
                
                // Figure out whether the petition has expired or is still active
                
                var now = moment().unix();
                    momentDeadline = moment.unix(apiResponse.deadline);
                if (now > momentDeadline){
                    tmplVars.active = true;
                } else {
                    tmplVars.active = false;
                }
                
                tmplVars.deadline = momentDeadline.format("MMMM Do, YYYY");
                
                var count = tmplVars.signatures.count = apiResponse["signature count"];
                var threshold = tmplVars.signatures.threshold = apiResponse["signature threshold"];
                tmplVars.signatures.needed = apiResponse["signatures needed"];
                tmplVars.url = apiResponse.url;
                
                tmplVars.signatures.percentage = function(){
                    var c = parseInt(count, 10),
                        t = parseInt(threshold, 10),
                        fill = c / t * 100;
                        
                    console.log(c / t * 100 + '%');
                    
                    return fill < 100 ? fill : 100;
                };
                
                if (tmplVars.progress === 100) {
                    tmplVars.success = true;
                } else {
                    tmplVars.success = false;
                }
                viewRes.render('widget.html', tmplVars);
              });
            }).on('error', function(e) {
              console.log("Got error: " + e.message);
         });
        
    }
};
// tmplVars: {
//     title : string,
//     signatures : {
//         count : integer,
//         threshold : integer,
//         needed : integer
//         percentage : integer
//     },
//     url : string,
//     active : boolean,
//     deadline : string,
//     successful : boolean,
//     response : boolean,
//     responseUrl : string,

//     }
// }
