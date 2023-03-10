//DEPENDENCIES
const express = require('express');
const Bandana = require('../models/bandanas.js');
const Costume = require('../models/costumes.js');
const Treat = require('../models/treats.js');
const router = express.Router();

//MIDDLEWARE
const authRequired = (req, res, next)=>{
    //check if the username and the current user is = admin
    if( req.session.currentUser && req.session.currentUser.username === 'admin'){
        next()
    }else{
        //if user is not admin then let them know they do not have access
        if(req.session.currentUser){
            res.send('You do not have access to this page')
        }else{
          res.redirect('/users/login')  
        }
    }
};

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
router.get('/bandanas/new', authRequired, (req,res)=>{
    res.render('bandanaViews/bandanaNew.ejs');
})
router.get('/costumes/new', authRequired, (req,res)=>{
    res.render('costumeViews/costumeNew.ejs');
})
router.get('/treats/new', authRequired,(req,res)=>{
    res.render('treatViews/treatNew.ejs');
})

//DELETE
router.delete('/bandanas/:id', authRequired,(req,res)=>{
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
router.delete('/costumes/:id', authRequired,(req,res)=>{
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
router.delete('/treats/:id', authRequired,(req,res)=>{
    Treat.findByIdAndDelete(req.params.id, (err, deletedTreat)=>{
        if(err){
            console.log(err);
            res.send(err);
        }else{
            console.log(deletedTreat);
            res.redirect('/novascloset/treats');
        }
    })
});

//UPDATE
router.put('/bandanas/:id', authRequired, (req,res)=>{
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
router.put('/costumes/:id',authRequired, (req,res)=>{
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
router.put('/treats/:id',authRequired, (req,res)=>{
    Treat.findByIdAndUpdate(req.params.id, req.body, {new: true}, (err, updatedTreat)=>{
        if(err){
            console.log(err);
            res.send(err);
        }else{
            console.log(updatedTreat);
            res.redirect(`/novascloset/treats/${updatedTreat._id}`);
        }
    })
});
//BUY
router.put('/bandanas/:id/buy', (req,res)=>{
    Bandana.findById(req.params.id, (err, boughtBandana)=>{
        if(err){
            console.log(err);
            res.send(err);
        }else{
            boughtBandana.qty -= 1;
            boughtBandana.save((err, boughtBandana)=>{
                if(err){
                    console.log(err);
                    res.send(err);
                }else{
                    console.log(boughtBandana);
                    res.redirect('/novascloset/bandanas');
                }
            });
        }
    })
});
router.put('/costumes/:id/buy', (req,res)=>{
    Costume.findById(req.params.id, (err, boughtCostume)=>{
        if(err){
            console.log(err);
            res.send(err);
        }else{
            boughtCostume.qty -= 1;
            boughtCostume.save((err, boughtCostume)=>{
                if(err){
                    console.log(err);
                    res.send(err);
                }else{
                    console.log(boughtCostume);
                    res.redirect('/novascloset/costumes');
                }
            });
        }
    })
});
router.put('/treats/:id/buy', (req,res)=>{
    Treat.findById(req.params.id, (err, boughtTreat)=>{
        if(err){
            console.log(err);
            res.send(err);
        }else{
            boughtTreat.qty -= 1;
            boughtTreat.save((err, boughtTreat)=>{
                if(err){
                    console.log(err);
                    res.send(err);
                }else{
                    console.log(boughtTreat);
                    res.redirect('/novascloset/treats');
                }
            });
        }
    })
});
//CREATE
router.post('/bandanas', authRequired, (req,res)=>{
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
router.post('/costumes',authRequired, (req,res)=>{
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
router.post('/treats',authRequired, (req,res)=>{
    Treat.create(req.body, (err, createdTreat)=>{
        if(err){
            console.log(err)
            res.send(err)
        }else{
            console.log(createdTreat);
            res.redirect('/novascloset/treats');
        }
    })
});

//EDIT
router.get('/bandanas/:id/edit', authRequired, (req,res)=>{
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
router.get('/costumes/:id/edit', authRequired,(req,res)=>{
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
router.get('/treats/:id/edit', authRequired, (req,res)=>{
Treat.findById(req.params.id, (err, foundTreat)=>{
    if(err){
        console.log(err)
        res.send(err)
    }else{
        res.render('treatViews/treatEdit.ejs',{
            treat: foundTreat,
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