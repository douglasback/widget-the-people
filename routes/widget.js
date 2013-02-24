var https = require('https'),
    moment = require('moment');


module.exports = {
    
    index: function(req,res){

        var petitionId = req.sanitize('id').xss();
        console.log("generating widget for " + petitionId);
        var tmplVars = {},
            url = 'https://petitions.whitehouse.gov/api/v1/petitions/' + petitionId + '.json?key=' + process.env.WTP_API_KEY,
            viewRes = res;
            
        tmplVars.petitionId = petitionId;
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
                    momentDeadline = moment(apiResponse.deadline);
                if (now < momentDeadline){
                    console.log("petition is active");
                    console.log(now + '>' + momentDeadline);
                    tmplVars.active = true;
                } else {
                    console.log("petition is inactive");
                    console.log(now + '>' + momentDeadline);
                    
                    tmplVars.active = false;
                }
                
                tmplVars.deadline = moment.unix(momentDeadline).format("MMMM Do, YYYY");
                
                var count = tmplVars.signatures.count = apiResponse["signature count"];
                var threshold = tmplVars.signatures.threshold = apiResponse["signature threshold"];
                tmplVars.signatures.needed = apiResponse["signatures needed"];
                tmplVars.url = apiResponse.url;
                
                tmplVars.mercury = function(){
                    var c = parseInt(count, 10),
                        t = parseInt(threshold, 10),
                        fill = c / t * 100;
                        
                    console.log(c / t * 100 + '%');
                    
                    return fill < 100 ? fill : 100;
                };
                
                tmplVars.mercuryLabel = function(){
                    return tmplVars.mercury() > 85 ? 'right: 2.50728174447%; left: auto;' 
                    : 'left: ' + tmplVars.mercury() + '%';
                };
                
                
                if (tmplVars.signatures.percentage === 100) {
                    tmplVars.success = true;
                } else {
                    tmplVars.success = false;
                }
                
                //Has the White House responded to the petition?
                if (apiResponse.response){
                    tmplVars.responseUrl = apiResponse.response.url;
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
//         
//     },
//     url : string,
//     active : boolean,
//     mercury : integer,
//     deadline : string,
//     successful : boolean,
//     response : boolean,
//     responseUrl : string,

//     }
// }
