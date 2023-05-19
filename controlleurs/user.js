const user = require('../models/user');
const db = require('../db');
const bcrypt = require('bcrypt');
const jwt = require("../token/token.js");

exports.signup = (req, res, next) => {
    if (req.method == 'POST') {
        const id = req.body.idusers;
        const pass = req.body.password;
        const passHash = bcrypt.hashSync(pass, 10);
        db.queryData('select * from users ', function (result) {
            var nbuser = result.length;
            try{
                db.queryData('INSERT into users (idusers,email,password) values (' + (nbuser + 1) + ',"' + id + '","' + passHash + '")', function (req) {
                    if(req){
                    // console.log("utilisateur ajouté");
                        res.send("utilisateur ajouté");
                    }
                    else{
                    // console.log("erreur");
                    res.send("erreur inscription");
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
    //console.log(id);
    //console.log(pass);
    try {
    db.queryData(`SELECT idusers,password FROM users where email = "${id}"`, async function (result) {
        //console.log(id);
        try {
        if (!result) {
            res.send("Utilisateur non trouvé");
        }
        else {

            var storedHash = result[0].password;
            //console.log(storedHash);
            bcrypt.compare(pass, storedHash, async function (err, match) {
                try{
                    if (err) {
                        console.log(err);
                        res.send("Une erreur s'est produite lors de la connexion");
                    } 
                    else if (match) {
                        //res.send("Connexion réussiiiie");
                        console.log("Connexion réussie");
                        const token = await jwt.generateToken(result[0].idusers);
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
    db.queryData(`SELECT * FROM users where email = ${req.body.idusers}`, function (result) {
        res.send(result);
        //console.log(result);
    });
};



exports.queryAll = function (req, res) {
    db.queryData(`SELECT * FROM users`, function (result) {
        res.send(result);
        //console.log(result);
    });
};

exports.delete = function (req, res) {
    db.queryData(`DELETE FROM users WHERE idusers = ${req.body.idusers}`, function (result) {
        res.send(result);
    });
}

exports.update = function (req, res) {
    const id = req.body.idusers;
    const pass = req.body.password;
    const passHash = bcrypt.hashSync(pass, 10);
    db.queryData(`UPDATE users SET password = "${passHash}" WHERE idusers = ${req.body.idusers}`, function (result) {
        res.send(result);
    });
}
