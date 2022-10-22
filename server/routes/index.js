var express = require('express');
var router = express.Router();

var parseUrl = require('body-parser')
let indexController = require("../controllers/index");

/* GET home page. */
router.get("/", indexController.displayHomepage);

/* GET home page. */
router.get("/home", indexController.displayHomepage);

/* GET About Us page. */
router.get("/about-me", indexController.displayaboutpage);

/* GET Products page. */
router.get("/projects", indexController.displayproductpage);

/* GET Services page. */
router.get("/services", indexController.displayservicespage);

/* GET Contact ME page. */
router.get("/contact-me", indexController.displayContactpage);

/* POST Contact ME page. */
router.post("/contact-me", indexController.processContactPage);

//for Login process
/* GET Route for displaying the Login page */
router.get("/login", indexController.displayLoginPage);

/* POST Route for processing the Login page */
router.post("/login", indexController.processLoginPage);

/* GET Route for displaying the Register page */
router.get("/register", indexController.displayRegisterPage);

/* POST Route for processing the Register page */
router.post("/register", indexController.processRegisterPage);

/* GET to perform UserLogout */
router.get("/logout", indexController.performLogout);



module.exports = router;
