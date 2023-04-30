var express = require('express');
var router = express.Router();

const authentication_controller = require('../controllers/authController');
const user_controller = require('../controllers/userController');
const item_controller = require('../controllers/itemController');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/login', authentication_controller.login);

router.get("/items", item_controller.item_list);

router.post('/register', authentication_controller.register);

router.get("/item/:id", item_controller.item_detail);

router.get("/user/:id", user_controller.user_profile);

router.get("/user/lists/:id", user_controller.user_lists);

router.get("/user/following/:id", user_controller.user_following);

router.get("/user/followers/:id", user_controller.user_followers);

router.get("/user/library/:id", user_controller.user_library);

module.exports = router;

