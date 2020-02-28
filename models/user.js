var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');

var Schema = mongoose.Schema;

var userSchema = new Schema({
  username: {
    type: String,
    required: true,
    minlength: 4
  },
  email: {
    type: String,
    unique:true,
    required: true,
    match:/@/
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
    imageurl:{
    type:String
  },
    followers:{
    type:[String]
  },
    following:{
    type:[String]
  },
  bio: {
    type:String
  }
}, { timestamps: true });

userSchema.pre('save', async function(next) {
  if(this.password && this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 10);
    next()
  }
  next()
});

userSchema.methods.verifyPassword = async function(password) {
  return await bcrypt.compare(password, this.password);
  
}

module.exports = mongoose.model('User', userSchema);