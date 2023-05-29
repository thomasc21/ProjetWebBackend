const express = require('express');
const router = express.Router();
const ReservatonChambreCtr = require('../controlleurs/ReservationChambre');

//get all bookings
router.get('/getReservation', ReservatonChambreCtr.getReservation);

//get bedroom by id
// router.get('/:id_chambre', ReservatonChambreCtr.queryById);

//update bedroom by id
router.put('/:id_chambre', ReservatonChambreCtr.update);

//delete bedroom by id
router.delete('/:id_chambre', ReservatonChambreCtr.delete);

//add new bedroom
router.post('/add', ReservatonChambreCtr.add);

//get all bedrooms
//router.get('/dispo', ChambreCtr.queryAllDispo);




module.exports = router;