const e = require('express');
var mysql = require('mysql');
require('dotenv').config();


var connectionPool = null;
const connection = mysql.createConnection({
         connectionLimit: 10,
         host     : process.env.DB_HOST,
         user     : process.env.DB_USER,
         password : process.env.DB_PASS,
         database: process.env.DB_NAME
      })      
module.exports = connection;
// // ----------------------------------------------------
// // ---------- SELECT / Query data



// exports.queryData = async function(request,callback){
//   try{
//     getConnection().query(request,function(err,result){
//          if(err) console.log(err);
//          if (typeof callback === 'function') {
//              callback(result);
//          }
//      });
//  }
//  catch(err){
//       console.log(err);
//   }
// }


//connection.end();*/