const mysql = require('mysql2');
const dotenv = require('dotenv');
dotenv.config();

const url = require('url');

const dbUrl = process.env.DATABASE_URL; // assuming this is where you have stored the DSN
const params = url.parse(dbUrl);

var connectionPool = null;
function getConnection(){
   if (!connectionPool){
      console.log("init connectionPool");
      connectionPool = mysql.createPool({
         connectionLimit: 10,
         host: params.hostname,
         user: params.auth.split(':')[0],
         password: params.auth.split(':')[1],
         database: params.pathname.slice(1),
         port: params.port,

      })      
   }
   return connectionPool;
}

// ----------------------------------------------------
// ---------- SELECT / Query data



exports.queryData = async function(request,callback){
  try{
    getConnection().query(request,function(err,result){
         if(err) console.log(err);
         if (typeof callback === 'function') {
             callback(result);
         }
     });
 }
 catch(err){
      console.log(err);
  }
}



//connection.end();*/