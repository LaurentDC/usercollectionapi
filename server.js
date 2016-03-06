// BASE SETUP
// ==================================
var express = require('express');
var app = express();
var port = 3000;
var mongoose = require('mongoose');
var passport = require('passport');
var flash = require('connect-flash');

var morgan = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var configDB = require('./config/database.js');
var cors = require('cors');

// CONFIGURATION
// ==================================

mongoose.connect(configDB.database);
require('./config/passport')(passport);

app.use(express.static(__dirname + '/public'));
//‡app.use(express.static(__dirname + '/public/angularhttpcollection'));
app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(morgan('dev'));
app.use(session({secret: configDB.secret}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
app.use(cors());

// VIEWS
// ==================================
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

// ROUTES
// ==================================
require('./routes.js')(app, passport);
app.use(require('./controllers/categoryController'));
app.use(require('./controllers/itemController'));
app.use(require('./controllers/userCollectionController'));

// START SERVER
// ==================================

app.listen(port);
console.log('-------Server Started-------');
