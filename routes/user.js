const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');

const userCtrl = require('../controlleurs/user');
const userChambre = require('../controlleurs/chambre');

//add new user
router.post('/signup', userCtrl.signup);

//login user
router.post('/login', userCtrl.login);

//get all users
router.get('', userCtrl.queryAll);

//get user by id
router.get('/:id_user', userCtrl.queryById);

//delete user by id
router.delete('/:id_user', userCtrl.delete);

router.put('/password', userCtrl.updatePassword);

module.exports = router;