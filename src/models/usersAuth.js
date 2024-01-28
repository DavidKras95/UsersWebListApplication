const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt')


const userAuthSchema = new Schema({
    userName: {
        type: String,
        required: [true, 'Please enter an user name'],
        unique: true,
        lowercase: true
    },
    password: {
        type: String,
        required: [true, 'Please enter an password']
    }
}, { timestamps: true });



// Hash users password
userAuthSchema.pre('save', async function (next){
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    next();
})

const UserAuth = mongoose.model('UserAuth', userAuthSchema);
module.exports = UserAuth;