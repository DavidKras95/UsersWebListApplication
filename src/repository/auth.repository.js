
const UserAuth = require('../models/usersAuth');

const handleErrors = (err) => {
    console.log(err.message, err.code);
    let errors = { email: '', password: '' };
  
    if (err.message === 'incorrect email') {
      errors.email = 'That email is not registered';
    }
  
    if (err.message === 'incorrect password') {
      errors.password = 'That password is incorrect';
    }
  
    if (err.code === 11000) {
      errors.email = 'That email is already registered';
      return errors;
    }
  
    if (err.message.includes('user validation failed')) {
      Object.values(err.errors).forEach(({ properties }) => {
        errors[properties.path] = properties.message;
      });
    }
    return errors;
}
  

const AuthRepository = {

    fetchUserDb: async (userData) => {
        try {
            const user = await UserAuth.login(userData.email, userData.password);
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