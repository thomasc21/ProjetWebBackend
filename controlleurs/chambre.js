const db = require('../db');





exports.queryAll = function(req, res){
    db.queryData(`SELECT * FROM chambre`, function(result){
        res.send(result);
    });
};

exports.queryAllOrdered = function(table,order,callback){
    this.queryData(`SELECT * FROM ${table} ORDER BY idusers`, callback);
}

exports.queryValue = function(table,property,key,callback){
    this.queryData(`SELECT * FROM ${table} WHERE ${property}=${key}`, callback);
}

exports.sendData = function(id,pass,callback){
    this.queryData(`INSERT INTO users (idusers,password) VALUES(${id},"${pass}")`,callback); //probleme avec les guillemets cast en string
}