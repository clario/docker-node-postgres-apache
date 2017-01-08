var conString = "postgres://" + process.env.POSTGRES_USER + ":" + process.env.POSTGRES_PASSWORD + "@postgres:5432/" + process.env.POSTGRES_USER;
var promise = require('bluebird');

var options = {
    // Initialization Options
    promiseLib: promise
};

var pgp = require('pg-promise')(options);

var db = pgp(conString);

function getAllLiceCoutings(req, res, next) {

    db.any('SELECT * FROM "lice_couting";')
        .then(function (data) {
            res.status(200)
                .json({
                    status: 'success',
                    data: data,
                    message: 'Retrived all lice coutings',
                    apidate: new Date(),
                    total_objects: data.length
                });
        })
        .catch(function (err) {
            return next(err);
        });

};


function getSingleLiceCouting(req, res, next) {
    var id = parseInt(req.params.id);
    console.log(id);
    db.one('select * from lice_couting where lice_count_id = $1', id)
        .then(function (data) {
            res.status(200)
                .json({
                    status: 'success',
                    data: data,
                    message: 'Retrieved ONE',
                    apidate: new Date()
                });
        })
        .catch(function (err) {
            res.status(404).json({
                status: 'error',
                data: err,
                message: 'No data found',
                apidate: new Date()
            });
        });
}


function createLiceCouting(req, res, next) {
   
  req.body.temperature = parseInt(req.body.temperature);
  req.body.latitue = parseFloat(req.body.latitue),
  req.body.longitude =parseFloat(req.body.longitude),
  req.body.lice_count =parseFloat(req.body.lice_count),
  db.none('insert into lice_couting(date, temperature, latitude, longitude, lice_count, location_name)' +
      'values(${date}, ${temperature}, ${latitude}, ${longitude},${lice_count},${location_name})',
    req.body)
    .then(function () {
      res.status(200)
        .json({
          status: 'success',
          message: 'Inserted one lice count.'
        });
    })
    .catch(function (err) {
      return next(err);
    });
};


function updateLiceCouting(req, res, next) {
  db.none('update lice_couting set date=$1, temperature=$2, latitude=$3, longitude=$4, lice_count=$5, location_name=$6  where id=$7',
    [req.body.date, req.body.temperature, parseFloat(req.body.latitude),parseFloat(req.body.longitude),
      req.body.lice_count,req.body.location_name, parseInt(req.params.id)])
    .then(function () {
      res.status(200)
        .json({
          status: 'success',
          message: 'Updated Lice Count'
        });
    })
    .catch(function (err) {
      return next(err);
    });
}


module.exports = {
    getAllLiceCoutings: getAllLiceCoutings,
    getSingleLiceCouting: getSingleLiceCouting,
    createLiceCouting: createLiceCouting,
    updateLiceCouting : updateLiceCouting
};






