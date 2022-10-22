let express = require("express");
let router = express.Router();
let mongoose = require("mongoose");

//create reference to the model (dbschema )
let Contact = require("../models/business_contact");

module.exports.displayContactList = (req, res, next) => {
    //for sorted list of contacts
    Contact.find().sort({contact_name:1}).exec(
      function(err, contactsList){
        if (err) {
            return console.error(err);
        } else {
            console.log(contactsList);
            res.render("business/list", { 
                title: "Business Contact", 
                ContactList: contactsList,
                displayName: req.user ? req.user.displayName : ""
            });
            
        }
    });
    /**
    Contact.find((err, contactsList) => {
        if (err) {
            return console.error(err);
        } else {
            console.log(contactsList);
            res.render("business/list", { 
                title: "Business Contact", 
                ContactList: contactsList,
                displayName: req.user ? req.user.displayName : ""
            });
            
        }
    });
    */
};

module.exports.addpage = (req, res, next) => {
  res.render("business/add", {
    title: "Add New Contact",
    displayName: req.user ? req.user.displayName : "",
  });
};

module.exports.addprocesspage = (req, res, next) => {
  let newContact = Contact({
    contact_name: req.body.contact_name,
    contact_number: req.body.contact_number,
    email: req.body.email,
  });
  Contact.create(newContact, (err, Contact) => {
    if (err) {
      console.log(err);
      res.end(err);
    } else {
      // refresh the contact list
      res.redirect("/business");
    }
  });
};

module.exports.displayeditpage = (req, res, next) => {
  let id = req.params.id; //id of actual object

  Contact.findById(id, (err, contacttoedit) => {
    if (err) {
      console.log(err);
      res.end(err);
    } else {
      //show the edit view
      res.render("business/edit", {
        title: "Edit Contact",
        contact: contacttoedit,
        displayName: req.user ? req.user.displayName : "",
      });
    }
  });
};

module.exports.processingeditpage = (req, res, next) => {
  let id = req.params.id; //id of actual object

  let updatecontact = Contact({
    _id: id,
    contact_name: req.body.contact_name,
    contact_number: req.body.contact_number,
    email: req.body.email,
  });
  Contact.updateOne({ _id: id }, updatecontact, (err) => {
    if (err) {
      console.log(err);
      res.end(err);
    } else {
      //refresh the book list
      res.redirect("/business");
    }
  });
};

module.exports.deletepage = (req, res, next) => {
  let id = req.params.id;
  Contact.remove({ _id: id }, (err) => {
    if (err) {
      console.log(err);
      res.end(err);
    } else {
      //refresh book list
      res.redirect("/business");
    }
  });
};
