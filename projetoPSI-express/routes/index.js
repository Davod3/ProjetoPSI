var express = require('express');
var router = express.Router();

const authentication_controller = require('../controllers/authController');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/authenticate', authentication_controller.register);

module.exports = router;
