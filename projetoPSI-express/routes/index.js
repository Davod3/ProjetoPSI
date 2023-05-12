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

router.get("/users", user_controller.user_list);

router.post('/register', authentication_controller.register);

router.get("/item/:id", item_controller.item_detail);

router.get("/user/:id", user_controller.user_profile);

router.get("/user/username/:username", user_controller.user_by_name);

router.post("/user/edit/:id", user_controller.update_profile);

router.get("/user/lists/:id", user_controller.user_lists);

router.get("/user/following/:id", user_controller.user_following);

router.get("/user/followers/:id", user_controller.user_followers);

router.get("/user/library/:id", user_controller.user_library);

router.get("/user/:userId/cart", user_controller.getUserCart);

router.get("/user/wishlist/:id", user_controller.user_wishlist);

router.put("/user/cart/add", user_controller.addItemToCart);

router.put('/user/:userId/cart/increment', user_controller.incrementItemQuantity);

router.put('/user/:userId/cart/decrement', user_controller.decrementItemQuantity);

router.delete('/user/:userId/cart/:itemId', user_controller.removeItemFromCart);

router.delete('/user/:userId/cart', user_controller.clearCart);

router.put('/user/following/:id', user_controller.addFollowing);

router.put('/user/checkout/:id', user_controller.checkout);

module.exports = router;

