const user = require('../models/user');
const db = require('../db');
const bcrypt = require('bcrypt');
exports.signup = (req, res, next) => {
   if(req.method == 'POST'){
         const id = req.body.idusers;
            const pass = req.body.password;
            db.queryData('insert into users (idusers,password) values ('+id+',"'+pass+'")', function(result){
                res.send(result);
            });
    }
    else{
        res.send("erreur");
    }
};

exports.login = function (req, res){
    //console.log(req);
    const id = req.body.idusers;
    const pass = req.body.password;
    //console.log(id);
   //console.log(pass);
    db.queryData(`SELECT password FROM users where email = "${id}"`, function(result){
        //console.log(id);
        if(!result){
            res.send("Utilisateur non trouvé");
        }
        else{
            
            var storedHash = result[0].password;
            storedHash = bcrypt.hashSync(storedHash, 10);
            //console.log(storedHash);
            bcrypt.compare(pass, storedHash, function(err, match) {
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




exports.queryAll = function(req, res){
    db.queryData(`SELECT * FROM users`, function(result){
        res.send(result);
        //console.log(result);
    });
};

