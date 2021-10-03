var express = require("express");
var mongoose = require("mongoose");
const Fav = require("../model/fav");
var router = express.Router();
const isAuth = require("../middleware/auth");
router.post("/add",isAuth, async function (req, res, next) {
	try{
	  	const fav = new Fav({
	      userid: req.body.userid,
	      couponid: req.body.couponid,
		});
		const newdeal = await fav.save();
    	res.status(200).json({message:"success"});
  	}catch(err){
  		res.status(401).json({message:"badrequest " + err});
  	}

});
module.exports = router;