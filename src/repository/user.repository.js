const axios = require("axios").default;
const User = require("../models/userData");
const PageUserData = require("../models/pageUserData");

const UserRepository = {
  getUsersApi: async (page) => {
    try {
      const response = await axios.get(
        `https://reqres.in/api/users?page=${page}`
      );
      return response.data;
    } catch (error) {
      if (error.response && error.response.status === 404) {
        const customError = new Error(`No users found for page ${page}.`);
        customError.status = 404;
        throw customError;
      } else {
        throw error;
      }
    }
  },

  getUserApi: async (userId) => {
    try {
      const response = await axios.get(
        `https://reqres.in/api/users?id=${userId}`
      );
      return response.data.data;
    } catch (error) {
      if (error.response && error.response.status === 404) {
        const customError = {
          status: 404,
          message: `User with ID ${userId} not found.`,
        };
        console.log(customError);
        throw customError;
      } else {
        console.error(error);
        throw error;
      }
    }
  },

  createUserApi: async (userData) => {
    try {
      const response = await axios.post(`https://reqres.in/api/users`, {
        name: userData.name,
        job: userData.job,
      });
      return response.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  },

  updateUserApi: async (userId, updatedUserData) => {
    try {
      const response = await axios.put(
        `https://reqres.in/api/users/${userId}`,
        {
          name: updatedUserData.name,
          job: updatedUserData.job,
        }
      );
      return response.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  },

  deleteUserApi: async (userId) => {
    try {
      const response = await axios.delete(
        `https://reqres.in/api/users/${userId}`
      );
      return response.status;
    } catch (error) {
      console.error("Error deleting user:", error);
      throw error;
    }
  },

  getUsersDb: async (page) => {
    try {
      const response = await PageUserData.find({ page });

      if (response.length > 0 && response[0].data) {
        return response[0].data;
      } else {
        console.warn("No data found in the database for page:", page);
        return [];
      }
    } catch (error) {
      console.error("Failed to get users from db:", error);
      throw error;
    }
  },

  getUserByIdDb: async (userId) => {
    try {
      const response = await User.findOne({ id: userId });

      if (response) {
        return response;
      } else {
        console.warn(`User ID ${userId} was not found`);
        return null;
      }
    } catch (error) {
      console.error("Failed to get user from db:", error);
      throw error;
    }
  },

  saveUsersPageDb: async (users) => {
    try {
      const response = await PageUserData.create(users);
      return response;
    } catch (error) {
      console.error("Failed to save users to db:", error);
      throw error;
    }
  },

  saveUserDb: async (userData) => {
    try {
      const response = await User.create(userData);
      return response;
    } catch (error) {
      console.error("Failed to save users to db:", error);
      throw error;
    }
  },

  updateUserDb: async (userId, userData) => {
    try {
      const filter = { id: userId };
      const update = {
        $set: {
          name: userData.name,
          job: userData.job,
        },
      };
      const result = await User.updateOne(filter, update);
      const updatedUser = await User.findOne(filter);
      return { matchedCount: result.matchedCount, updatedUser: updatedUser };
    } catch (error) {
      console.error("Failed to save user to db:", error);
      throw error;
    }
  },

  deleteUserDb: async (userId) => {
    try {
      const filter = { id: userId };
      const result = await User.deleteOne(filter);
      return result.deletedCount;
    } catch (error) {
      console.error("Failed to save user to db:", error);
      throw error;
    }
  },
};

module.exports = UserRepository;
