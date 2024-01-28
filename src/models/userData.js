const mongoose = require('mongoose')
const Schema = mongoose.Schema;


const userDataSchema = new Schema({
    id: {
        type: Number,
        required: true
    },
    email: {
        // type: String,
        // required: true
        type: String

    },
    first_name:{
        // type: String,
        // required: true
        type: String
    },
    last_name:{
        // type: String,
        // required: true
        type: String,
    },
    avatar:{
        // type: String,
        // required: true
        type: String,
    },
    name:{
        // type: String,
        // required: true
        type: String,
    },
    job:{
        // type: String,
        // required: true
        type: String,
    }  
}, { timestamps: true });

const UserData = mongoose.model('UserData', userDataSchema);
module.exports = UserData;