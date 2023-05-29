const db = require('../db');

exports.queryAll = function(req, res){
    db.query(`SELECT * FROM velo`, (err,result)=>{
        if (err) {
            console.log(err);
            console.log("erreur query velo");
            res.send(err);
        }
        else{
        res.send(result);
        console.log("query velo");
        }
    });
};