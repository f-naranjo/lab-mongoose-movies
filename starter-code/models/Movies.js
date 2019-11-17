const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const schemaName = new Schema({

  title: String,
  genre: String,
  plot: String,

});

const Model = mongoose.model("movies", schemaName);
module.exports = Model;