var express = require('express');
var logger =require('./../logs.js').logger;
var MongoClient = require('mongodb').MongoClient;
var bodyParser = require('body-parser');
var BSON = require('mongodb').BSONPure;


var app = express();

app.use(bodyParser.urlencoded({
	extended: true
}));
app.use(bodyParser.json());

//GET ALL

exports.getAllProducts = function(request, response){
  MongoClient.connect("mongodb://localhost:27017/mongoExample", function(err, db) {
    if(err){
      logger.debug("Could not connect to database");
      response.sendStatus(400);
    }else{
      logger.debug("Connected correctly to db" );
      var collection = db.collection('product');
      collection.find().toArray(function(err, results) {
        if(err){
          logger.debug("Could not fetch all products");
          response.sendStatus(400);
        }else{
          logger.info("product list "+ results);
          response.send(results); 
        }       
      });
    }
  });
}


//GET BY ID

exports.getProductById = function(request, response){
   MongoClient.connect("mongodb://localhost:27017/mongoExample", function(err, db) {
    if(err){
      logger.debug("Could not connect to database");
      response.sendStatus(400);
    }else{
      logger.debug("Connected correctly to db" );
      var collection = db.collection('product');
      var id=request.params.id;
      var obj_id = BSON.ObjectID.createFromHexString(id);
      collection.find({_id : obj_id}).toArray(function(err, result) {
        if(err){
          logger.debug("Could not fetch product");
          response.sendStatus(400);
        }else{
          if(result.length == 0){
            logger.info("product not found ");
            response.sendStatus(404); 
          }else{
            logger.info("product : "+ result);
            response.send(result); 
          }
        }       
      });
    }
  });
}

//POST

exports.addProduct = function(request, response){
  MongoClient.connect("mongodb://localhost:27017/mongoExample", function(err, db) {
    if(err){
      logger.debug("Could not connect to database");
      response.sendStatus(400);
    }else{
      logger.debug("Connected correctly to db" );
      var collection = db.collection('product');
      var t=request.body; 
      logger.debug("New product record to be inserted is: "+ t);
      collection.insert(t, function() {
        if(err){
          logger.debug("Could not add product");
          response.sendStatus(400);
        }else{
          logger.info("product add");
          response.sendStatus(200);     
      }
    });
    }
  });
}

//PUT

exports.updateProduct = function(request, response){
  MongoClient.connect("mongodb://localhost:27017/mongoExample", function(err, db) {
    if(err){
      logger.debug("Could not connect to database");
      response.sendStatus(400);
    }else{
      logger.debug("Connected correctly to db" );
      var collection = db.collection('product');
      var id=request.params.id;
      var t=request.body;
      var obj_id = BSON.ObjectID.createFromHexString(id);
      logger.debug("Product Id for which update is being done is: "+ id);

      collection.find({_id : obj_id}).toArray(function(err, result) {
        if(err){
          logger.debug("Could not fetch product");
          response.sendStatus(400);
        }else{
          if(result.length == 0){
            logger.info("product not found ");
            response.sendStatus(404); 
          }else{
            collection.update({_id : obj_id},t,function(err) {
              if(err){
                logger.debug(err)
                logger.debug("Could not update product");
                response.sendStatus(400);
              }else{
                logger.info("product updated");
                response.sendStatus(200); 
              }       
            });
          }
        }       
      });
    }
  });
}


//delete

exports.deleteProduct = function(request, response){
  MongoClient.connect("mongodb://localhost:27017/mongoExample", function(err, db) {
    if(err){
      logger.debug("Could not connect to database");
      response.sendStatus(400);
    }else{
      logger.debug("Connected correctly to db" );
      var collection = db.collection('product');
      var id=request.params.id;
      var obj_id = BSON.ObjectID.createFromHexString(id);
      logger.debug("Id of product to be deleted is: "+ id);
      var obj_id = BSON.ObjectID.createFromHexString(id);
       collection.find({_id : obj_id}).toArray(function(err, result) {
        if(err){
          logger.debug("Could not fetch product");
          response.sendStatus(400);
        }else{
          if(result.length == 0){
            logger.info("product not found ");
            response.sendStatus(404); 
          }else{
             collection.remove({_id : obj_id},function(err) {
                if(err){
                  logger.debug("Could not delete product");
                  response.sendStatus(400);
                }else{
                  logger.info("product deleted");
                  response.sendStatus(200); 
                }       
             });
          }
        }       
      });
    }
  });
}