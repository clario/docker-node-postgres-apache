var conString = "postgres://" + process.env.POSTGRES_USER + ":" + process.env.POSTGRES_PASSWORD + "@postgres:5432/" + process.env.POSTGRES_USER;
var promise = require('bluebird');

var options = {
    // Initialization Options
    promiseLib: promise
};

var pgp = require('pg-promise')(options);

var db = pgp(conString);

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
};






module.exports = {
 
    updateLiceCouting : updateLiceCouting

 
};
