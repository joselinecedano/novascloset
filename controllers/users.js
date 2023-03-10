const express = require('express');
const bcrypt = require('bcrypt');

const router = express.Router();

//user schema 
const User = require('../models/users.js');

//INDUCES
router.get('/register',(req,res)=>{
    res.render('userViews/register.ejs')
})


//export router
module.exports = router;