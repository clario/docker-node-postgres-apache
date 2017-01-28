var express = require('express');
var http = require('http');
var app = express();
var db = require('./queries');
var dbInsert = require('./inserts');
var dbUpdate = require('./update');

var bodyParser = require('body-parser')

app.use(bodyParser.json());

app.use('/dashboard', express.static('dashboard'))


//app.get('/create', db.createDB);

app.get('/licecount', db.getAllLiceCoutings);

app.post('/licecount', dbInsert.createLiceCouting);

app.get('/licecount/:id',db.getSingleLiceCouting);

app.get('/licetype/', db.getAllLiceTypeCouting);

app.get("/licetype/:id", db.getSingleLiceTypeCount);

//app.post('/',db.createLiceCouting);

//app.put('/:id',db.updateLiceCouting);


http.createServer(app).listen(process.env.PORT || 8080, function () {
  console.log('Listening on port: ' + (process.env.PORT || 8080));
});





