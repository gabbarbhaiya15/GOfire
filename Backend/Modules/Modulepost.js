const mongoose = require("mongoose");
const express =  require ("express");
const UserModel = require('./UserModel');

 const PostSchema = new mongoose.Schema({

title:{type: String, required:true},
body:{type: String, required:true},
pic:{type:String, required:true},
likes:[{type:mongoose.Schema.Types.ObjectID,ref:"user"}],
comments:[{
    
    text:"String",
   postedBy:{ type:mongoose.Schema.Types.ObjectID,
              
    input: { type:String, }, 
    profilepic:{ type: 'String'},
    ref:"user"  }
 }],

 postedBy:{type: mongoose.Schema.Types.ObjectID,ref:"user"},
},
{timestamps:true}
)
 const  PostModel =   mongoose.model('Post',PostSchema);
module.exports = PostModel;
