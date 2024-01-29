const express = require('express');
const UserController = require('../controllers/user.controller');
const AuthController = require('../controllers/auth.controller');
const JwtAuth = require('../middleware/jwtAuth')
const router = express.Router();

router.get('/getUsers/:page', JwtAuth.cookieJwtAuth, UserController.getUsers);
router.get('/getUser/:id', JwtAuth.cookieJwtAuth, UserController.getUser);
router.post('/createUser/?', JwtAuth.cookieJwtAuth, UserController.createUser); 
router.put('/updateUser/:id',JwtAuth.cookieJwtAuth, UserController.updateUser);
router.delete('/deleteUser/:id',JwtAuth.cookieJwtAuth, UserController.deleteUser); 
router.post('/login/?', AuthController.login);
router.post('/register/?', AuthController.register); 


router.post('/chooseRoute', (req, res) => {
    const { idBox, textBox, routeSelect } = req.body;
    if (['/login', '/register','/createUser','/updateUser'].includes(routeSelect)) {
     const parsedData = JSON.parse(textBox);
      console.log(parsedData);
      switch (routeSelect) {
        case '/login':
            AuthController.login({ body: parsedData }, res);
            break;
        case '/register':
            AuthController.register({ body: parsedData }, res);
            break;
        case '/updateUser':
            JwtAuth.cookieJwtAuth(req, res, () => {
                UserController.updateUser({ params: { id: idBox }, body: parsedData }, res);
            });
            break;
        case '/createUser':
            JwtAuth.cookieJwtAuth(req, res, () => {
                UserController.createUser({ body: parsedData }, res);
            });
            break;
        default:
          res.send('Invalid selection');
      }
    } else {
      switch (routeSelect) {
        case '/getUsers/1':
          res.redirect(`/getUsers/${idBox}`);
          break;
        case '/getUser/1':
          res.redirect(`/getUser/${idBox}`);
          break;
        case '/deleteUser/1':
            const userId = idBox;
            JwtAuth.cookieJwtAuth(req, res, () => {
            UserController.deleteUser({ params: { id: userId } }, res);
            });
        break;
        default:
          res.send('Invalid selection');
      }
    }
  });
  
module.exports = router;


