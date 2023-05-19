const express = require('express');
const router = express.Router();
const ChambreCtr = require('../controlleurs/ReservationChambre');

//get all bedrooms
router.get('', ChambreCtr.queryAll);

//get bedroom by id
router.get('/:id_chambre', ChambreCtr.queryById);

//update bedroom by id
router.put('/:id_chambre', ChambreCtr.update);

//delete bedroom by id
router.delete('/:id_chambre', ChambreCtr.delete);

//add new bedroom
router.post('/add', ChambreCtr.add);

//get all bedrooms
//router.get('/dispo', ChambreCtr.queryAllDispo);




module.exports = router;