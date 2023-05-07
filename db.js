const e = require('express');
var mysql = require('mysql');
const routeC = require('./routes/chambre');

var connectionPool = null;
function getConnection(){
   if (!connectionPool){
      console.log("init connectionPool");
      connectionPool = mysql.createPool({
         connectionLimit: 10,
         host     : 'localhost',
         user     : 'root',
         password : 'root',
         database: 'projetweb'
      })      
   }
   return connectionPool;
}

// ----------------------------------------------------
// ---------- SELECT / Query data



exports.queryData = function(request,callback){
    getConnection().query(request,function(err,result){
         if(err) console.log(err);
         if (typeof callback === 'function') {
             callback(result);
         }
     });
 }
/*
exports.queryAll = function(table,callback){
    this.queryData(`SELECT * FROM ${table}`, callback);
}

exports.queryAllOrdered = function(table,order,callback){
    this.queryData(`SELECT * FROM ${table} ORDER BY idusers`, callback);
}

exports.queryValue = function(table,property,key,callback){
    this.queryData(`SELECT * FROM ${table} WHERE ${property}=${key}`, callback);
}

exports.sendData = function(id,pass,callback){
    this.queryData(`INSERT INTO users (idusers,password) VALUES(${id},"${pass}")`,callback); //probleme avec les guillemets cast en string
}

exports.Chambre = function(table,callback){
    this.queryData(routeC, callback);
}



//connection.end();*/