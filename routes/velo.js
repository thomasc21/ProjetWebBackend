const express = require('express');
const router = express.Router();
const VeloCtr = require('../controlleurs/velo');

router.get('', VeloCtr.queryAll);


module.exports = router;