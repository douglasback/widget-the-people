module.exports = {
    
    index: function(req,res){
        
        res.render('search.html', { pageType: "search", apiKey: process.env.WTP_API_KEY });
    }
};