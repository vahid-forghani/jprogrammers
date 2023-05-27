import mongoose from 'mongoose';

const articleSchema = new mongoose.Schema({
  id: String,
  title: String,
  content: String
});

export const Article = mongoose.model('Article', articleSchema);
