var express = require('express');
const cors = require('cors');
var app = express();


const RoutesUser = require('./routes/user');
const RouteChambre = require('./routes/chambre');
const RouteVelo = require('./routes/velo');
const RouteReservationChambre = require('./routes/ReservationChambre');
const RouteReservationVelo = require('./routes/ReservationVelo');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));



//app.use(('/user'),require(RoutesUser));

//route



/*

router.get('/', function (req, res) {
  res.send('welcome to home page');
})

// About page route.
router.get('/about', function (req, res) {
  res.send('simple demo of express for IG3');
})

router.get('/users', function(req,res,next){ // get all festival
  // console.log("get all festival");
  db.queryAllOrdered('users','lastname',function(result){
      // console.log(result);
      res.send(result);
  });
});
*/
/*
// ----------------------------------------------------
// ---------- get one particular value

router.get('/user/:id',function(req,res,next){
  const id = req.params['id'];  
  // console.log(`get festival for id=${id}`);
  db.queryValue('users','idusers',id,function(result){
      res.send(result);
  });
});

router.post('/user/oui/:id',function(req,res,next){
    const id = req.params.id;
    const body = req.body;
    // console.log(`update festival for id=${id}`);
    // console.log(body);
    db.sendData(id,'oui',function(result){
        res.send(result);
    });
});
*/


//route 
app.use("/user",RoutesUser);
app.use("/chambre",RouteChambre);
app.use("/velo",RouteVelo);
app.use("/reservationChambre",RouteReservationChambre);
app.use("/reservationVelo",RouteReservationVelo);

app.use((req, res, next) => {
  next(createError(404));
});

app.listen(8000,function(){
  console.log("Live at Port 8000");
});
