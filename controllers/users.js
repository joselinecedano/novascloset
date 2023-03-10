const express = require('express');
const bcrypt = require('bcrypt');

const router = express.Router();

//user schema 
const User = require('../models/users.js');

//renders the user register page
router.get('/register',(req,res)=>{
    res.render('userViews/register.ejs')
})
//adds user to our database and checks the username is unique
router.post('/register', (req,res)=>{
    // vvv encrypt passwords vvv
    const salt = bcrypt.genSaltSync(10)
    console.log(req.body)
    req.body.password = bcrypt.hashSync(req.body.password, salt)
    console.log(req.body)

    //checks if username is already being used
    User.findOne({username:req.body.username},(err, userExists)=>{
        if(userExists){
            res.send('That username is already taken. Please try again. Thank you!');
        }else{
            User.create(req.body, (err, createdUser)=>{
                console.log(createdUser);
                req.session.currentUser = createdUser;
                res.redirect('/novascloset');
            })
        }
    })
});
//renders user log in page
router.get('/login', (req,res)=>{
    res.render('userViews/login.ejs')
})

//export router
module.exports = router;