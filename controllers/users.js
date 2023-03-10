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

//renders user login page
router.get('/login', (req,res)=>{
    res.render('userViews/login.ejs')
})
router.post('/login', (req,res)=>{
    //find user with entered username
    User.findOne({username: req.body.username}, (err, foundUser)=>{
        if(foundUser){
            //if username found compare w entered password
            const validLogin = bcrypt.compareSync(req.body.password, foundUser.password);
            //returns true if matched
            //if matched log user in
        if(validLogin){
            req.session.currentUser = foundUser;
            //let session know we are logged in
            res.redirect('/novascloset');
            console.log(req.body.username, 'logged in')
        }else{
            res.send('Invalid Username or Password. Please try again. Thank You!');
        }
        }else{
            //if user does NOT exist 
            res.send('Invalid Username or Password. Please try again. Thank You!');
        }
    })
});

//log user out <--- DESTROY SESSION 
router.get('/logout', (req,res)=>{
    //destroys the session but can still access user through the req object 
    console.log(req.session.currentUser, 'logged out');
    req.session.destroy();
    res.redirect('/novascloset');
});

//export router
module.exports = router;