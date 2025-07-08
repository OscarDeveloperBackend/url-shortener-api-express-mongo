const mongoose = require("mongoose");

const urlSchema = new mongoose.Schema({
  url_base: String,
  url_recortada: String,
  codigo: String,
  n_cliks: Number,
  date_create: {
    type: Date,
    default: () => new Date(),
  },
});

const Url = mongoose.model("Url", urlSchema);

module.exports = Url;
