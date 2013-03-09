if(process.env.NODETIME_ACCOUNT_KEY) {
  require('nodetime').profile({
    accountKey: process.env.NODETIME_ACCOUNT_KEY,
    appName: 'Widget the People' // optional
  });
}

var express = require('express')
  , routes = require('./routes')
  , hbs = require('hbs')
  , gzippo = require('gzippo')
  , validator = require('express-validator');
  
var app = module.exports = express();


app.configure(function(){
    app.set('views', __dirname + '/views');
    app.set('view engine', 'hbs');
    app.engine('.html',require('hbs').__express); //use .html files in /views instead .hbs
    app.use(express.static(__dirname + '/public'));
    app.use(validator);
    app.use(function(req,res,next){
        res.locals.stylesheet = req.path.match(/widget/) ? "widget" : "styles";
        res.locals.google_analytics_id = process.env.GOOGLE_ANALYTICS_ID || undefined; 
        next();
    });
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


// Make server turn on and listen at defined PORT (or port 5000 if is not defined)
var port = process.env.PORT || 5000;
app.listen(port, function() {
  console.log('Listening on ' + port);
});