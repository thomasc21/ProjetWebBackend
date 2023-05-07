const express = require('express');
const router = express.Router();
const ChambreCtr = require('../controlleurs/chambre');

router.get('', ChambreCtr.queryAll);


module.exports = router;