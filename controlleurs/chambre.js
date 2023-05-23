const db = require('../db');

exports.queryAll = function(req, res){
    db.queryData(`SELECT * FROM Chambre`, function(result){
        res.send(result);
    console.log("all chambre");
    });
};

// exports.queryAllOrdered = function(table,order,callback){
//     db.queryData(`SELECT * FROM ${table} ORDER BY idusers`, callback);
// }

// exports.queryValue = function(table,property,key,callback){
//     db.queryData(`SELECT * FROM ${table} WHERE ${property}=${key}`, callback);
// }

exports.add = function(req,callback){
    db.queryData(`SELECT COUNT(*) FROM Chambre`, function(result){
        NbChambre = result[0]['COUNT(*)']+1;
    db.queryData(`INSERT INTO Chambre (idChambre,NomChambre,TypeChambre,PrixChambre) VALUES(${NbChambre},"${req.body.NomChambre}","${req.body.TypeChambre}","${req.body.PrixChambre}")`,callback); //probleme avec les guillemets cast en string
    console.log("add chambre");
}
);
}

exports.queryById = function(req, res){
    db.queryData(`SELECT * FROM Chambre where NomChambre = ${req.body.id}`, function(result){
        res.send(result);
    }
    );
};

exports.update = function(req, res){
    const NomChambre = req.body.NomChambre;
    //console.log(NomChambre);
    db.queryData(`UPDATE Chambre SET NomChambre = "${NomChambre}" WHERE idChambre = ${req.body.idChambre}`, function(result){
        res.send(result);
        console.log("update chambre");
    }
    );
};

exports.delete = function(req, res){
    db.queryData(`DELETE FROM Chambre WHERE idChambre = ${req.body.id}`, function(result){
        res.send(result);
        console.log("delete chambre");
    }
    );
}