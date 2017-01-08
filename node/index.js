var express = require('express');
var http = require('http');
var app = express();
var db = require('./queries');

var bodyParser = require('body-parser')

app.use(bodyParser.json());


app.get('/', db.getAllLiceCoutings);

app.get('/:id',db.getSingleLiceCouting);

app.post('/',db.createLiceCouting);

app.put('/:id',db.updateLiceCouting);


http.createServer(app).listen(process.env.PORT || 8080, function () {
  console.log('Listening on port: ' + (process.env.PORT || 8080));
});





