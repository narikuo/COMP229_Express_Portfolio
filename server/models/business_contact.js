let express = require("express");
let router = express.Router();
let mongoose = require("mongoose");

//create a model class
let contactModelSchema = mongoose.Schema(
    {
        contact_name: String,
        contact_number: String,
        email: String
    }
    ,{
        collection : "business_contact"
    }
);

module.exports = mongoose.model("contactModel", contactModelSchema);