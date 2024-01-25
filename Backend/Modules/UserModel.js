const mongoose = require('mongoose');
const express = require('express');
const UserSchema  = new  mongoose.Schema({
    input: { type:String, required:[true,"First name is required"]},
    password: { type:String, required:[true,"Password is required"],
   
    select: true},
    location :{type:String},
    profession : {type:String},
    
    follower:[{type:mongoose.Schema.Types.ObjectId, ref:"user"}],
    followings:[{type:mongoose.Schema.Types.Object, ref:"user"}]

,
Email : { type:String, required:[true,"Email is required"]},
profilepic:{ type: 'String',default:"https://img.icons8.com/external-tanah-basah-glyph-tanah-basah/48/1A1A1A/external-user-digital-marketing-tanah-basah-glyph-tanah-basah.png" , required: true},
coverpic:{ type: 'String',default:"https://c4.wallpaperflare.com/wallpaper/161/571/676/abstract-digital-art-depth-of-field-hexagon-wallpaper-preview.jpg" , required: true},
    token: { type:String, default:null}
   
   
     });
     const Usermodel =  mongoose.model('user',UserSchema);
     module.exports = Usermodel;