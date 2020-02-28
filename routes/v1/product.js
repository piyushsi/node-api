var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var auth = require('../../modules/auth');
var Product = require('../../models/product')

router.post('/add',  auth.verifyToken,async (req, res) => {
    try {
        if(req.user.email=="smratstudiocare@gmail.com"){
            var product = await Product.create(req.body);
            res.json(product);
        }
        else {
            res.json("admin required")
        }
     
    } catch (error) {
      res.json(error);
    }
  });


module.exports = router;