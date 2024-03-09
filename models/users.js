const mongoose = require("mongoose");


// create Schema
const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required: true
    },
    email: {
        type:String,
        required:true,
        unique:true
    },
    mobile: {
        type:String,
    },
    password: {
        type: String
    },
    location: {
        type: {
          type: String,
          enum: ['Point'],
          default: 'Point',
        },
        coordinates: {
          type: [Number],
          default: [0, 0],
        }},
    preference: {
        type: String
    },
    usid:{
        type: String,
        default: Date.now()
    }
});


// create Model

const user = mongoose.model('users', userSchema);

module.exports = user;