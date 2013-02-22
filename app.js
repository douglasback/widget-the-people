var express = require('express')
  , routes = require('./routes')
  , hbs = require('hbs');
  
var app = module.exports = express();


app.configure(function(){
    app.set('views', __dirname + '/views');
    app.set('view engine', 'hbs');
    // app.set('view options',{layout:true}); // use /views/layout.html to manage your main header/footer wrapping template
    app.engine('.html',require('hbs').__express); //use .html files in /views instead .hbs
    app.use(express.static(__dirname + '/public'));
});

app.configure('development', function(){
    console.log("I'm a development server!");
    
    app.use(express.errorHandler({ dumpExceptions: true, showStack: true })); 
});

app.configure('production', function(){
    console.log("I'm a production server!");
    app.use(express.errorHandler({ dumpExceptions: true}));
});

// Routes
require('./routes')(app);

// Handlebars Template Helpers and Partials
// require('./handlebarHelpers').configureHelpers(hbs);


// Make server turn on and listen at defined PORT (or port 5000 if is not defined)
var port = process.env.PORT || 5000;
var global = {};
global.APIKEY = "xeUpEtux3Egbt5V";
app.listen(port, function() {
  console.log('Listening on ' + port);
});