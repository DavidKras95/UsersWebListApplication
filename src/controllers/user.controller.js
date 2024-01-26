const UserService = require('../services/user.service');

const UserController = {

  getUsers: async (req, res) => {
    try {
      const page = req.params.page;
      console.log("in Cotroller")
      const users = await UserService.getUsers(page);
      res.json(users);
    }
    catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  getUser: async (req, res) => {
    const userId = req.params.id;
    try {
      const user = await UserService.getUser(userId);
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
      res.json(user);
    }
     catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  createUser: async (req, res) => {
    const userData = req.body;
    try {
      const newUser = await UserService.createUser(userData);
      res.status(201).json(newUser);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  updateUser: async (req, res) => {
    const userId = req.params.id;
    const updatedUserData = req.body;
    try {
      const updatedUser = await UserService.updateUser(userId, updatedUserData);
      if (!updatedUser) {
        return res.status(404).json({ error: 'User not found' });
      }
      res.json(updatedUser);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  deleteUser: async (req, res) => {
    const userId = req.params.id;
    console.log(`Received DELETE request in contorller`);
    
    try {
        const deletedUser = await UserService.deleteUser(userId);
        if (!deletedUser) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.json({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
},
};

module.exports = UserController;
