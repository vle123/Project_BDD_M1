var express = require('express');
var router = express.Router();
var MongoClient = require("mongodb").MongoClient;
var MongoObjectID = require("mongodb").ObjectID;

/* GET users listing. */
router.get('/:id', function(req, res, next) {
  var id = req.params.id;
  MongoClient.connect('mongodb://localhost:27017', (err, client) => {
    if (err) {
      res.send('Erreur 404 page introuvable', 404);
    }
    var db = client.db('Stellar');
    var ID ="";
    try {
      ID =new MongoObjectID(id)
    }
    catch(error) {
      res.send('Erreur 404 page introuvable', 404);
    }
    
   
    db.collection('Object').find({"_id":ID}).toArray((err, tasks) => {
      if (err) {
        res.send('Erreur 404 page introuvable', 404);
      }
      else{ 
        if (tasks.length>0){
          tasks=tasks[0];
          
          res.render('view', { object: tasks.toString() ,title:tasks.Nom});
        }
      }
    });

  });

});

module.exports = router;
