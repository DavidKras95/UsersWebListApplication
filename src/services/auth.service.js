
const axios = require('axios');
const AuthRepository = require('../repository/auth.repository');

const AuthService = {

    login: async (credentials) => {
        try {
            const user = await AuthRepository.fetchUserDb(credentials);

            // Do something with the user, maybe generate a token or send user details
            return user;
        } catch (error) {
            console.error(`Error during login: ${error.message}`);
            return { error: 'Invalid credentials, please try again' };
        }
    },

    register: async (credentials) => {
        console.log("auth controller service")
        try {
            const response = await axios.post(`https://reqres.in/api/register/`, {
                email: credentials.email,
                password: credentials.password
            });
            console.log(response);
            console.log("Registered successfully on API");  
            const responseSaveUser = await AuthRepository.saveRegisterUserDb({
                id: response.data.id,
                email: credentials.email,
                password: credentials.password,
                token: response.data.token
            });
            if (responseSaveUser.status === 404) {
                console.error("Error saving user to the database");
                return responseSaveUser;
            } else {
                console.log("User saved successfully to the database");
                return responseSaveUser;
            }
        }
        catch (error) {
            const customError = new Error({error: error.data});
            return(customError);
        }
    }
};


module.exports = AuthService;