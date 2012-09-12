
/**
 * Module dependencies.
 */

var express = require('express');

var app = module.exports = express();

// Configuration

app.configure(function(){
    app.set('port', process.env.PORT || 3000);
    app.set('views', __dirname + '/views');
    app.set('view engine', 'jade');
    app.set('view options', { layout: true });
    app.set('project_root', __dirname);
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use(app.router);
    app.use(express.static(__dirname + '/public'));
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function(){
  app.use(express.errorHandler());
});

// Routes
require('./routes').init(app);


app.listen(3000, function(){
  console.log("Express server listening on port %d in %s mode", app.get('port'), app.settings.env);
});
