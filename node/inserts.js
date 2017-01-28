var conString = "postgres://" + process.env.POSTGRES_USER + ":" + process.env.POSTGRES_PASSWORD + "@postgres:5432/" + process.env.POSTGRES_USER;
var promise = require('bluebird');

var options = {
    // Initialization Options
    promiseLib: promise
};

var pgp = require('pg-promise')(options);

var db = pgp(conString);



function insertOK(res,msg){
      res.status(200)
        .json({
          status: 'success',
          message: msg
        });
};


function liceCountObjectFactory(body){
    return {
        "client_timestamp": body.client_timestamp,
        "location_name": body.location_name,
        "temperature": parseFloat(body.temperature),
        "count_number": parseFloat(body.count_number),
        "user_name": body.user_name
    }
} 

function liceCountTypeFactory(body){
    return  {
            "kh":parseInt(body.total.kh),
            "lb":parseInt(body.total.lb),
            "sl":parseInt(body.total.sl),
            "fs":parseInt(body.total.fs),
            "sb":parseInt(body.total.sb)
        }
}


function createLiceCouting(req,res,next){
    var liceCount = liceCountObjectFactory(req.body);
    var liceCountType = liceCountTypeFactory(req.body);

    db.tx(function (t1) {
        return t1.one("INSERT INTO lice_type_count(kh, lb, sl, fs, sb) VALUES (${kh},${lb}, ${sl}, ${fs}, ${sb}) RETURNING lice_type_count_id;", liceCountType)
        .then(function(data){
            var id = data.lice_type_count_id;
           return t1.none('INSERT INTO lice_couting(client_timestamp, temperature, count_number, lice_type_count_id, location_name, user_name) ' +
                                        'VALUES (${client_timestamp},${temperature}, ${count_number} , ' + id + ', ${location_name}, ${user_name} );', 
           liceCount);
        });
    })
    .then(function (data) {
        console.log(data); // print new user id;
        insertOK(res,"Inserted lice Count, all ok!");
      
    })
    .catch(function (error) {
        console.log("ERROR:", error.message || error);
    });
}



module.exports = {
  
    createLiceCouting: createLiceCouting,
 
 
};