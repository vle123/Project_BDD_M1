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
router.post('/', function (req, res) {
  var m =1*(10**parseInt(req.body.masse));
  console.log(m);
  MongoClient.connect('mongodb://localhost:27017', (err, client) => {
    if (err) throw err;
    var db = client.db('Stellar');
    db.collection('Object').find({"Masse":{$gte:m}}).toArray((err, tasks) => {
      // Tester la commande MongoDb
      if(err){ res.send(err) }
      else{ 
        // Envoyer les données au format json
        res.render('index', { books: tasks });
        //res.json(tasks)
      }
    });

  });
  
});
router.get('/', function(req, res, next) {
  MongoClient.connect('mongodb://localhost:27017', (err, client) => {
    if (err) throw err;
    var db = client.db('Stellar');
    db.collection('Object').find({"Masse":{$gte:1e+24}}).toArray((err, tasks) => {
      // Tester la commande MongoDb
      if(err){ res.send(err) }
      else{ 
        // Envoyer les données au format json
        data=tasks;
        //res.json(tasks)
      }
    });

  });
  res.render('index', { books: data });
});


module.exports = router;
