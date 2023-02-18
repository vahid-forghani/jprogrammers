const mongoose = require("mongoose");
const articleSchema = new mongoose.Schema({
  id: String,
  title: String,
  content: String
});

const Article = mongoose.model('Article', articleSchema);
module.exports = {Article};
