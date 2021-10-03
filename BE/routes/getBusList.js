var express = require("express");
var mongoose = require("mongoose");
const fs = require('fs');
var router = express.Router();

const User = require("../model/users");
const Userprofile = require("../model/userprofiles");
const Coupon = require("../model/coupons");
const { query } = require("express");

router.post("/", function (req, res) {
    var keyword = req.body.keyword;
    console.log("********* Searching By the Keyword : " + keyword);
    var query = Userprofile.find({ "bname": { '$regex' : keyword, '$options' : 'i' } });
    //db.collection.find( { "name" : { $regex : new RegExp(thename, "i") } } );
    query.select('_id bname btype');
    query.limit(20);
    query.exec(function (err, users) {
        res.send(users);
    });
});

module.exports = router;