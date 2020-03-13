const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
  _id: {type: mongoose.Schema.Types.ObjectId, required: true},
  serverid: {type:Number, required:true},
  userid: {type:Number, required:true},
  name: {type:String, default: 'strike'},
  strike: {type:Number, required:true},
  reason:{type:Array, required:true}
});

module.exports = mongoose.model("strike", productSchema);