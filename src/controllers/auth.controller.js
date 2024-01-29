const AuthService = require('../services/auth.service');

const AuthController = {

    login: async (req, res) => {
        try {
            const { email, password } = req.body;
            const response = await AuthService.login({ email, password }, res);
            if(response instanceof Error){
              res.status(404).json({ error: response.message });
            }
            else res.status(200).json(response);
          }
          catch (error) {
            res.status(404).json({ error: error.message });
          }
    },


    register: async (req, res) => {
        try {
            const { email, password } = req.body;
            const response = await AuthService.register({ email, password },res);
            if(response.status === 404){
              res.status(404).json({ error: "Email already registerd, use another" });
            } 
            else if(response instanceof Error){
              res.status(404).json({ error: "Only autheorized emails can register" });
            }
            else res.status(200).json({ success: "Registered succesfully" })
          }
          catch (error) {
            console.log(error)
            res.status(404).json({ error: error.message });
          }
    }
};


module.exports =  AuthController;