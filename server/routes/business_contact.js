let express = require("express");
let router = express.Router();
let mongoose = require("mongoose");

// connect to our Contact Model
//let Contact = require("../models/business_contact");
let businessController = require("../controllers/business");

// helper function for guard purposes
function requireAuth(req, res, next) {
  // check if the user is logged in
  if (!req.isAuthenticated()) {
    return res.redirect("/login");
  }
  next();
}


/* GET Route for the Book List page - READ Operation */
router.get("/", businessController.displayContactList);

/* GET Route for displaying the Add page - CREATE Operation */
router.get("/add", requireAuth, businessController.addpage);

/* POST Route for processing the Add page - CREATE Operation */
router.post("/add", requireAuth, businessController.addprocesspage);

/* GET Route for displaying the Edit page - UPDATE Operation */
router.get("/edit/:id", requireAuth, businessController.displayeditpage);

/* POST Route for processing the Edit page - UPDATE Operation */
router.post("/edit/:id", requireAuth, businessController.processingeditpage);

/* GET to perform  Deletion - DELETE Operation */
router.get("/delete/:id", requireAuth, businessController.deletepage);

module.exports = router;