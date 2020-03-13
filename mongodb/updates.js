const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
  _id: {type: mongoose.Schema.Types.ObjectId, required: true},
  name: {type:String, default: 'updates'},
  array: {type:Array, required:true}
});

module.exports = mongoose.model("updates", productSchema);