const db = require('../db');

exports.queryAll = function(req, res){
    db.queryData(`SELECT * FROM velo`, function(result){
        res.send(result);
    });
};