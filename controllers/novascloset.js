//DEPENDENCIES
const express = require('express');
const Bandana = require('../models/bandanas.js');
const router = express.Router();

//ROUTES
//HOME
router.get('/', (req,res)=>{
    res.render('home.ejs')
});
//SEED
router.get('/seed', (req,res)=>{
    Bandana.create([
        {
            title:'Lavender Bandana',
            img:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRV72Xj8b9Xx21L8VsF2da63HJ0ZohtgVohdA&usqp=CAU',
            description:'Purple Super Cute Floral Bandana',
            price: 12,
            qty: 10,
        },
        {
            title: 'Brown Bandana',
            img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS2H2JaNLur5GyB5JjGOqK4JrFky9Quc1IUrdnQD6x9Yf6Ta-qlxG-8sWPCJvXvXIKxjQU&usqp=CAU',
            description: 'Brown Super Cute Hippy Bandana',
            price: 19,
            qty: 10,
        },
        {
            title: 'Black Bandana',
            img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSj--mSOs3RQAiF2v_LaYUnh_TXbUy6JoUBPg&usqp=CAU',
            description: 'Black Super Chic Bandana',
            price: 17,
            qty: 10,
        },
        {
            title: 'White Bandana',
            img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSmNd5a7lPVq2Q7hTpnB7RUG1jU5EM7Qx_b4g&usqp=CAU',
            description: 'White Super Minimalistic Bandana',
            price: 15,
            qty: 10,
        },
    ], (err, data)=>{
        res.redirect('/novascloset')
    });
});

//INDEX
router.get('/bandanas', (req,res)=>{
    Bandana.find({}, (err, allBandanas)=>{
        if(err){
            console.log(err)
        }else{
            res.render('bandanaViews/bandanaIndex.ejs',{
                bandanas: allBandanas,
            })
        }
    })
});

//NEW
router.get('/bandanas/new', (req,res)=>{
    res.render('bandanaViews/bandanaNew.ejs')
})

//D

//U

//CREATE
router.post('/bandanas', (req,res)=>{
    console.log(req.body)
    Bandana.create(req.body, (err, createdBandana)=>{
        if(err){
            console.log(err)
            res.send(err)
        }else{
            console.log(createdBandana);
            res.redirect('/novascloset/bandanas');
        }
    })
});

//E

//SHOW
router.get('/bandanas/:id', (req,res)=>{
    Bandana.findById(req.params.id, (err, foundBandana)=>{
        res.render('bandanaViews/bandanaShow.ejs', {
            bandana: foundBandana,
        })
    })
});


//EXPORT ROUTER
module.exports = router