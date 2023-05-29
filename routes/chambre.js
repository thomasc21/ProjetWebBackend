const express = require('express');
const router = express.Router();
const ChambreCtr = require('../controlleurs/chambre');

//get all bedrooms
router.get('', ChambreCtr.queryAll);

//get bedroom by id
router.get('/id', ChambreCtr.queryById);

//update bedroom by id
router.put('/update', ChambreCtr.update);

//delete bedroom by id
router.delete('/delete', ChambreCtr.delete);

//add new bedroom
router.post('/add', ChambreCtr.add);

//get all bedrooms
//router.get('/dispo', ChambreCtr.queryAllDispo);




module.exports = router;