const express = require('express');
const mongoose = require("mongoose");
const app = express();
const port = 3000;

const {Category} = require('./Category.js');
const {Article} = require('./Article.js');

app.get('/categories', (request, response) => {
  Category.find({}, (error, documents) =>{
    response.send(documents);
  });
});

app.get('/articles', (request, response) => {
  Article.find({}, (error, documents) => {
    response.send(documents);
  });
});

app.listen(port, () => {
  console.log('listening on port: ' + port)
});

mongoose.set('strictQuery', true);
mongoose.connect(
  'mongodb://localhost/jprogrammers',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    authSource: "admin",
    user: "root",
    pass: "root"
  }
).then(() => console.log('Connected to DB'))
.catch((e) => console.log(e));
