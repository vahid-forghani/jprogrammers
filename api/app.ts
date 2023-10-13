import express from 'express';
import mongoose, {ConnectOptions} from 'mongoose';
import {CategoryController} from './controller/category.controller';
import {ArticleController} from './controller/article.controller';
import {SecurityController} from './controller/security.controller';
import * as dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = 3000;

new SecurityController(app);
new CategoryController(app);
new ArticleController(app);

app.listen(port, () => {
  console.log('listening on port: ' + port)
});

mongoose.set('strictQuery', true);
mongoose.connect(
  '' + process.env.MONGO_URL,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    authSource: "admin",
    user: process.env.MONGO_USER,
    pass: process.env.MONGO_PASSWORD
  } as ConnectOptions
).then(() => console.log('Connected to DB'))
  .catch((e) => console.log(e));
