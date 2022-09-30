var express = require('express');
var router = express.Router();

var parseUrl = require('body-parser')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Home' });
});

router.get('/about-me', function(req, res, next) {
  res.render('index', { title: 'About Me' });
});

router.get('/projects', function(req, res, next) {
  res.render('index', { title: 'Projects' });
});

router.get('/services', function(req, res, next) {
  res.render('index', { title: 'Services' });
});

router.get('/contact-me', function(req, res, next) {
  res.render('index', { title: 'Contact Me' });
});

//Get form data from contact me
router.post('/', function(req, res, next) {
  console.log('-----> Message Form request: \nName: ', req.body.yourNameInput,
                ', Mail: ', req.body.yourMailInput,
                ', Phone: ', req.body.yourPhoneInput,
                ', \nMessage: ', req.body.messageTextarea)
  res.render('index', { title: 'Home' });
  
})

module.exports = router;
