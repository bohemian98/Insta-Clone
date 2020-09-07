const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const User = mongoose.model("User")
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const {JWT_SECRET} = require('../keys')
const requireLogin= require('../middleware/requiredLogin')
  

router.get('/protected',requireLogin,(req,res)=>{
    res.send("Hello user")
})
router.get('/',(req,res) => {
    res.send("hello")
})

router.post('/signup',(req,res) => {
    const {name, email,password} = req.body
    if(!email || !password || !name){
        return res.status(422).json({error:"enter all the fields"})
    }
    User.findOne({email:email})
    .then((savedUser)=> {
        if(savedUser){
            return res.status(422).json({error:"user already exist with the email"})

        }
        bcrypt.hash(password,12)
        .then(hashedpassword=>{
                const user = new User({
                    email,
                    password:hashedpassword,
                    name
                })
                user.save()
                 .then(user => {
                     res.json({message : "saved successfully"})
                 })
                 .catch(err=>{
                     console.log(err)
                 })
             })
        })
        
    .catch(err => {
        console.log(err)
    })
})

router.post('/signin',(req,res) =>{ 
    const {email,password} = req.body
    if(!email || !password){
        return res.status(422).json({error: "Enter email or password" })
    }
    User.findOne({email:email})
    .then(savedUser=>{
        if(!savedUser){
            return res.status(422).json({error:" email or password"})
        }
        bcrypt.compare(password, savedUser.password)
        .then(doMatch=>{
            if(doMatch){
                const token = jwt.sign({_id:savedUser._id},JWT_SECRET)
                const{id,name,email}=savedUser
                res.json({token,user:{id,name,email}})
            }
            else{
                return res.status(422).json({error:"badaliye password"})
            }
        })
        .catch(err=>{
            console.log(err)
        })
    })
})

module.exports = router