const Customer = require("../model/customers");
var express = require("express");
var mongoose = require("mongoose");
var router = express.Router();
const DealBoughts = require("../model/dealboughts");
const nodemailer = require("nodemailer");
const hbs = require("nodemailer-express-handlebars");
const handlebars=require('handlebars');
const fs = require('fs');
const isAuth = require("../middleware/auth");
var router = express.Router();
var readHTMLFile = function(path, callback) {
  fs.readFile(path, {encoding: 'utf-8'}, function (err, html) {
      if (err) {
          throw err;
          callback(err);
      }
      else {
          callback(null, html);
      }
  });
};

router.post("/create",isAuth, async function (req, res) {
  try {
    const customers = new Customer({
      fname: req.body.fname,
      lname: req.body.lname,
      email: req.body.email,
      phone: req.body.phone,
      createrid: req.body.createrid,
      invitelink: req.body.invitelink,
    });
    const newcustomer = await customers.save();
    //email code start
    let testAccount = await nodemailer.createTestAccount();

        // create reusable transporter object using the default SMTP transport
      let transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT,
        secure: true, // true for 465, false for other ports
        auth: {
          user: process.env.SMTP_USERNAME, // generated ethereal user
          pass: process.env.SMTP_PASS, // generated ethereal password
        },
      });
      readHTMLFile('/home/ubuntu/services/myapp/views/emails/customer-invitation-to-mobile-app-email.handlebars',async function(err, html) {
        var template = handlebars.compile(html);
        var replacements = {
            fname: req.body.fname,
            lname: req.body.lname,
        };
        console.log(process.env.SMTP_USERNAME);
        var htmlToSend = template(replacements);
        let info = await transporter.sendMail({
          from: 'no-reply@momnpophub.com', // sender address
          to: '"'+req.body.email+'"', // list of receivers
          subject: "Invitation to join", // Subject line
          text: "invitation to join", // plain text body
          html : htmlToSend
        });
        console.log("Message sent: %s", info.messageId);
          
          
      });
      // email code ends
    res.status(200).json(newcustomer);
  } catch (err) {
    res.status(401).json({ message: "bad request " + err });
  }
});

router.post("/sendmassinvite",isAuth, async function (req, res) {
  var userArray = req.body.users;
  //email code start

  let testAccount = await nodemailer.createTestAccount();

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: true, // true for 465, false for other ports
    auth: {
      user: process.env.SMTP_USERNAME, // generated ethereal user
      pass: process.env.SMTP_PASS, // generated ethereal password
    },
  });
  for(let i = 0;i < userArray.length;i++){
    
      readHTMLFile('/home/ubuntu/services/myapp/views/emails/customer-invitation-to-mobile-app-email.handlebars',async function(err, html) {
        var template = handlebars.compile(html);
        var replacements = {
            fname: userArray[i].fname,
            lname: userArray[i].lname,
        };
        console.log(process.env.SMTP_USERNAME);
        var htmlToSend = template(replacements);
        let info = await transporter.sendMail({
          from: 'no-reply@momnpophub.com', // sender address
          to: '"'+userArray[i].email+'"', // list of receivers
          subject: "Invitation to join", // Subject line
          text: "invitation to join", // plain text body
          html : htmlToSend
        });
        console.log("Message sent: %s", info.messageId);
          
          
      });
  }
  res.status(200).json({"message":"All send"});
});

router.put("/update/:id",isAuth, async function (req, res, next) {
  try {
    await Customer.findByIdAndUpdate(
      req.params.id,
      {
        fname: req.body.fname,
        lname: req.body.lname,
        email: req.body.email,
        phone: req.body.phone,
      },
      function (err, doc) {
        if (err) {
          res.status(404).send("error " + err);
        } else {
          res.status(200).json({"message":"Data updated successfully"});
        }
      }
    );
  } catch (err) {
    res.status(404).json({ "message": "data not found" });
  }
});

router.get("/list", async function (req, res) {
  try {
    const customerlist = await Customer.find();
    res.status(200).json(customerlist);
  } catch (err) {
    res.status(401).json({ message: "bad request " + err });
  }
});

router.get("/findbycreater/:id",isAuth,async function(req,res){
  if (mongoose.Types.ObjectId.isValid(req.params.id)) {
    await Customer.find({
      createrid: new mongoose.Types.ObjectId(req.params.id),
    }).exec(function (err, customers) {
      if(err){
        res.status(404).json({message:"error"+err});
      }
      if (customers.length > 0) {
        console.log(customers);
        res.status(200).json(customers);
      } else {
        res.status(404).json({ message: "Customer not found" });
      }
    });
  } else {
    res.status(404).json({ message: "not valid userid" });
  }
});

module.exports = router;