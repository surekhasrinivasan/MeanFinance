var mongoose = require('mongoose');


var stockSchema = new mongoose.Schema({
  _id : String,
  name : String,
  lastSale : Number,
  marketCap : String,
  ipoYear : String,
  sector : String,
  industry : String,
  summary : String
});

mongoose.model("Stock", stockSchema); //will use stocks collection