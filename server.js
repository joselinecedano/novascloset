//DEPENDENCIES
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const Bandana = require('./models/bandanasModel/bandanas.js');

//PORT 
require('dotenv').config();

//CONTROLLER
const novasClosetController = require('./controllers/novascloset.js');

//DATABASE CONNECTION (MONGO DB CONNECTION)
mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    //gets rid of deprecation warnings
})

//Mongo ERROR/SUCCESS Handling
const db = mongoose.connection;
db.on('err', (err)=>console.log(`${err.message} MongoDB is NOT RUNNING`));
db.on('connected', ()=>console.log(`MongoDB is CONNECTED!`));
db.on('disconnected', ()=>console.log(`MongoDb is DISCONNECTED!`))

//MIDDLEWARE
app.use('/novascloset', novasClosetController);
    // ^^ gives us access to router ^^
app.use(express.json())
app.use(express.urlencoded({extended:true}))
    // ^^ gives us access to req.body ^^^
app.use(methodOverride('_method'))
    // ^^ gives us access to DELETE and _method ^^


//LISTENER
const PORT = process.env.PORT
app.listen(PORT, ()=>{
    console.log(`Novascoot's Closet: Listening on port ${PORT}!!`);
});