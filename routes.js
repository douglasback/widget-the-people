var search = require('./routes/search')
    , widget = require('./routes/widget');


module.exports = function(app) {
    app.get('/', search.index);
    app.get('/widget/:id', widget.index)
};