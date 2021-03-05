
/**
 * Module dependencies.
 */

var express = require('express');
var http = require('http');
var path = require('path');
var handlebars = require('express3-handlebars')

var index = require('./routes/index');
// Example route
// var user = require('./routes/user');
var form = require('./routes/form');
var preview = require('./routes/preview');

var login = require('./routes/login');
var library = require('./routes/library');
var share = require('./routes/share');
var sharable = require('./routes/sharable');
var app = express();
// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', handlebars());
app.set('view engine', 'handlebars');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(express.cookieParser('IxD secret key'));
app.use(express.session());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', login.view);
app.get('/index', index.view);
// customize url
app.get('/form/:id', form.view);
app.get('/preview/:id', preview.view);
app.get('/library',library.view);
app.get('/share/:id', share.view);
app.get('/sharable', sharable.view);

app.post('/updateForm', form.updateForm);
// app.post('/generateImage', preview.generateImage);
app.post('/updateImage', form.updateImage);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
