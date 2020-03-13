const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
  _id: {type: mongoose.Schema.Types.ObjectId, required: true},
  guildid: {type:Number, required:true},
  userid: {type:Number, required:true},
  name: {type:String, default: 'level'},
  xp: {type:Number, required:true, default: 0},
});

module.exports = mongoose.model("prefix", productSchema);