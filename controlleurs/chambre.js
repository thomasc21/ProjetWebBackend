const db = require('../db.js');

exports.queryAll = function(req, res){
    db.query(`SELECT * FROM Chambre`, (err,result)=>{
        if (err) {
            console.log(err);
            console.log("erreur query chambre");
            res.send("erreur query chambre");
        }
        else{
        res.send(result);
    console.log("all chambre");
        }
   });
};

// exports.queryAllOrdered = function(table,order,callback){
//     db.query(`SELECT * FROM ${table} ORDER BY idusers`, callback);
// }

// exports.queryValue = function(table,property,key,callback){
//     db.query(`SELECT * FROM ${table} WHERE ${property}=${key}`, callback);
// }

exports.add = function(req,res){
    db.query(`SELECT COUNT(*) FROM Chambre`, (err,result)=>{
        NbChambre = result[0]['COUNT(*)']+1;
    db.query(`INSERT INTO Chambre (idChambre,NomChambre,TypeChambre,PrixChambre) VALUES(${NbChambre},"${req.body.NomChambre}","${req.body.TypeChambre}","${req.body.PrixChambre}")`,(err,result)=>{
        if (err) {
            console.log(err);
            console.log("erreur add chambre");
            res.send(err);
        }
        //console.log(result);
        res.send(result);
        console.log("add chambre");
    }); //probleme avec les guillemets cast en string
    
}
);
}

exports.queryById = function(req, res){
    db.query(`SELECT * FROM Chambre where NomChambre = ${req.body.id}`, (err,result)=>{
        if (err) {
            console.log(err);
            console.log("erreur query chambre");
            res.send(err);
        }
        else{
            res.send(result);
            console.log("query chambre");
        }
    }
    );
};

exports.update = function(req, res){
    const NomChambre = req.body.NomChambre;
    //console.log(NomChambre);
    db.query(`UPDATE Chambre SET NomChambre = "${NomChambre}" WHERE idChambre = ${req.body.idChambre}`, (err,result)=>{
        if (err) {
            console.log(err);
            console.log("erreur update chambre");
            res.send(err);
        }
        else{
            res.send(result);
            console.log("update chambre");
        }
    }
    );
};

exports.delete = function(req, res){
    db.query(`DELETE FROM Chambre WHERE idChambre = ${req.body.id}`, (err,result)=>{
        if (err) {
            console.log(err);
            console.log("erreur delete chambre");
            res.send(err);
        }
        else{
            res.send(result);
            console.log("delete chambre");
        }
    }
    );
}
