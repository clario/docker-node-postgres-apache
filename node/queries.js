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
           okResult(data,req,res,next,"Retrived all lice coutings ");
        })
        .catch(function (err) {
            return next(err);
        });

};

function getAllLiceTypeCouting(req, res, next) {

    db.any('SELECT * FROM "lice_type_count";')
        .then(function (data) {
           okResult(data,req,res,next,"Retrived all lice type coutings ");
        })
        .catch(function (err) {
            return next(err);
        });

};



function okResult(data,req,res,next,msg){
     res.status(200)
                .json({
                    status: 'success',
                    data: data,
                    message: msg,
                    apidate: new Date(),
                    totalObjects: data.length
                });
}



function getSingleLiceCouting(req, res, next) {
    console.log("hellllo")
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


function getSingleLiceTypeCount(req, res, next) {
    console.log("haiiiiii")
    var id = parseInt(req.params.id);
    db.one('select * from lice_type_count where lice_type_count_id = $1', id)
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










module.exports = {
    getAllLiceCoutings: getAllLiceCoutings,
    getSingleLiceCouting: getSingleLiceCouting,
    getAllLiceTypeCouting: getAllLiceTypeCouting,
    getSingleLiceTypeCount:getSingleLiceTypeCount
 
};






