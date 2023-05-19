const express = require('express');
const router = express.Router();
const VeloCtr = require('../controlleurs/velo');

//get all bikes
router.get('', VeloCtr.queryAll);

//get bike by id
//router.get('/:id_velo', VeloCtr.queryById);

//update bike by id
//router.put('/:id_velo', VeloCtr.update);

//delete bike by id
//router.delete('/:id_velo', VeloCtr.delete);

//add new bike
//router.post('/add', VeloCtr.add);

//get all bikes available
//router.get('/dispo', VeloCtr.queryAllDispo);


module.exports = router;