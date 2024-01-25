const express = require('express');
const cors = require('cors');
const router  =  express.Router();
const UserModel = require('../Modules/UserModel');
const PostModel = require('../Modules/Modulepost');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const auth = require('../middleware/Auth');

router.get('/:id', async (req,res)=>{
    const id = req.params.id
    console.log(id);
 await UserModel.findOne({_id:req.params.id})

 .select("-password")
 .then((user)=>{
    console.log(user)

 PostModel.findOne({postedBy: req.params.id})
.populate("postedBy","_id input")
.then((post)=>{
    res.status(200).json({
        user,
        post
    });
})
.catch((error)=>{console.log("error while finding post ")});
 })
 .catch((err)=>{res.status(401).json("user not found" )})


})
module.exports = router;