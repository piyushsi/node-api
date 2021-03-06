const jwt = require('jsonwebtoken');

module.exports = {
  generateJWT:  async (user) => {
    var payload = { userId: user.id, email: user.email };
    var token = await jwt.sign(payload, "mynameisrithik");
     return token;
    
  },
  verifyToken:  ( async (req, res, next) => {
    var token = req.headers['authorization'] || "";
    if(token) {
      try {
        var payload = await jwt.verify(token, "mynameisrithik");
        req.user = payload;
        req.user.token = token;
        next();
      } catch (error) {
        res.json({message: "invalid token", error});
      }
      
    } else {
      res.json({msg: 'Token required'});
    }
  })
}