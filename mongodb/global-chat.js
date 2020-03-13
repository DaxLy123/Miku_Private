const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
  _id: {type: mongoose.Schema.Types.ObjectId, required: true},
  name: {type:String, default: 'global'},
  channel: {type:String, required:true},
  guildid: {type:String, required:true}
});

module.exports = mongoose.model("global-chat", productSchema);