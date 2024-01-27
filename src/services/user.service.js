
const axios = require('axios').default

const UserService = {

    getUsers: async (page) => {
        try {
            const response = await axios.get(`https://reqres.in/api/users?page=${page}`);
            return response.data.data;
        }
        catch (error) {
            console.log(error);
            throw error; 
        }
    },
  
    getUser: async (userId) => {
        try {
            const response = await axios.get(`https://reqres.in/api/users?id=${userId}`);
            return response.data.data;
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
            const response = await axios.delete(`https://reqres.in/api/users/${userId}`);
            return response.status;
        } catch (error) {
            console.error('Error deleting user:', error);
            throw error;
        }
    }
  };

  module.exports = UserService;
  