import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  id: String,
  name: String,
  username: String,
  password: String
});

export const UserRepository = mongoose.model('User', userSchema);
