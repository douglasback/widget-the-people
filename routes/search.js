module.exports = {
    
    index: function(req,res){
        res.render('search.html', { pageType: "search"});
    }
};