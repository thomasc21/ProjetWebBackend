const user = require('../models/user');
const db = require('../db');
exports.signup = (req, res, next) => {
    bcrypt.hash(req.body.password, 10)
        .then(hash => {
            const user = new User({
                idusers: req.body.email,
                password: hash
            });
            user.save()
                .then(() => res.status(201).json({ message: 'Utilisateur créé !' }))
                .catch(error => res.status(400).json({ error }));
        })
        .catch(error => res.status(500).json({ error }));
};




exports.queryAll = function(req, res){
    db.queryData(`SELECT * FROM users`, function(result){
        res.send(result);
        //console.log(result);
    });
};

