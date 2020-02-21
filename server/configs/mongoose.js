const mongoose = require("mongoose");
require('dotenv').config({path: '../.env'});

mongoose
  .connect(process.env.MONGODB, {useNewUrlParser:true, useUnifiedTopology: true})
  .then(x => {
    console.log(`Connected to Mongo! Database name: server birthdate`)
  })
  .catch(err => {
    console.error('Error connecting to mongo', err)
  });