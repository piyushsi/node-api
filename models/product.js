var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var productSchema = new Schema({
    name: {
      type: String,
      required: true
    },
    desc: {
      type: String,
      required: true,
      minlength: 4
    },
    cost: {
      type: [String]
    }
  }, { timestamps: true }); 
  
  
 var Product = mongoose.model('Product', productSchema);
  module.exports = Product;