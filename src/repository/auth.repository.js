
const UserAuth = require('../models/usersAuth');

const handleErrors = (err) => {
    console.log(err.message, err.code);
    let errors = { email: '', password: '' };
  
    // incorrect email
    if (err.message === 'incorrect email') {
      errors.email = 'That email is not registered';
    }
  
    // incorrect password
    if (err.message === 'incorrect password') {
      errors.password = 'That password is incorrect';
    }
  
    // duplicate email error
    if (err.code === 11000) {
      errors.email = 'that email is already registered';
      return errors;
    }
  
    // validation errors
    if (err.message.includes('user validation failed')) {
      // console.log(err);
      Object.values(err.errors).forEach(({ properties }) => {
        // console.log(val);
        // console.log(properties);
        errors[properties.path] = properties.message;
      });
    }
  
    return errors;
}
  

const AuthRepository = {
    

    // fetchUserDb: async (userData) => {
    //     try {
    //         console.log('infetch')
    //         console.log(userData)
    //         const checkIfExist =  await UserAuth.findOne({email: userData.email});
    //         console.log(checkIfExist);
    //         console.log('infetch')
    //         if(checkIfExist){
    //             console.log('Email isnt registered')
    //             const customError = new Error(`Email isn't registered, please try again`);
    //             customError.status = 404;
    //             return customError;
    //         }
    //         else{
    //             if(checkIfExist.password != userData.password){
    //                 console.log('Wrong credentials')
    //                 const customError = new Error(`Wrong credentials, please try again`);
    //                 customError.status = 404;
    //                 return customError;
    //             }
    //             return response;
    //         }
    //     } catch (err) {
    //         const errors = handleErrors(err);
    //         return({errors});
    //     }
    // },

    fetchUserDb: async (userData) => {
        try {
            const user = await UserAuth.login(userData.email, userData.password);
            console.log("22222222222222")
            console.log(user);
            console.log("22222222222222")
            return user;
        } catch (error) {
            const customError = new Error('Invalid credentials, please try again');
            customError.status = 404;
            return customError;
        }
    },
    

    saveRegisterUserDb: async (userData) => {
        try {
            const checkIfExist =  await UserAuth.findOne({email: userData.email});
            if(checkIfExist){
                const customError = new Error(`This email already registerd`);
                customError.status = 404;
                return customError;
            }
            const response = await UserAuth.create(userData);
            return response;
        } catch (err) {
            const errors = handleErrors(err);
            return({errors});
        }
    }
};

module.exports = AuthRepository; 