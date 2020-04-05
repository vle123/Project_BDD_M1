var express = require('express');
var router = express.Router();
var MongoClient = require("mongodb").MongoClient;
var MongoObjectID = require("mongodb").ObjectID;

/* GET users listing. */
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
        var str="";
        tasks.forEach(e => {
          str+=e.Nom;
          str+=",";
          if(e.Masse){str+=e.Masse;}
          str+="<br>";
        });
        console.log(str);
        res.render('d3', { object: str,title:"D3js"});
        //res.json(tasks)
      }
    });

  });

});

module.exports = router;
