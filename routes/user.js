const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');

const userCtrl = require('../controlleurs/user');
const userChambre = require('../controlleurs/chambre');

router.post('/signup', userCtrl.signup);
//router.get('/login', userCtrl.login);

//router.get('/AllUser', userCtrl.queryAll);
router.get('', userCtrl.queryAll);

module.exports = router;