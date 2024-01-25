const mongoose  = require('mongoose');
const express = require('express');
const cors = require('cors');
const router  =  express.Router();

const PostModel = require('../Modules/Modulepost');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const auth = require('../middleware/Auth');


router.get('/',auth,async(req,res)=>{
    console.log("protecting")
    
res.json(req.user);


})
module.exports = router;