const Coupon = require("../model/coupons");
var express = require("express");
var mongoose = require("mongoose");
const User = require("../model/users");
const Fav = require("../model/fav");
const Userprofile = require("../model/userprofiles");
const DealBoughts = require("../model/dealboughts");
const Customer = require("../model/customers");
const nodemailer = require("nodemailer");
const hbs = require("nodemailer-express-handlebars");
const isAuth = require("../middleware/auth");
const handlebars=require('handlebars');
const fs = require('fs');
const { info } = require("console");
const awsregion = process.env.AWS_REGION;
const awsAccessid = process.env.AWS_ACCESS_KEY;
const awsSecretid = process.env.AWS_SECRET_KEY;
// const aws = require('aws-sdk');
const moment = require('moment');
// const s3 = aws.S3({
//   awsregion,
//   awsAccessid,
//   awsSecretid
// });
const multer = require('multer');
const multers3 = require('multer-s3');
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
/* GET home page. */
router.post("/create",isAuth, async function (req, res) {
  try {
    const coupons = new Coupon({
      name: req.body.name,
      codetype: req.body.codetype,
      available: req.body.available,
      description: req.body.description,
      redeemed: req.body.redeemed,
      startdate: req.body.startdate,
      enddate: req.body.enddate,
      expirydate: req.body.expirydate,
      qrcode: req.body.qrcode,
      serviceorproduct: req.body.serviceorproduct,
      status: 1,
      publishdate: req.body.publishdate,
      showcode: req.body.showcode,
      userid: req.body.userid,
      price:req.body.price,
      originalprice: req.body.originalprice
    });
    const newcoupon = await coupons.save();
    //email code start
    if(newcoupon){
    let testAccount = await nodemailer.createTestAccount();
    var userprof = await Userprofile.find({"userid":req.body.userid}).populate({ path: "userid" });
      if(userprof.length>0){
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
      readHTMLFile('/home/ubuntu/services/myapp/views/emails/business-deal-added-confirmation.handlebars',async function(err, html) {
        var template = handlebars.compile(html);
        var replacements = {
            fname: userprof[0]['fname'],
            lname: userprof[0]['lname'],
        };
        console.log(process.env.SMTP_USERNAME);
        var htmlToSend = template(replacements);
        let info = await transporter.sendMail({
          from: 'no-reply@momnpophub.com', // sender address
          to: '"'+userprof[0]['userid']['email']+'"', // list of receivers
          subject: "New Deal Added to Momnpophub ", // Subject line
          text: "Hello world?", // plain text body
          html : htmlToSend
        });
        console.log("Message sent: %s", info.messageId);
          // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

          // Preview only available when sending through an Ethereal account
          if(info.messageId.length > 0){
            //Another loop of emails
            var customersdata = await Customer.find({createrid:req.body.userid});
            //console.log(customersdata);
            if(customersdata.length > 0){
              if(userData.length > 0){
              customersdata.forEach(async (ele)=>{
                var temp = await User.find({email:ele,email});
                if(temp.length>0){
                  var tempProfile = await Userprofile.find({userid:temp[0]['_id']});
                  if(tempProfile.length > 0){
                    if(tempProfile[0]['subscribed'] == "1"){
                      readHTMLFile('/home/ubuntu/services/myapp/views/emails/customer-deal-email-from-a-business.handlebars',async function(err, html) {
                        var template = handlebars.compile(html);
                        var replacements = {
                            bname: userprof[0]['bname'],
                            // lname: ele.lname,
                        };
                        console.log(process.env.SMTP_USERNAME);
                        var htmlToSend = template(replacements);
                        let info = await transporter.sendMail({
                          from: 'no-reply@momnpophub.com', // sender address
                          to: '"'+ele.email+'"', // list of receivers
                          subject: "New Deal Added to Momnpophub ", // Subject line
                          text: "New deal added", // plain text body
                          html : htmlToSend
                        });
                        console.log("Message sent: %s", info.messageId);
                    });
                    }
                  }
                }
                
            });
            res.status(200).json({newcoupon});
          }else{
            res.status(200).json({newcoupon});
          }
            }else{
              res.status(200).json({newcoupon});
            }
          }else{
            res.status(404).json({ message: "Email not send"});
          }
        });
        
      }else{
        res.status(404).json({ message: "User details not found" });
      }
    }else{
      res.status(404).json({ message: "Deal not saved" });
    }
    //res.status(200).json(newcoupon);
  } catch (err) {
    res.status(401).json({ message: "bad request " + err });
  }
});
router.get("/list", async function (req, res, next) {
  try {
    const datalist = await Testtable.find();
    //console.log(datalist)
    res.json(datalist);
  } catch (err) {
    res.status(500).json({ message: "data not found " + err });
  }
});

router.get("/", async function (req, res, next) {
  await Coupon.find()
    .populate({ path: "userid" })
    .exec(function (err, users) {
      res.send(users);
    });
});

router.get("/findallonline", async function (req, res, next) {
  await Coupon.find({codetype:"online"})
    .populate({ path: "userid" })
    .exec(function (err, users) {
      res.send(users);
    });
});

router.get("/findalloffline", async function (req, res, next) {
  await Coupon.find({codetype:"offline"})
    .populate({ path: "userid" })
    .exec(function (err, users) {
      res.send(users);
    });
});

router.get("/findbyusers/:id", async function (req, res, next) {
  try{
  if (mongoose.Types.ObjectId.isValid(req.params.id)) {
    var coupons = await Coupon.find({
      $and:[
        {userid: req.params.id},
        {startdate : { $lte : new Date() }},
        {expirydate : { $gte : new Date() }},
      ]
    });
      console.log(coupons);
      if (coupons.length == 0 ) {
        var userprofileid = await Userprofile.find({
          _id : req.params.id,
        });
        if(userprofileid.length > 0){
          coupons = await Coupon.find({
            $and:[
              {userid: userprofileid[0]['userid']},
              {startdate : { $lte : new Date() }},
              {expirydate : { $gte : new Date() }},
            ]
          });
          if (coupons.length >0 ) {
            res.status(200).json(coupons);
          }else{
            res.status(404).json({ message: "Coupons not found" });
          }

        }else{
          res.status(404).json({ message: "Coupons not found" });
        }
        
      } else {
        res.status(200).json(coupons);
      }
    
  } else {
    res.status(404).json({ message: "not valid userid" });
  }
}catch(err){
  res.status(404).json(err);
}
});

router.get("/findbyusersweb/:id",isAuth, async function (req, res, next) {
  if (mongoose.Types.ObjectId.isValid(req.params.id)) {
    console.log(new Date());
    await Coupon.find({
      $and:[
        {userid: new mongoose.Types.ObjectId(req.params.id)},
        
      ]
    }).exec(function (err, users) {
      console.log(users);
      
      if (users) {
        res.status(200).json(users);
      } else {
        res.status(404).json({ message: "Coupons not found" });
      }
    });
  } else {
    res.status(404).json({ message: "not valid userid" });
  }
});

router.get("/:id", async function (req, res, next) {
  try {
    const coupondatas = await Coupon.findById(req.params.id);
    res.json(coupondatas);
  } catch (err) {
    res.status(404).json({ message: "coupon not found" });
  }
});
router.put("/updatestatus/:id/:status",isAuth, async function (req, res, next) {
  try {
    await Coupon.findByIdAndUpdate(
      req.params.id,
      { 
        status: req.params.status
      },
      function (err, doc) {
        if (err) {
          res.send("error " + err);
        } else {
          res.json(doc);
        }
      }
    );
  } catch (err) {
    res.status(404).json({ message: "coupon not found" });
  }
});

router.put("/update/:id",isAuth, async function (req, res, next) {
  try {
    await Coupon.findByIdAndUpdate(
      req.params.id,
      {
        name: req.body.name,
        description: req.body.description,
        startdate: req.body.startdate,
        enddate: req.body.enddate,
        expirydate: req.body.expirydate,
        publishdate: req.body.publishdate,
        price:req.body.price,
        originalprice: req.body.originalprice 
      },
      function (err, doc) {
        if (err) {
          res.status(404).send("error " + err);
        } else {
          res.status(200).json(doc);
        }
      }
    );
  } catch (err) {
    res.status(404).json({ message: "coupon not found" });
  }
});

router.get("/findfav/:id",isAuth, async function (req, res, next) {
  try {
    const coupondatas = await Fav.find({userid:req.params.id});
    if(coupondatas.length > 0){
      var couponListArray = [];
      coupondatas.forEach(elements => {
        //console.log(elements.couponid);
        couponListArray.push(elements.couponid);
      });
      //console.log(couponListArray);
      const coupons = await Coupon.find({
        $and:[
          {_id:{$in:Array.from(new Set(couponListArray))}},
          {startdate : { $lte : new Date() }},
          {expirydate : { $gte : new Date() }},
        ]
      });
      res.json(coupons);
    }else{
      res.status(404).json({ message: "No Fav found" });
    }
  } catch (err) {
    res.status(404).json({ message: "coupon not found" });
  }
});

router.post("/dealboughts",isAuth, async function (req, res, next) {
  try{
      const dealb = new DealBoughts({
        userid: req.body.userid,
        couponid: req.body.couponid,
        status: "0",
    });
    const data = await dealb.save();
    //console.log("oldlength = " + data);
    if(data){
      const dealData = await Coupon.find({_id:req.body.couponid});
      
      if(dealData.length>0){
        const businessData = await Userprofile.find({userid:dealData[0]['userid']}).populate({ path: "userid" });
        const userdetails = await User.find({_id:req.body.userid});
        const userprofileData = await Userprofile.find({userid:req.body.userid});
        //console.log("length = "+userdetails);
        if(userdetails.length>0){
        // -------email code starts----------
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
        console.log(businessData);
        readHTMLFile('/home/ubuntu/services/myapp/views/emails/customer-deal-purchase-email.handlebars',async function(err, html) {
          var expired = moment(dealData[0]['expirydate']);
          var endd = moment(dealData[0]['enddate']);
          var template = handlebars.compile(html);
          var replacements = {
              fname: userprofileData[0]['fname'],
              lname: userprofileData[0]['lname'],
              dname: dealData[0]['name'],
              description: dealData[0]['description'],
              originalprice: dealData[0]['originalprice'],
              price: dealData[0]['price'],
              enddate: endd.format("MMM DD ,YYYY"),
              expirydate: expired.format("MMM DD ,YYYY"),
              codetype: businessData[0]['codetype'] == "offline" ?false:true,
              address: businessData[0]['baddress'],
              website: businessData[0]['website']
          };
          console.log(process.env.SMTP_USERNAME);
          var htmlToSend = template(replacements);
          let info = await transporter.sendMail({
            from: 'no-reply@momnpophub.com', // sender address
            to: '"'+userdetails[0]['email']+'"', // list of receivers
            subject: "Deal purchased ", // Subject line
            text: "Welcome to Momnpophub?", // plain text body
            html : htmlToSend
          });
          console.log("Message sent: %s", info.messageId);
            // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

            // Preview only available when sending through an Ethereal account
            
          });
    // ----------email code ends---------
        res.status(200).json({message:"success",address:businessData[0]['baddress'],website:businessData[0]['website']});
        }else{
          res.status(404).json({message:"User not found"});
        }
      }else{
        res.status(404).json({message:"Deal id not found"});
      }
    }else{
      res.status(404).json({message:"Data not stored"});
    }
    
    }catch(err){
      res.status(401).json({message:"badrequest " + err});
    }

});
router.get("/finddealsboughts/:id",isAuth, async function (req, res, next) {
  try {
    const coupondatas = await DealBoughts.find({userid:req.params.id});
    if(coupondatas.length > 0){
      var couponListArray = [];
      var couponListDate = [];
      coupondatas.forEach(elements => {
        //console.log(elements.couponid);
        if(mongoose.Types.ObjectId.isValid(elements.couponid)){
          couponListArray.push(elements.couponid);
          couponListDate.push(elements.date);
        }
        
      });
      //console.log(couponListArray);
      const coupons = await Coupon.find({_id:{$in:Array.from(new Set(couponListArray))}});
      var final = [];
      if(coupons.length > 0){
        var len = coupons.length;
        //console.log("length = "+ len);
        coupons.forEach(async (elements,i) => {
          var temp = await Userprofile.find({userid:elements.userid});
          elements.date = couponListDate[i];
          //console.log(elements)
          if(temp.length > 0){
            var tobject = {
              'coupondata' : elements,
              'businessdata' : temp,
              'date' : couponListDate[i]
            }
            final.push(tobject);
          }
          if(i+1 == len){
            //console.log(final);
            res.json(final);
          }
        });
        //res.json(coupons);
      }
      
    }else{
      res.status(404).json({message:"No deals bought"});
    }
    //res.json(coupondatas);
  } catch (err) {
    res.status(404).json({ message: "coupon not found" + err });
  }
});
router.get("/dealboughtdetails/:id", async function (req, res, next) {
  try {
    const coupondatas = await DealBoughts.find({couponid:req.params.id});
    if(coupondatas.length > 0){
      var couponListArray = [];
      var tempObject = {};
      var resultArray = [];
      coupondatas.forEach(elements => {
        //console.log(elements.userid);
        couponListArray.push(elements.userid);
      });
      //res.json(couponListArray);
      const users = await Userprofile.find({userid:{$in:Array.from(new Set(couponListArray))}})
      .populate({ path: "userid" });
      //console.log(users);
      //const users = await User.find({_id:{$in:Array.from(new Set(couponListArray))}});
      if(users.length > 0){
        users.forEach(ele => {
          coupondatas.forEach(e => {
            if(ele.userid._id == e.userid){
              tempObject = {
                fname: ele.fname,
                lname:ele.lname,
                email:ele.userid.email,
                userid:ele.userid._id,
                dealid:e.couponid,
                phonenumber:ele.phonenumber,
                purchasetime: e.date,
                recordid:e._id,
                status:e.status,
                reedemdate:e.redeemdate
              }
              resultArray.push(tempObject);
            }
          });
        });
        return res.status(200).json(resultArray);
      }
    }else{
      return res.status(404).json({ message: "coupon not found" });
    }
    //res.json(coupondatas);
  } catch (err) {
    return res.status(404).json({ message: "Error: "+err });
  }
});
router.get("/delete/:id", async function (req, res, next){
  try{
    await Coupon.deleteOne({_id:req.params.id});
    res.status(200).json({message:"Deleted Successfully"});
  }catch(err){
    res.status(404).json({ message: "Id not found" });
  }
});

router.get("/ifdealbought/:dealid/:userid",async function(req,res,next){
  var data = await DealBoughts.find({
    $and:[
      {userid: req.params.userid},
      {couponid : req.params.dealid},
    ]
  });
  if(data.length > 0){
    res.status(200).json(data);
  }else{
    res.status(404).json({found:false});
  }
});

// change deal bought status to redeemed
router.put("/updatedealboughtstatus/",isAuth, async function (req, res, next) {
  try {
    await DealBoughts.findByIdAndUpdate(
      req.body.recordid,
      { 
        status: "1",
        redeemdate:new Date()
      },
      async function (err, doc) {
        if (err) {
          res.send("error " + err);
        } else {
          var userdata = await User.find({email:req.body.email})
          
            if(userdata.length > 0){
              var userprofiledata = await Userprofile.find({userid:userdata[0]['_id']});
              if(userprofiledata.length > 0){
                
          // -------email code starts----------
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
        readHTMLFile('/home/ubuntu/services/myapp/views/emails/deal-redemption-email.handlebars',async function(err, html) {
          var template = handlebars.compile(html);
          var replacements = {
              fname:userprofiledata[0]['fname'],
              lname:userprofiledata[0]['lname']
          };
          console.log(process.env.SMTP_USERNAME);
          var htmlToSend = template(replacements);
          let info = await transporter.sendMail({
            from: 'no-reply@momnpophub.com', // sender address
            to: '"'+req.body.email+'"', // list of receivers
            subject: "Deal Redeemed Successfully ", // Subject line
            text: "Deal Redeemed Successfully", // plain text body
            html : htmlToSend
          });
          console.log("Message sent: %s", info.messageId);
            // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

            // Preview only available when sending through an Ethereal account
            
          });
        }
    // ----------email code ends---------
          res.json(doc);
        }
      }
      }
    );
  } catch (err) {
    res.status(404).json({ message: "something went wrong" });
  }
});

module.exports = router;