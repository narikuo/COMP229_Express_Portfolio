let express = require("express");
let router = express.Router();
let mongoose = require("mongoose");

// connect to our Book Model
let Contact = require("../models/business_contact");

/* GET Route for the Book List page - READ OPeration */
router.get("/", (req, res, next) => {
    Contact.find((err, contactsList) => {
    if (err) {
      return console.error(err);
    } else {
      console.log(contactsList);
      //res.render("contacts/business-contacts", { title: "Business Contact", ContactList: contactsList });
      res.render("business/list", { title: "Business Contact", ContactList: contactsList });
      //render book.ejs and pass title and Contact variable we are passing contactList object to BookList property
    }
  });
});

/* GET Route for displaying the Add page - CREATE Operation */
router.get("/add", (req, res, next) => {
    Contact.find((err, contactsList) => {
    if (err) {
      return console.error(err);
    } else {
      console.log(contactsList);
      res.render("business/add", { title: "Business Contact", ContactList: contactsList });
      //render book.ejs and pass title and Contact variable we are passing contactList object to BookList property
    }
  });
});

module.exports = router;