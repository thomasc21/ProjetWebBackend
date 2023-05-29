const { JsonWebTokenError } = require('jsonwebtoken');
const db = require('../db.js');
const jwt = require('../token/token.js');


exports.add = async function(req, res, next){
    console.log(req.body);
    try{
        jwt.authenticateToken(req,res,async function(result){
        //console.log(result);
        const id = result.email;
        //console.log(id);
        await db.query(`SELECT COUNT(idReservationVelo) FROM ReservationVelo`,async (err,result)=>{
            NbReservationVelo = result[0]['COUNT(idReservationVelo)']+1;
            console.log(req.body.NomVelo);
            await db.query(`SELECT idvelo FROM velo WHERE NomVelo = "${req.body.NomVelo}"`,async (err,result)=>{
                IDVelo = result[0]['idvelo'];
                 try {
                    await db.query(`INSERT INTO ReservationVelo (idReservationVelo,Nom,Prenom,Mail,Telephone,idVelo,DATE,Idusers) VALUES(${NbReservationVelo},"${req.body.nom}","${req.body.prenom}","${req.body.email}","${req.body.tel}",${IDVelo},"${req.body.date}","${id}")`,(req,result)=>{    
                    if (req) {
                        console.log(err);
                        console.log("erreur add reservation Velo");
                        res.send("erreur add reservation Velo, Velo deja reservee");
                    }
                    else{
                        console.log("add reservation Velo");
                        res.send("add reservation Velo");
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
            await db.query(`SELECT * FROM ReservationVelo WHERE Idusers = "${id}"`,(err,result)=>{
                if (err) {
                    console.log(err);
                    console.log("erreur get reservation Velo");
                    res.send(err);
                }
                else{
                console.log("get reservation Velo");
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
    const NomVelo = req.body.NomVelo;
    //console.log(NomVelo);
    db.query(`UPDATE Velo SET NomVelo = "${NomVelo}" WHERE idVelo = ${req.body.idVelo}`,  (err,result)=>{
        if (err) {
            console.log(err);
            console.log("erreur update Velo");
            res.send("erreur update Velo");
        }
        else{
            console.log("update Velo");
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
    await db.query(`DELETE FROM ReservationVelo WHERE idVelo = ${req.body.idVelo} and DATE ="${req.body.date}" and idUsers="${id}" `,(err,result)=>{
        if (err) {
            console.log(err);
            console.log("erreur delete reservation Velo");
            res.send("erreur delete reservation Velo");
        }
        else{
        console.log("delete reservation Velo");
        res.send("delete reservation Velo");
        }
    });
    }
);
}
catch(err){
    console.log(err);
}
}