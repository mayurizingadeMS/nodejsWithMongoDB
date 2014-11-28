var express = require('express');
var router = express.Router();
var productDAO = require('./dao/productDao.js');
var BSON = require('mongodb').BSONPure;
var bodyParser = require('body-parser');


  router.get('/product',productDAO.getAllProducts);
  router.get('/product/:id',productDAO.getProductById);
  router.post('/product',productDAO.addProduct);
  router.put('/product/:id',productDAO.updateProduct);
  router.delete('/product/:id',productDAO.deleteProduct);

module.exports = router;