//DEPENDENCIES
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const Bandana = require('./models/bandanas.js');
const Costume = require('./models/costumes.js');
const Treat = require('./models/treats.js');
const session = require('express-session');
//PORT 
require('dotenv').config();
//SESSION
const SESSION_SECRET = process.env.SESSION_SECRET
console.log(`Here is my session secret`)
console.log(SESSION_SECRET)
app.use(session({
    secret: SESSION_SECRET,
    resave: false, //https://www.npmjs.com/package/express-session#resave
    saveUninitialized: false,
}))
//CONTROLLER
const novasClosetController = require('./controllers/novascloset.js');
const usersController = require('./controllers/users.js');

//DATABASE CONNECTION (MONGO DB CONNECTION)
mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    //gets rid of deprecation warnings
});

//Mongo ERROR/SUCCESS Handling
const db = mongoose.connection;
db.on('err', (err)=>console.log(`${err.message} MongoDB is NOT RUNNING`));
db.on('connected', ()=>console.log(`MongoDB is CONNECTED!`));
db.on('disconnected', ()=>console.log(`MongoDb is DISCONNECTED!`));

//MIDDLEWARE
app.use(express.json());
app.use(express.urlencoded({extended:true}));
    // ^^ gives us access to req.body ^^^
app.use(methodOverride('_method'));
    // ^^ gives us access to DELETE and _method ^^
app.use(express.static('public'));
    // ^^ allows us to use css ^^
app.use('/novascloset', novasClosetController);
app.use('/users', usersController);
    // ^^ gives us access to router ^^
    //MUST BE AFTER ALL OTHER MIDDLEWARE

//LISTENER
const PORT = process.env.PORT
app.listen(PORT, ()=>{
    console.log(`Novascoot's Closet: Listening on port ${PORT}!!`);
});