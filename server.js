//DEPENDENCIES
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const methodOverride = require('method-override');

//PORT 
require('dotenv').config();

//CONTROLLER
const novasClosetController = require('./controllers/novascloset.js');

//DATABASE CONNECTION (MONGO DB CONNECTION)


//Mongo ERROR/SUCCESS Handling


//MIDDLEWARE
app.use('/novascloset', novasClosetController);



//LISTENER
const PORT = process.env.PORT
app.listen(PORT, ()=>{
    console.log(`Novascoot's Closet: Listening on port ${PORT}!!`);
});