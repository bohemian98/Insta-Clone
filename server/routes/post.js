const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const requireLogin = require('../middleware/requiredLogin')
const Post = mongoose.model("Post")
const User = mongoose.model("User")

router.get('/allpost',requireLogin,(req,res)=>{
    Post.find()
    .populate("postedBy")
    .then(posts=>{
        console.log(posts)
        res.json({posts})
    })
    .catch(err=>{
        console.log(err) 
    })
})

router.post('/createpost',requireLogin,(req,res)=>{
    const {title,body,pic} = req.body 
    if(!title || !body || !pic){
      return  res.status(422).json({error:"Plase add all the fields"})
    }
    //req.user.password = undefined
    const post = new Post({
        title,
        body,
        photo:pic,
        postedBy:req.user
    })
    post.save().then(result=>{
        res.json({post:result})
    })
    .catch(err=>{
        console.log(err)
    })
})
/*router.post('/createpost',requireLogin ,(req,res) => {
    const{title,body,pic} = req.body
    console.log(title,body,pic)
    if(!title || !body || !pic){
        res.status(422).json({error:"Please add all the fields"})
    }
    req.user.password = undefined
    //const myuser=User.findOne({email:req.user.email})
    const post = new Post({
        title,
        body,
        photo:pic,
       postedBy:req.user
    })
    post.save().then(result=>{
        console.log("Printing req username",req.user.name)
        console.log(result)
        res.json({post:result})
    })
    .catch(err=>{
        console.log(err)
    })
})*/

router.get('/mypost',requireLogin,(req,res)=>{
    Post.find({postedBy:req.user._id})
    .populate("PostedBy","_id name")
    .then(mypost=>{
        res.json({mypost})
    })
    .catch(err=>{
        console.log(err)
    })
})

module.exports = router 