module.exports = {
    
    index: function(req,res){
        res.render('widget.html', { pageType: "widget", petitionId: req.params.id});
    }
};