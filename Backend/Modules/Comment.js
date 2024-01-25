const mongoose = require('mongoose');
const express = require('express');
 const CommentSchema = new  mongoose.Schema({
  userId: {type:mongoose.Schema.Types.ObjectId,ref:"jwts"},
  postId: {type:mongoose.Schema.Types.objectIdt,ref:"Post"},
  Comment :{type:String, required:true},
  from:{type:String, required:true},
  replies:{
    RID:{type:mongoose.Schema.objectId, ref:"jwts"},
    userId :{type:mongoose.Schema.Types.ObjectId},
    from :{type:String, required:true},
    Comment:{type:String, required:true},
    created_at:{type:Date,default:Date.now( )},
    updated_at:{type:Date, default:Date.now( )},
    likes:[{types:String}]

  },
likes:[{type:String}]
 }
 ,{timestamps: true}
 );
 const Comment =   mongoose.Model('Comment',CommentSchema);
 module.exports = Comment;