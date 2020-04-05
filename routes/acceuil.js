var express = require('express');
var MongoClient = require("mongodb").MongoClient;
var router = express.Router();


router.get('/', function(req, res, next) {
 
  res.render('acceuil', {title:"Stellar" });
});

module.exports = router;
