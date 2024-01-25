const mongoose  = require('mongoose');
const express = require('express');
const cors = require('cors');
const router  =  express.Router();
const UserModel = require('../Modules/UserModel');
const PostModel = require('../Modules/Modulepost');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const auth = require('../middleware/Auth')


router.post('/',(req,res)=>{

let  userpattern = new RegExp("^"+ req.body.query)
  UserModel.find({Email: {$regex: userpattern}})
 .select("_id Email")
 .then((user)=>{
    res.status(200).json((user))
 })
 .catch((error)=>{
    res.status(400).json("error in searching item ")
 })
})
module.exports =  router;