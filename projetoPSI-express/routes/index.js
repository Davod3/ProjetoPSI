var express = require('express');
var router = express.Router();

const authentication_controller = require('../controllers/authController');
const user_controller = require('../controllers/userController');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/login', function(req, res, next) {
  user_controller.login(req, res, function(err, result) {
    if (err) {
      console.error("Error occurred: ", err);
      return next(err);
    }

    console.log("Authentication successful for user ", result.username);
    res.send(result);
  });
});

router.post('/authenticate', authentication_controller.register);

module.exports = router;

