import mongoose, { Schema } from "mongoose";
const requestSchema = new mongoose.Schema({

requestTo:{type:Schema.Types.ObjectId,ref:"jwts"},
requestFrom:{type:Schema.Types.ObjectId,ref:"jwts"},
requestStatus:{type:String, default:"pending"}

});
const FriendRequest = mongoose.model('FriendRequest', requestSchema);
module.exports = FriendRequest;