const mongoose=require('mongoose');

const chatSchema=new mongoose.Schema({
  from:{
    type:String,
    required:true,
  },
  to:{
    type:String,
    required:true,
  },
  msg:{
    type:String,
    maxLength:1000,
  },
  created_at:{
    type:Date,
    required:true, 
    default:Date.now,
  }
});
const Chat=mongoose.model('Chat',chatSchema);
module.exports=Chat;