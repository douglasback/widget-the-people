module.exports = {
    
    index: function(req,res){
        var env = process.env.ENVIRONMENT === "production" ? 
            true : false;
            
        res.render('search.html', { 
            pageType: "search",
            stylesheet: "styles",
            apiKey: process.env.WTP_API_KEY,
            production: env 
            }
        );
    }
};