const { JsonWebTokenError } = require('jsonwebtoken');
const db = require('../db');
const jwt = require('../token/token.js');

exports.queryAll = function(req, res){
    db.queryData(`SELECT * FROM ReservationChambre`, (err,result)=>{ // ajout du token pour recup uniquement les reservations de l'utilisateur
        if (err) throw err;
        else{
        res.send(result);
    console.log("all chambre");
    }
});
};


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

