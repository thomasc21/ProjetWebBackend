// wiki.js - Wiki route module.

var express = require('express');
var router = express.Router();
const cors = require('cors');
var app = express();
var router = express.Router();
const bodyParser = require('body-parser');
const db = require('./db');
app.use(cors());
app.use(express.json());
// Home page route.
router.get('/', function (req, res) {
  res.send('welcome to home page');
})

// About page route.
router.get('/about', function (req, res) {
  res.send('simple demo of express for IG3');
})

router.get('/user', function(req,res,next){ // get all festival
  // console.log("get all festival");
  db.queryAllOrdered('user','lastname',function(result){
      // console.log(result);
      res.send(result);
  });
});


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


module.exports = router;

app.use("/",router);
app.listen(8000,function(){
  console.log("Live at Port 8000");
});