var express = require('express');
var MongoClient = require("mongodb").MongoClient;
var router = express.Router();
var data = null;
var flag = true;

/* GET home page. */
MongoClient.connect('mongodb://localhost:27017', (err, client) => {
    if (err) throw err;
    var db = client.db('Stellar');
    db.collection('Object').find().toArray((err, tasks) => {
      // Tester la commande MongoDb
      if(err){ res.send(err) }
      else{ 
        // Envoyer les données au format json
        data=tasks;
        //res.json(tasks)
      }
    });

});

router.get('/', function(req, res, next) {
  MongoClient.connect('mongodb://localhost:27017', (err, client) => {
    if (err) throw err;
    var db = client.db('Stellar');
    db.collection('Object').find().toArray((err, tasks) => {
      // Tester la commande MongoDb
      if(err){ res.send(err) }
      else{ 
        // Envoyer les données au format json
        data=tasks;
        //res.json(tasks)
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
        minmax.set("$gte",10**parseInt(req.body.min));
        
      }
      if (req.body.max!=""){
        minmax.set("$lte",10**parseInt(req.body.max));
        
      }
      re.set("Masse",minmax);
    }

    re.set("Nom",new RegExp(req.body.name, "i"));
    console.log(re);
    db.collection('Object').find(re).toArray((err, tasks) => {
      // Tester la commande MongoDb
      if(err){ res.send(err) }
      else{ 
        // Envoyer les données au format json
        res.render('index', { title:"Stellar",books: tasks ,name:req.body.name,classe:req.body.classe,min:req.body.min,max:req.body.max});
        //res.json(tasks)
      }
    });

  });
  
});

module.exports = router;
