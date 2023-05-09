const user = require('../models/user');
const db = require('../db');
const bcrypt = require('bcrypt');

exports.signup = (req, res, next) => {
    if (req.method == 'POST') {
        const id = req.body.idusers;
        const pass = req.body.password;
        db.queryData('select * from users ', function (result) {
            var nbuser = result.length;
            try{
                db.queryData('INSERT into users (idusers,email,password) values (' + (nbuser + 1) + ',"' + id + '","' + pass + '")', function (req) {
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


exports.login = function (req, res) {
    //console.log(req);
    const id = req.body.idusers;
    const pass = req.body.password;
    //console.log(id);
    //console.log(pass);
    db.queryData(`SELECT password FROM users where email = "${id}"`, function (result) {
        //console.log(id);
        if (!result) {
            res.send("Utilisateur non trouvé");
        }
        else {

            var storedHash = result[0].password;
            storedHash = bcrypt.hashSync(storedHash, 10);
            //console.log(storedHash);
            bcrypt.compare(pass, storedHash, function (err, match) {
                if (err) {
                    console.log(err);
                    res.send("Une erreur s'est produite lors de la connexion");
                } else if (match) {
                    res.send("Connexion réussiiiie");
                    console.log("Connexion réussie");

                } else {
                    res.send("Mot de passe incorrect");

                }
            });
        }
    });
};




exports.queryAll = function (req, res) {
    db.queryData(`SELECT * FROM users`, function (result) {
        res.send(result);
        //console.log(result);
    });
};


