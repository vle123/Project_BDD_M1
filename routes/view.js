var express = require('express');
var router = express.Router();
var MongoClient = require("mongodb").MongoClient;
var MongoObjectID = require("mongodb").ObjectID;

/* GET users listing. */
router.get('/:id', function(req, res, next) {
  var id = req.params.id;
  MongoClient.connect('mongodb://localhost:27017', (err, client) => {
    if (err) throw err;
    var db = client.db('Stellar');
    db.collection('Object').find({"_id":new MongoObjectID(id)}).toArray((err, tasks) => {
      if(err){ res.send(err) }
      else{ 
        if (tasks.length>0){
          tasks=tasks[0];
          res.render('view', { object: tasks ,title:tasks.Nom});
        }
      }
    });

  });

});

module.exports = router;
