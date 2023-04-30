var express = require('express');
var router = express.Router();

const authentication_controller = require('../controllers/authController');
const user_controller = require('../controllers/userController');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/login', authentication_controller.login);

router.post('/register', authentication_controller.register);

module.exports = router;

