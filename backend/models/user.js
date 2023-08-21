const mongoose = require('mongoose');

/// create schema

const registerScheme = new mongoose.Schema({
    userName: {
        type:String,
        required: true,
        min:4,
        max:20
    },
    email: {
        type:String,
        required: true,
        min:5,
        max:50
    },
    password: {
        type:String,
        required: true,
        
        min:4,
        max:20
    },
    
    image: {
        type:String,
        required: true,
        
    },

},{timestamps: true})

module.exports = mongoose.model('user',registerScheme);