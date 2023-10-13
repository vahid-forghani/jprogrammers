import mongoose from 'mongoose';

const categorySchema = new mongoose.Schema({
  id: String,
  name: String,
  parent: String
});

export const CategoryRepository = mongoose.model('Category', categorySchema);
