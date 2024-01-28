const mongoose = require('mongoose')
const Schema = mongoose.Schema;


const userDataSchema = new Schema({
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

const UserData = mongoose.model('UserData', userDataSchema);
module.exports = UserData;