var mongoose = require('mongoose');

var boughtStockSchema = new mongoose.Schema({
  _id : String,
  amount : Number
});

var userSchema = new mongoose.Schema({
  username : {
    type: String,
    unique: true,
    required: true
  },
  password : {
    type: String,
    required : true
  },
  balance : {
    type: Number,
    'default' : 10000.00
  },
  stocks : {
    type: [boughtStockSchema],
    'default' : []
  }
});

mongoose.model("User", userSchema);