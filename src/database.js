const mongoose = require('mongoose');
const {mongodb}= require('./keys');

mongoose.connect(mongodb.URI,{useNewUrlParser:true, useUnifiedTopology:true})
    .then(db => console.log("La base de datos esta conectada"))
    .catch(err => console.error(err));