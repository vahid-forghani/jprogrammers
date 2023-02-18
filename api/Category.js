const mongoose = require("mongoose");
const categorySchema = new mongoose.Schema({
  id: String,
  name: String,
  parent: String
});

const Category = mongoose.model('Category', categorySchema);
module.exports = {Category};
