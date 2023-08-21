const mongoose = require('mongoose');

/// create schema

const messageScheme = new mongoose.Schema({
    senderId : {
        type : String,
        required : true
   },
   senderName : {
        type: String,
        required : true
   },
   receiverId : {
        type: String,
        required : true          
   },
   message : {
        text : {
             type: String,
             default : ''
        },
        image : {
             type : String,
             default : ''
        }           
   },
   status :{
        type : String,
        default : 'unseen'
   }

},{timestamps: true})

module.exports = mongoose.model('message',messageScheme);