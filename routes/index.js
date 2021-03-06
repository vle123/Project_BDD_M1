var express = require('express');
var MongoClient = require("mongodb").MongoClient;
var router = express.Router();
var data = null;
var flag = true;

router.get('/', function(req, res, next) {
  MongoClient.connect('mongodb://localhost:27017', (err, client) => {
    if (err) throw err;
    var db = client.db('Stellar');
    db.collection('Object').find({"Classe":"Planète"}).toArray((err, tasks) => {
      if(err){ res.send(err) }
      else{ 
        data=tasks;
      }
    });

  });
  res.render('index', {title:"Stellar", books: data });
});
router.post('/', function (req, res) {

  MongoClient.connect('mongodb://localhost:27017', (err, client) => {
    if (err) throw err;
    var db = client.db('Stellar');
    var re = new Map();
    if(req.body.classe!=""){
      re.set("Classe",req.body.classe);
    }
    if (req.body.min!="" || req.body.max!=""){
      var minmax = new Map();
      if (req.body.min!=""){
        if(req.body.Number == "Masse"){
          var n = 10**parseInt(req.body.min);
        }else{
          n=parseInt(req.body.min);
        }
        minmax.set("$gte",n);
        
      }
      if (req.body.max!=""){
        if(req.body.Number == "Masse"){
          var n = 10**parseInt(req.body.max);
        }else{
          n=parseInt(req.body.max);
        }
        minmax.set("$lte",n);
        
      }
      re.set(req.body.Number,minmax);
    }

    re.set("Nom",new RegExp(req.body.name, "i"));
    console.log(re);
    db.collection('Object').find(re).limit(parseInt(req.body.limit)).toArray((err, tasks) => {
      if(err){ res.send(err) }
      else{ 
        
        if(tasks.length>15){
          res.render('indexList', { title:"Stellar",books: tasks ,name:req.body.name,classe:req.body.classe,min:req.body.min,max:req.body.max,number:req.body.Number,limit:req.body.limit});
        }else{
          res.render('index', { title:"Stellar",books: tasks ,name:req.body.name,classe:req.body.classe,min:req.body.min,max:req.body.max,number:req.body.Number,limit:req.body.limit});
        }
      }
    });

  });
  
});

module.exports = router;
