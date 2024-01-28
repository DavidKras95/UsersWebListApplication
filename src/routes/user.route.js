const express = require('express');
const UserController = require('../controllers/user.controller');

const router = express.Router();

router.get('/getUsers/:page', UserController.getUsers);
router.get('/getUser/:id', UserController.getUser);
router.post('/createUser/?', UserController.createUser); 
router.put('/updateUser/:id', UserController.updateUser);
router.delete('/deleteUser/:id', UserController.deleteUser); 

module.exports = router;
