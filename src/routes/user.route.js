const express = require('express');
const UserController = require('../controllers/user.controller');

const AuthController = require('../controllers/auth.controller');



const router = express.Router();

router.get('/getUsers/:page', UserController.getUsers);
router.get('/getUser/:id', UserController.getUser);
router.post('/createUser/?', UserController.createUser); 
router.put('/updateUser/:id', UserController.updateUser);
router.delete('/deleteUser/:id', UserController.deleteUser); 

router.post('/login/?', AuthController.login);
router.post('/register/?', AuthController.register); 



module.exports = router;
