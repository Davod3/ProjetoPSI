var express = require('express');
var router = express.Router();

const authentication_controller = require('../controllers/authController');
const item_controller = require('../controllers/itemController');
const user_controller = require('../controllers/userController');

/* GET home page. */
router.post('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/login', user_controller.login);

router.get('/login', function(req, res, next) {
  res.render('login', { title: 'Login' });
});

router.post('/authenticate', authentication_controller.register);

// router.get("/items", item_controller.item_list);
router.get("/items", function (req, res) {
  res.send("NOT IMPLEMENTED");
});

router.get("/item/:id", item_controller.item_detail);

router.get("/profile/:id", user_controller.user_profile);

module.exports = router;

