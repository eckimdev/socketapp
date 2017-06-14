var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Home Express' });
});

router.get('/chat', function(req, res, next) {
  res.render('chat', { title: 'Chat Express' });
});

module.exports = router;
