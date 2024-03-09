const mongoose = require("mongoose");

// create Schema
const interestSchema = new mongoose.Schema({
    usid:{
        type:String,
        required: true
    },
    inid: {
        type:String,
        Default:Date.now(),
    },
    interest: {
        type:String,
    },
    level: {
        type: String
    }
});


// create Model

const interest = mongoose.model('interests', interestSchema);

module.exports = interest;