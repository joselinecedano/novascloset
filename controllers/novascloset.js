//DEPENDENCIES
const express = require('express');
const Bandana = require('../models/bandanas.js');
const Costume = require('../models/costumes.js');
const Treat = require('../models/treats.js');
const router = express.Router();

//ROUTES
//HOME
router.get('/', (req,res)=>{
    res.render('home.ejs')
});
//SEED
router.get('/seed', (req,res)=>{
    Treat.create([
        {
            title:'Pumpkin and Peanut Butter Treats',
            img:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQKH3oDwH2PgIrYJmSyiYeg8YtRI5eMcArzVg&usqp=CAU',
            description:'natural homemade oumpking and peanut butter dog treats',
            price: 24,
            qty: 10,
        },
        {
            title: 'Watermelon Treats',
            img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQeKV-PGc4U-MV15DgkGCPTw47GTal7DE_DAEqeV_ObwAZZ0zEWLJ9wU77c5yarz7OZ2v0&usqp=CAU',
            description: 'frozen watermelon dog treats',
            price: 19,
            qty: 16,
        },
        {
            title: 'Strawberry Treats',
            img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRJSK-udRBycfMSjolRkRvHVbSpXXuITZDvrQ&usqp=CAU',
            description: 'frozen strawberry dog treats',
            price: 17,
            qty: 4,
        },
        {
            title: 'Waffle Treats',
            img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQpZ8hGN6Hh2EmQBM-tsGxEFdYjv7vfVvJOHQ&usqp=CAU',
            description: 'cute waffle shaped dog friendly treats',
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
router.get('/treats', (req,res)=>{
    Treat.find({}, (err, allTreats)=>{
        if(err){
            console.log(err);
        }else{
            res.render('treatViews/treatIndex.ejs',{
                treats: allTreats,
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
router.get('/treats/:id', (req,res)=>{
    Treat.findById(req.params.id, (err, foundTreat)=>{
        res.render('treatViews/treatShow.ejs', {
            treat: foundTreat,
        })
    })
});


//EXPORT ROUTER
module.exports = router