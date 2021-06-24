const express = require('express');
const router = express.Router();
const db = require('../models');

//get all User
router.get('/', (req,res)=>{
    db.User.findAll().then((users,err)=>{
        if (!err)
        res.render('user_index', {
          title : 'CRUD Operation using NodeJS / ExpressJS / MySQL',
          users : users
      });
        else
        console.log(err);
    })
})

//get single id
router.get('/add',(req,res)=>{
   res.render('user_add', {
        title : 'CRUD Operation using NodeJS / ExpressJS / MySQL'
    })
})

//post new user
router.post('/save',(req,res)=>{
    db.User.create({
        name:req.body.name,
        age:req.body.age,
        location:req.body.location
    }).then(submitedUser=>
        res.redirect('/'))
})

//get single id
router.get('/edit/:id',(req,res)=>{
    db.User.findAll({
        where:{
            id:req.params.id
        }
    }).then(user=>res.render('user_edit', {
        title : 'CRUD Operation using NodeJS / ExpressJS / MySQL',
        user : user[0]
    }))
})

//update
router.post("/update",(req,res)=>{
    console.log(res.error)
    db.User.update(
        {
            name:req.body.name,
            age:req.body.age,
            location:req.body.location
        },
        {
            where:{id:req.body.id}
        }
    ).then(()=>

    res.redirect('/')
    )
})

//delete user
router.get('/delete/:id',(req,res)=>{
    db.User.destroy({
        where:{
            id:req.params.id
        }
        
    }).then(()=>res.redirect('/'))
})

module.exports = router;