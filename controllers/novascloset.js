//DEPENDENCIES
const express = require('express');
const Bandana = require('../models/bandanas.js');
const Costume = require('../models/costumes.js');
const router = express.Router();

//ROUTES
//HOME
router.get('/', (req,res)=>{
    res.render('home.ejs')
});
//SEED
router.get('/seed', (req,res)=>{
    Costume.create([
        {
            title:'Krab Costume',
            img:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRK9hm5rYu2rfE-EC0kyp47wRxhadVAr8vBwavVm9RKQtPDFdMTpAxsCfxEEbmOlz56D4A&usqp=CAU',
            description:'cute krab dog costume',
            price: 24,
            qty: 10,
        },
        {
            title: 'Panda Costume',
            img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQZG81Ds71-1j0n1-J_EoG_iLvIXKvb9yZOeg&usqp=CAU',
            description: 'cute panda dog costume',
            price: 19,
            qty: 16,
        },
        {
            title: 'Cowboy Costume',
            img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSEh5NweV3yWaSXSkLzUX_r4M_q1vOXwiYcDAAxVT66ZNf65H4rMqJmpP5PGTVYYOypSW4&usqp=CAU',
            description: 'funny cowboy dog cosutme',
            price: 17,
            qty: 4,
        },
        {
            title: 'White Bandana',
            img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSop8Tbjk7RF8fYRiGe93ugif7B7DQ6CaM2mw&usqp=CAU',
            description: 'funny dinosaur dog costume',
            price: 15,
            qty: 40,
        },
    ], (err, data)=>{
        res.redirect('/novascloset')
    });
});

//INDEX
router.get('/bandanas', (req,res)=>{
    Bandana.find({}, (err, allBandanas)=>{
        if(err){
            console.log(err);
        }else{
            res.render('bandanaViews/bandanaIndex.ejs',{
                bandanas: allBandanas,
            })
        }
    })
});
router.get('/costumes', (req,res)=>{
    Costume.find({}, (err, allCostumes)=>{
        if(err){
            console.log(err);
        }else{
            res.render('costumeViews/costumeIndex.ejs',{
                costumes: allCostumes,
            })
        }
    })
});

//NEW
router.get('/bandanas/new', (req,res)=>{
    res.render('bandanaViews/bandanaNew.ejs');
})
router.get('/costumes/new', (req,res)=>{
    res.render('costumeViews/costumeNew.ejs');
})

//DELETE
router.delete('/bandanas/:id', (req,res)=>{
    Bandana.findByIdAndDelete(req.params.id, (err, deletedBandana)=>{
        if(err){
            console.log(err);
            res.send(err);
        }else{
            console.log(deletedBandana);
            res.redirect('/novascloset/bandanas');
        }
    })
});
router.delete('/costumes/:id', (req,res)=>{
    Costume.findByIdAndDelete(req.params.id, (err, deletedCostume)=>{
        if(err){
            console.log(err);
            res.send(err);
        }else{
            console.log(deletedCostume);
            res.redirect('/novascloset/costumes');
        }
    })
});

//UPDATE
router.put('/bandanas/:id', (req,res)=>{
    Bandana.findByIdAndUpdate(req.params.id, req.body, {new: true}, (err, updatedBandana)=>{
        if(err){
            console.log(err);
            res.send(err);
        }else{
            console.log(updatedBandana);
            res.redirect(`/novascloset/bandanas/${updatedBandana._id}`);
        }
    })
})
router.put('/costumes/:id', (req,res)=>{
    Costume.findByIdAndUpdate(req.params.id, req.body, {new: true}, (err, updatedCostume)=>{
        if(err){
            console.log(err);
            res.send(err);
        }else{
            console.log(updatedCostume);
            res.redirect(`/novascloset/costumes/${updatedCostume._id}`);
        }
    })
})

//CREATE
router.post('/bandanas', (req,res)=>{
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
router.post('/costumes', (req,res)=>{
    Costume.create(req.body, (err, createdCostume)=>{
        if(err){
            console.log(err)
            res.send(err)
        }else{
            console.log(createdCostume);
            res.redirect('/novascloset/costumes');
        }
    })
});

//EDIT
router.get('/bandanas/:id/edit', (req,res)=>{
Bandana.findById(req.params.id, (err, foundBandana)=>{
    if(err){
        console.log(err)
        res.send(err)
    }else{
        res.render('bandanaViews/bandanaEdit.ejs',{
            bandana: foundBandana,
            })
        }
    })
});
router.get('/costumes/:id/edit', (req,res)=>{
Costume.findById(req.params.id, (err, foundCostume)=>{
    if(err){
        console.log(err)
        res.send(err)
    }else{
        res.render('costumeViews/costumeEdit.ejs',{
            costume: foundCostume,
            })
        }
    })
});

//SHOW
router.get('/bandanas/:id', (req,res)=>{
    Bandana.findById(req.params.id, (err, foundBandana)=>{
        res.render('bandanaViews/bandanaShow.ejs', {
            bandana: foundBandana,
        })
    })
});
router.get('/costumes/:id', (req,res)=>{
    Costume.findById(req.params.id, (err, foundCostume)=>{
        res.render('costumeViews/costumeShow.ejs', {
            costume: foundCostume,
        })
    })
});


//EXPORT ROUTER
module.exports = router