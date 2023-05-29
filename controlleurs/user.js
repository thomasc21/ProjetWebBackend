const user = require('../models/user');
const db = require('../db');
const bcrypt = require('bcrypt');
const jwt = require("../token/token.js");

exports.signup = (req, res, next) => {
    if (req.method == 'POST') {
        const id = req.body.idusers;
        const pass = req.body.password;
        const passHash = bcrypt.hashSync(pass, 10);
        db.query('select * from users ',  (err,result)=> {
            var nbuser = result.length;
            try{
                db.query('INSERT into users (idusers,email,password) values (' + (nbuser + 1) + ',"' + id + '","' + passHash + '")', (err,req)=>{
                    if (err) {
                        console.log(err);
                        console.log("erreur add user");
                        res.send("erreur add user");
                    }
                    else{
                        console.log("add user");
                        res.send("Utilisateur ajouté");
                    }
                }); 
            }
            catch(err){ 
                console.log(err);
            }
        });    
    };
}


exports.login = async function (req, res) {
    //console.log(req);
    const id = req.body.idusers;
    const pass = req.body.password;
    console.log(id);
    //console.log(pass);
    try {
    db.query(`SELECT idusers,password FROM users where email = "${id}"`, async  (err,result)=> {
        //console.log(id);
        try {
        if (err) {
            res.send("Utilisateur non trouvé");
        }
        else {

            //var storedHash = result[0].password;
            //console.log(storedHash);
            //storedHash = bcrypt.hashSync(storedHash, 10, );
            //console.log(storedHash);
            bcrypt.compare(pass, result[0].password, async function (err, match) {
                try{
                    if (err) {
                        console.log(err);
                        res.send("Une erreur s'est produite lors de la connexion");
                    } 
                    else if (match) {
                        //res.send("Connexion réussiiiie");
                        console.log("Connexion réussie");
                        //console.log(id);
                        const token = await jwt.generateToken(id);
                        //console.log(token);
                        res.json({'token' : token});
                        //result(null, res[0]);
                        // not found User with the email
                        //result({ kind: "not_found" }, null);
                    } 
                    else {
                        res.send("Mot de passe incorrect");

                    }
                }
                catch(err){
                    console.log(err);
                }
            });
        }
        }
    catch(err){
        console.log(err);
    }
    });
}
    catch(err){
    console.log(err);
    }
};

exports.queryById = function (req, res) {
    db.query(`SELECT * FROM users where email = ${req.body.idusers}`,  (err,result)=> {
        if (err) {
            console.log(err);
            console.log("erreur query user");
            res.send("erreur query user");
        }
        else{
        res.send(result);
        console.log("query user");
        }
    });
};



exports.queryAll = function (req, res) {
    db.query(`SELECT * FROM users`,  (err,result)=> {
        if (err) {
            console.log(err);
            console.log("erreur query user");
            res.send("erreur query user");
        }
        else{
        res.send(result);
        console.log("query user");
        }
    });
};

exports.delete = function (req, res) {
    db.query(`DELETE FROM users WHERE idusers = ${req.body.idusers}`,  (err,result) =>{
        if (err) {
            console.log(err);
            console.log("erreur delete user");
            res.send("erreur delete user");
        }
        else{
        res.send(result);
        console.log("delete user");
        }
    });
}




exports.updatePassword = async function (req, res) {
    try{
    jwt.authenticateToken(req, res, async function (result) {
            console.log(result);
            const id = result.email;
            const pass = req.body.password;
            const passHash = bcrypt.hashSync(pass, 10);
            db.query(`UPDATE users SET password = "${passHash}" WHERE email = "${id}"`,  (err,result) =>{
                if (err) {
                    console.log(err);
                    console.log("erreur update user");
                    res.send("erreur update user");
                }
                else{
                res.send("update user");
                console.log("update user");
                }
            });
        });
    }
    catch(err){
        console.log(err);
    }
}
