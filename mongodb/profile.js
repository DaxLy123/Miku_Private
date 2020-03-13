const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
  _id: {type: mongoose.Schema.Types.ObjectId, required: true},
  userid: {type:Number, required:true},
  name: {type:String, default: 'profile'},
  money: {type:Number, required:true, default: "0"},
  redeem: {type:Number},
  pokemon: {type:Array}
});

module.exports = mongoose.model("profile", productSchema);