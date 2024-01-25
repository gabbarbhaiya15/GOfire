const mongoose = require('mongoose');
const EmailverificationSchema = new mongoose.Schema({
id:String,
token:String,
createdAt:Date,
expiredAt:Date,


});
const  Emailverification = mongoose.model('EmailVerification', EmailverificationSchema);
module.exports = Emailverification;