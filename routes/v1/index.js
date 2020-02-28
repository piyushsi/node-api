var express = require('express');
var router = express.Router();
var userRouter = require('./users.js');
var auth = require('../../modules/auth');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.json({index: true});
});

router.get('/protected',auth.verifyToken, (req, res) => {
  res.json({success: true})
})

router.use('/users', userRouter);

module.exports = router;
