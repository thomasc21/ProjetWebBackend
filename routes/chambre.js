const express = require('express');
const router = express.Router();
const ChambreCtr = require('../controlleurs/chambre');

router.get('/user', ChambreCtr.queryAll);


module.exports = router;
