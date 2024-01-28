const UserAuth = require('../models/usersAuth');
const jwt = require('jsonwebtoken');

const handleError = (err) => {
    console.log(err.message, err.code);
    let errors = { userName: '', password: ''};

    // handle duplicate userName error
    if (err.code === 11000){
        errors.userName = 'That user name is already taken';
        return errors;
    }

    if(err.message.includes('UserAuth validation failed')){
        console.log(Object.values(err.errors).forEach(({properties}) => {
            errors[properties.path] = properties.message;
        }));
    }

    return errors;
}

//One day in seconds
const maxAge = 3 * 24 * 60 * 60;
const createToken = (id) => {
    return jwt.sign({ id }, 'web application seceret', {
        expiresIn: maxAge
    });
}


const AuthController = {

    // module.exports.singup_get = (req, res ) => {
    //     res.render('signup');

    // }


    // module.exports.login_get = (req, res ) => {
    //     res.render('login');

    // }

    signupPost: async (req, res ) => {
        const { userName, password } = req.body;
        try{
            //Saving user to DB
            const user = await UserAuth.create({ userName, password });

            //Create token for user
            token = createToken(user._id); 


            //Place inside the cookie and send back
            res.cookie('jwt', token, {httpOnly: true, maxAge: maxAge*1000 });

            res.status(201).json({ user: user._id });
        }
        catch (err){
            const errors = handleError(err);
            res.status(404).json({ errors });
        }

    },

    loginPost: async (req, res ) => {
        const { email, password } = req.body;
        console.log(email);
        console.log(password);
        res.send('new login_post');

    },

    signupGet: async (req, res ) => {
        res.send('new signup_post');

    },

    loginGet: async (req, res ) => {
        res.send('new login_post');

    },

    // setCookies: async (req, res ) => {
    //     res.cookie('newUser', false);
    //     res.cookie('newEmploy2', true, { maxAge: 1000*60*60*24, httpOnly: true });
    //     res.send('Got Cookie')
    // },

    // readCookies: async (req, res ) => {
    //     const cookies = req.cookies;
    //     console.log(cookies);
    //     res.json(cookies);
    // }


};

module.exports = AuthController;