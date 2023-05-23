const { JsonWebTokenError } = require('jsonwebtoken');
const db = require('../db');
const jwt = require('../token/token.js');

exports.queryAll = function(req, res){
    db.queryData(`SELECT * FROM chambre`, function(result){
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

exports.add = async function(req, res, next){
    try{
        jwt.authenticateToken(req,res,async function(result){
        console.log(result);
        const id = result.email;
        console.log(id);
        await db.queryData(`SELECT COUNT(idReservationChambre) FROM ReservationChambre`,async function(result){
            NbReservationChambre = result[0]['COUNT(idReservationChambre)']+1;
            console.log(req.body.NomChambre);
            await db.queryData(`SELECT idChambre FROM Chambre WHERE NomChambre = "${req.body.NomChambre}"`,async function(result){
                IDChambre = result[0]['idChambre'];
                await db.queryData(`INSERT INTO ReservationChambre (idReservationChambre,Nom,Prenom,Mail,Telephone,NombreP,idChambre,DATE,NB_Jours,Idusers) VALUES(${NbReservationChambre},"${req.body.nom}","${req.body.prenom}","${req.body.email}","${req.body.tel}","${req.body.nb_personnes}",${IDChambre},"${req.body.date}",1,"${id}")`,function(result){    
                    console.log("add reservation chambre");
                    res.send(result);
                }); //probleme avec les guillemets cast en string
            });
        });
        }
    );  
    }

    catch(err){
        console.log(err);
    }
}



exports.queryById = function(req, res){
    db.queryData(`SELECT * FROM users where NomChambre = ${req.body.id}`, function(result){
        res.send(result);
    }
    );
};

exports.update = function(req, res){
    const NomChambre = req.body.NomChambre;
    //console.log(NomChambre);
    db.queryData(`UPDATE Chambre SET NomChambre = "${NomChambre}" WHERE idChambre = ${req.body.idChambre}`, function(result){
        res.send(result);
    }
    );
};

exports.delete = function(req, res){
    db.queryData(`DELETE FROM Chambre WHERE idChambre = ${req.body.id}`, function(result){
        res.send(result);
    }
    );
}