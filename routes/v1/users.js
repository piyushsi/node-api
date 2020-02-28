var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var User = mongoose.model('User');
var auth = require('../../modules/auth');

router.get('/', auth.verifyToken, (req, res) => {
  console.log(req.user);
  res.json({ email: req.user.email, token:req.user.token  })
});

router.post('/register',  async (req, res) => {
  try {
    var user = await User.create(req.body.user);
    console.log(user);
    res.json(user);
  } catch (error) {
    res.json(error);
  }
});

router.post('/login', async (req, res) => {
  var { email, password } = req.body.user;
  try {
    var user = await User.findOne({ email });  
    if(!user) return res.status(400).json({error: "this email is not registered"});
    var result = await user.verifyPassword(password);
    
    if(!result) return res.status(400).json({error: "abd password"});
    
    var token = await auth.generateJWT(user);
    console.log(user)
    res.json({success: true, token})

  } catch (error) {
    res.status(400).json(error);
  }
})

module.exports = router;