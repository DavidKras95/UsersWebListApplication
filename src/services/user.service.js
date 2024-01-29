
const UserRepository = require('../repository/user.repository');
const UserService = {

    getUsers: async (page) => {
        try {
            const cachedUsers = await UserRepository.getUsersDb(page);
            if (cachedUsers.length > 0) {
                console.log('Data found in MongoDB');
                return cachedUsers;
            }
            console.log('Fetching From API');
            try {
                const users = await UserRepository.getUsersApi(page);
                if (users.data.length === 0) {
                    const customError = new Error(`No users found for the specified page.`);
                    customError.status = 404;
                    throw customError;
                }
                console.log("Save users page to db");
                const responseSaveUsers = await UserRepository.saveUsersPageDb(users);
    
                console.log("Save each user to db");
                for (const user of users.data) {
                    const responseSaveUser = await UserRepository.saveUserDb(user);
                }
                return users.data;
            } catch (error) {
                console.error(error);
                throw error;
            }
        } catch (error) {
            console.log(error);
            throw error;
        }
    },
    
    getUser: async (userId) => {
        try {
            console.log("Search user in db")
            const cachedUser = await UserRepository.getUserByIdDb(userId);
            console.log("Search user in db")
            if (cachedUser) {
                console.log('Data found in MongoDB');
                return cachedUser;
            }

            console.log('Fetching From API');
            const user = await UserRepository.getUserApi(userId);
            if (!user ) {
                const errors = { erromMassege: 'User was not found' };
                return errors;
            }
            console.log("Save to db")
            await UserRepository.saveUserDb(user);
            return user;
        } catch (error) {
            console.log(error);
            throw error;
        }
    },
  
    createUser: async (userData) => {
        try {
            console.log("Create user to API");
            const userDataApiResponse = await UserRepository.createUserApi(userData);
            console.log("Save user to DB");
            await UserRepository.saveUserDb(userDataApiResponse);
            console.log("User created successfully");
            return userDataApiResponse;
        } catch (error) {
            console.log(error);
            throw error;
        }
    },

    updateUser: async (userId, updatedUserData) => {
        try {
            console.log('Check if user exists in API');
            const user = await UserRepository.getUserApi(userId);
            if (!user ) {
                const errors = { erromMassege: `User with id ${userId} dosn't exist` };
                return errors;
            }
            else{
                console.log('Update in API');
                const responseUpdateUserApi = await UserRepository.getUserApi(userId, updatedUserData);
                
                const userDb = await UserRepository.getUserByIdDb(userId);
                console.log('Check user in db')
                if (!userDb) {
                    console.log('User not found in db, create new one')
                    updatedUserData.id = userId;
                    await UserRepository.saveUserDb(updatedUserData);

                }
                else{
                    updateUserDbResult = await UserRepository.updateUserDb(userId,updatedUserData);
                    console.log(updatedUserData);

                    if(updateUserDbResult.matchedCount === 1) return updateUserDbResult.updatedUser;
                    else{
                        const errors = { erromMassege: `Failed to update user` };
                        return errors;
                    } 
                }
            }

        } catch (error) {
            console.log(error);
            throw error;
        }
    },

    deleteUser: async (userId) => {
        try {
            console.log('Check if user exists in API');
            const user = await UserRepository.getUserApi(userId);
            if (!user ) {
                const errors = { erromMassege: `User with id ${userId} dosn't exist` };
                return errors;
            }
            else{
                console.log('Delet from API');
                const responseDeleteUserApi = await UserRepository.deleteUserApi(userId);
                
                const userDb = await UserRepository.getUserByIdDb(userId);
                console.log('Check user in db')
                if (!userDb) {
                    console.log('User not found in db, create new one')
                    return responseDeleteUserApi;
                }
                else{
                    deleteUserDbResult = await UserRepository.deleteUserDb(userId);
                    if(deleteUserDbResult == 1) return responseDeleteUserApi;
                    else{
                        const errors = { erromMassege: `Failed to delete user` };
                        return errors;
                    } 
                }
            }

        } catch (error) {
            console.log(error);
            throw error;
        }
    }

  };

  module.exports = UserService;
  