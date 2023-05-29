const { JsonWebTokenError } = require('jsonwebtoken');
const db = require('../db.js');
const jwt = require('../token/token.js');


exports.add = async function(req, res, next){

    try{
        jwt.authenticateToken(req,res,async function(result){
        //console.log(result);
        const id = result.email;
        //console.log(id);
        await db.query(`SELECT COUNT(idReservationChambre) FROM ReservationChambre`,async (err,result)=>{
            NbReservationChambre = result[0]['COUNT(idReservationChambre)']+1;
            console.log(req.body.NomChambre);
            await db.query(`SELECT idChambre FROM Chambre WHERE NomChambre = "${req.body.NomChambre}"`,async (err,result)=>{
                IDChambre = result[0]['idChambre'];
                 try {
                    await db.query(`INSERT INTO ReservationChambre (idReservationChambre,Nom,Prenom,Mail,Telephone,NombreP,idChambre,DATE,NB_Jours,Idusers) VALUES(${NbReservationChambre},"${req.body.nom}","${req.body.prenom}","${req.body.email}","${req.body.tel}","${req.body.nb_personnes}",${IDChambre},"${req.body.date}",1,"${id}")`,(req,result)=>{    
                    if (req) {
                        console.log(err);
                        console.log("erreur add reservation chambre");
                        res.send("erreur add reservation chambre, chambre deja reservee");
                    }
                    else{
                        console.log("add reservation chambre");
                        res.send(result);
                    }
                }); //probleme avec les guillemets cast en string
            }
            catch(err){
                console.log(err);
            }
            });
        });
    });  

    }
    catch(err){
        console.log(err);
    }
}


exports.getReservation = async function(req, res){
    try{
        jwt.authenticateToken(req,res,async function(result){
        //console.log(result);
            const id = result.email;
            //console.log(id);
            await db.query(`SELECT * FROM ReservationChambre WHERE Idusers = "${id}"`,(err,result)=>{
                if (err) {
                    console.log(err);
                    console.log("erreur get reservation chambre");
                    res.send(err);
                }
                else{
                console.log("get reservation chambre");
                res.send(result);
                }
            });
        }
    );  
    }
    catch(err){
        console.log(err);
    }
}
//a faire
exports.update = async function(req, res){
    try{
    const NomChambre = req.body.NomChambre;
    //console.log(NomChambre);
    db.query(`UPDATE Chambre SET NomChambre = "${NomChambre}" WHERE idChambre = ${req.body.idChambre}`,  (err,result)=>{
        if (err) {
            console.log(err);
            console.log("erreur update chambre");
            res.send("erreur update chambre");
        }
        else{
            console.log("update chambre");
            res.send(result);
        }
    }
    );
}
catch(err){
    console.log(err);
}
}



exports.delete = async function(req, res){
try{
    jwt.authenticateToken(req,res,async function(result){
    //console.log(result);
    const id = result.email;
    //console.log(id);
    await db.query(`DELETE FROM ReservationChambre WHERE idChambre = ${req.body.idChambre} and DATE =${req.body.date}`,(err,result)=>{
        if (err) {
            console.log(err);
            console.log("erreur delete reservation chambre");
            res.send("erreur delete reservation chambre");
        }
        else{
        console.log("delete reservation chambre");
        res.send(result);
        }
    });
    }
);
}
catch(err){
    console.log(err);
}
}