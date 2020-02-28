var express = require('express');
var path = require('path');
// var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose');


// Configure dotenv
require('dotenv').config();
require('./models/user');




//connect to db
mongoose.connect('mongodb://localhost/shop', 
  {
    useCreateIndex:true,
    useNewUrlParser: true,
    useUnifiedTopology: true
  }, (err) => {
    console.log('Connected', err ? err : true);
  }
);

var v1Router = require('./routes/v1');
var productRouter = require('./routes/v1/product');
// var v2Router = require('./routes/v2');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/v1', v1Router);
app.use('/api/v1/product', productRouter);


// Heroku - connect
var server_port = process.env.YOUR_PORT || process.env.PORT || 8008;
var server_host = process.env.YOUR_HOST || '0.0.0.0';
app.listen(server_port,server_host,  function() {
    console.log('Listening on port %d', server_port);
});


module.exports = app;
