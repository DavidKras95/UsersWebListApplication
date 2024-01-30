const axios = require("axios");
const jwt = require("jsonwebtoken");
const cookie = require("cookie");
const AuthRepository = require("../repository/auth.repository");

const AuthService = {
  login: async (credentials, res) => {
    try {
      const user = await AuthRepository.fetchUserDb(credentials);
      console.log(user);
      if (user instanceof Error) {
        console.error("Error saving user to the database");
        user.status = 404;
        return user;
      } else {
        const token = jwt.sign(
          { token: user.token },
          process.env.TOKEN_SECRET,
          {
            expiresIn: "1h",
          }
        );
        res.setHeader(
          "Set-Cookie",
          cookie.serialize("token", token, {
            httpOnly: true,
            maxAge: 60 * 60,
          })
        );
        return user;
      }
    } catch (error) {
      console.error(`Error during login: ${error.message}`);
      res.status(500).json({ error: "Internal Server Error" });
      return { error: "Invalid credentials, please try again" };
    }
  },

  register: async (credentials, res) => {
    try {
      const response = await axios.post(`https://reqres.in/api/register/`, {
        email: credentials.email,
        password: credentials.password,
      });
      console.log("Registered successfully on API");
      const responseSaveUser = await AuthRepository.saveRegisterUserDb({
        id: response.data.id,
        email: credentials.email,
        password: credentials.password,
        token: response.data.token,
      });
      if (responseSaveUser.status === 404) {
        console.error("Error saving user to the database");
        return responseSaveUser;
      } else {
        console.log("User saved successfully to the database");
        const token = jwt.sign(
          { token: responseSaveUser.token },
          process.env.TOKEN_SECRET,
          { expiresIn: "1h" }
        );
        res.setHeader(
          "Set-Cookie",
          cookie.serialize("token", token, {
            httpOnly: true,
            maxAge: 60 * 60,
          })
        );
        return responseSaveUser;
      }
    } catch (error) {
      const customError = new Error({ error: error.data });
      return customError;
    }
  },
};

module.exports = AuthService;
