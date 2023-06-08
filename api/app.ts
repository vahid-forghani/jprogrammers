import express from 'express';
import mongoose, { ConnectOptions } from 'mongoose';
import { CategoryRestApi } from './category.rest-api';
import { ArticleRestApi } from './article.rest-api';
import { AuthRestApi } from './auth.rest-api';
import * as dotenv from 'dotenv';
dotenv.config();

const app = express();
const port = 3000;

new AuthRestApi(app);
new CategoryRestApi(app);
new ArticleRestApi(app);

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
