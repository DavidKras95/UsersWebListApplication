
const axios = require('axios').default

const UserService = {

    getUsers: async (page) => {
        try {
            const response = await axios.get(`https://reqres.in/api/users?page=${page}`);
            return response.data;
        }
        catch (error) {
            console.log(error);
            throw error; 
        }
    },
  
    getUser: async (userId) => {
        try {
            const response = await axios.get(`https://reqres.in/api/users?id=${userId}`);
            return response.data;
        }
        catch (error) {
            console.log(error);
            throw error; 
        }

    },
  
    createUser: async (userData) => {
        try {
            const response = await axios.post(`https://reqres.in/api/users`, {
                name: userData.name,
                job: userData.job
            });
            return response.data;
        }
        catch (error) {
            console.log(error);
            throw error; 
        }

    },

    updateUser: async (userId, updatedUserData) => {
        try {
            const response = await axios.put(`https://reqres.in/api/users/${userId}`, {
                name: updatedUserData.name,
                job: updatedUserData.job
            });
            return response.data;
        } catch (error) {
            console.log(error);
            throw error;
        }
    },

    deleteUser: async (userId) => {
        try {
            console.log(`Received DELETE in service`);
            const response = await axios.delete(`https://reqres.in/api/users/${userId}`);
            console.log("respose");
            console.log(response);
            console.log("respose");
            return response.data;
        }
        catch (error) {
            console.log(error);
            throw error; 
        }
    },
  };

  module.exports = UserService;
  