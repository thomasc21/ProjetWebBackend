const express = require('express');
const router = express.Router();
const ReservatonVeloCtr = require('../controlleurs/ReservationVelo');

//get all bookings
router.get('/getReservation', ReservatonVeloCtr.getReservation);

//get bedroom by id
// router.get('/:id_Velo', ReservatonVeloCtr.queryById);

//update bedroom by id
router.put('/:id_Velo', ReservatonVeloCtr.update);

//delete bedroom by id
router.delete('/delete', ReservatonVeloCtr.delete);

//add new bedroom
router.post('/add', ReservatonVeloCtr.add);

//get all bedrooms
//router.get('/dispo', VeloCtr.queryAllDispo);




module.exports = router;