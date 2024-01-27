const mongoose = require('mongoose')
const Schema = mongoose.Schema;


const userSchema = new Schema({
    id: {
        type: Number,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    first_name:{
        type: String,
        required: true
    },
    last_name:{
        type: String,
        required: true
    },
    avatar:{
        type: String,
        required: true
    } 
}, { timestamps: true });

const User = mongoose.model('User', userSchema);
module.exports = User;