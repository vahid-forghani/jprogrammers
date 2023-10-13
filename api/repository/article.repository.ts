import mongoose from 'mongoose';

const articleSchema = new mongoose.Schema({
  id: String,
  title: String,
  description: String,
  content: String
});

export const ArticleRepository = mongoose.model('Article', articleSchema);
