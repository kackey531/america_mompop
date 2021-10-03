var express = require("express");
var mongoose = require("mongoose");
var router = express.Router();
const path = require('path');
const User = require("../model/users");
const Forgotpass = require("../model/forgotpass");
const Userprofile = require("../model/userprofiles");
const Customer = require("../model/customers");
const Coupon = require("../model/coupons");
const Fav = require("../model/fav");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const jwt = require("jsonwebtoken");
const isAuth = require("../middleware/auth");
const nodemailer = require("nodemailer");
const hbs = require("nodemailer-express-handlebars");
const handlebars=require('handlebars');
const fs = require('fs');
const { send } = require("process");
var suid = require('rand-token').suid;
const geolib = require('geolib');
const awsregion = process.env.AWS_REGION;
const awsAccessid = process.env.AWS_ACCESS_KEY;
const awsSecretid = process.env.AWS_SECRET_KEY;
const aws = require('aws-sdk');
const multer = require('multer');
const multers3 = require('multer-s3');
aws.config.update({
  region: awsregion,
  accessKeyId: awsAccessid,
  secretAccessKey: awsSecretid
});
const s3 = new aws.S3({
  awsregion,
  awsAccessid,
  awsSecretid
});

var upload = multer({
  storage: multers3({
    s3: s3,
    bucket: process.env.AWS_BUCKET,
    key: function (req, file, cb) {
      console.log(file);
      cb(null, Date.now().toString())
    }
  }),
  
});
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

router.get("/",isAuth, async function (req, res, next) {
  // send mail with defined transport object
  await Userprofile.find()
    .populate({ path: "userid" })
    .exec(function (err, users) {
      res.send(users);
    });
});

router.get("/getbusinessdetail/:id",async function(req,res,next){
 ///* 
  var userdata = await Userprofile.find({'userid':req.params.id})
    .populate({ path: "userid" });
  if(userdata.length>0){
    var temp = await Coupon.find({
      $and:[
        {userid:userdata[0]["userid"]["_id"]},
        {startdate : { $lte : new Date() }},
        {expirydate : { $gte : new Date() }},
      ]
    });
    console.log(userdata[0]);
    console.log("length == "+ temp.length);

    if(temp.length == 0){
      userdata[0].userid.type = 0;
      //console.log(userdata);
      res.status(200).json(userdata);
    }else{
      userdata[0].userid.type = temp.length;
      //console.log(userdata);
      res.status(200).json(userdata);
    }
    
  }else{
    res.status(404).json({'message':"Business not found"});
  }
 // */
 /*
  var query = Userprofile.find({'userid': req.params.id});
  query.exec(function(err, data) {
    if(err){
      console.log(err);
      res.status(404).json({'message':"Error in finding of userprofile."});      
    } else {
      if( data.length > 0){console.log('userID: ' + data[0]['userid']);
        query = Coupon.find({
          $and:[
          {userid:data[0]["userid"]},
          {publishdate : { $lte : new Date() }},
          {enddate : { $gte : new Date() }},
        ]});
        query.exec(function(err, deals){
          if(err){
            console.log(err);
            res.status(404).json({'message':"Error in finding of available deals."}); 
          } else {
            console.log("length == "+ deals.length);
        
            if(deals.length == 0){
              data[0]['totalNum'] = 0;
              res.status(200).json(data);
            }else{
              data[0]['totalNum'] = deals.length;
              console.log(data[0]['totalNum']);
              res.status(200).json(data);
            }
          }
        });       
      } else {
        res.status(404).json({'message':"Business not found"});
      }
    }
  });
  */
});


router.get("/getbusinessoffline/:lat/:long", async function (req, res, next) {
  // send mail with defined transport object
  var userdata = new Array();
  await Userprofile.find({"btype":"offline"})
    .populate({ path: "userid" })
    .exec(async function (err, users) {
      users.forEach((el,i) => {
        userdata.push(el);
      });
      for (let index = 0; index < userdata.length; index++) {
        if(typeof userdata[index]["lat"] !== "undefined"){
          var dis = geolib.getDistance({latitude:req.params.lat,longitude:req.params.long},{latitude:userdata[index]["lat"],longitude:userdata[index]["long"]});
          console.log(dis);
          userdata[index]['lname'] = dis;
        }else{
          userdata[index]['lname'] = "";
        }
        var temp = await Coupon.find({
          $and:[
            {userid:userdata[index]["userid"]["_id"]},
            {startdate : { $lte : new Date() }},
            {expirydate : { $gte : new Date() }},
          ]
        });
        if(temp.length == 0){
          userdata[index]["userid"]["type"] = 0;
        }else{
          userdata[index]["userid"]["type"] = temp.length;
        }
        userdata.sort((a,b)=>{return parseFloat(a.lname) - parseFloat(b.lname)});
      }
      res.send(userdata);
    });
});

router.get("/getbusinessonline", async function (req, res, next) {
  // send mail with defined transport object
  var userdata = new Array();
  await Userprofile.find({"btype":"online"})
    .populate({ path: "userid" })
    .exec(async function (err, users) {
      users.forEach((el,i) => {
        userdata.push(el);
      });
      for (let index = 0; index < userdata.length; index++) {
        
        var temp = await Coupon.find({
          $and:[
            {userid:userdata[index]["userid"]["_id"]},
            {startdate : { $lte : new Date() }},
            {expirydate : { $gte : new Date() }},
          ]
        });
        if(temp.length == 0){
          userdata[index]["userid"]["type"] = 0;
        }else{
          userdata[index]["userid"]["type"] = temp.length;
        }
        userdata.sort((a,b)=>{return parseFloat(a.lname) - parseFloat(b.lname)});
      }
      res.send(userdata);
    });
});

router.post("/create", async function (req, res) {
  var finduser = await User.find({email:req.body.email});
  console.log('******* Result Find User : ' + finduser.length);
  if(finduser.length > 0){
    res.status(401).json({ message: "User already exsists"});
  }else{
  bcrypt.hash(req.body.password, saltRounds, async function (err, hash) {
    const users = new User({
      _id: new mongoose.Types.ObjectId(),
      email: req.body.email,
      password: hash,
      type: "2",
    });
    //console.log(req.file);
    try {
      const newuser = await users.save();
      const userprofiles = new Userprofile({
        fname: req.body.fname,
        lname: req.body.lname,
        address: req.body.address,
        lat: req.body.lat,
        long: req.body.long,
        status: req.body.status,
        userid: newuser._id,
        bname: req.body.bname,
        baddress: req.body.baddress,
        status : req.body.status,
        website : req.body.website,
        description : req.body.description,
        phonenumber : req.body.phonenumber,
        type: req.body.type,
        btype: req.body.btype,
        //logo:req.file.key
      });
      try {
        const newuserprofiles = await userprofiles.save();
    /*    // -------email code starts----------
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
        readHTMLFile('/home/ubuntu/services/myapp/views/emails/welcome.handlebars',async function(err, html) {
          var template = handlebars.compile(html);
          var replacements = {
              fname: req.body.fname,
              lname: req.body.lname,
              bname : req.body.bname,
          };
          console.log(process.env.SMTP_USERNAME);
          var htmlToSend = template(replacements);
          let info = await transporter.sendMail({
            from: 'no-reply@momnpophub.com', // sender address
            to: '"'+req.body.email+'"', // list of receivers
            subject: "Welcome to Momnpophub ", // Subject line
            text: "Hello world?", // plain text body
            html : htmlToSend
          });
          console.log("Message sent: %s", info.messageId);
            // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

            // Preview only available when sending through an Ethereal account
            
          }); */
    // ----------email code ends---------
        var userData = {
          udata: {
            email: req.body.email,
            type: "2",
            id: newuser._id,
          },
          token: "",
        };
        let token = jwt.sign(userData.udata, process.env.JWT_TOKEN);
        userData.token = token;
        res.status(200).json(userData);
      } catch (err) {
        res.status(401).json({ message: "bad request in userprofiles " + err });
      }
    } catch (err) {
      res.status(401).json({ message: "bad request " + err });
    }
    
  });
}
});

router.post("/createbyapp", async function (req, res) {
  await User.findOne({email:req.body.email}).exec(function(err,usersdata){
    console.log(usersdata);
    if(usersdata){
      res.status(401).json({"message":"Email already present"});
    }else{
      bcrypt.hash(req.body.password, saltRounds, async function (err, hash) {
      const users = new User({
        _id: new mongoose.Types.ObjectId(),
        email: req.body.email,
        password: hash,
        type: "1",
      });
      try {
        const newuser = await users.save();
        const usernewprofile = new Userprofile({
          _id: new mongoose.Types.ObjectId(),
          fname: req.body.fname,
          lname: req.body.lname,
          userid : newuser._id,
        });
        var newuserprofiles = await usernewprofile.save();
        var customersData =await Customer.find({email:req.body.email});
        if(customersData.length > 0){
          
          
          customersData.forEach(async element  => {
            var userdealsdata = await Coupon.find({userid:element.createrid});
            if(userdealsdata.length > 0){
              userdealsdata.forEach(async el =>{
                var fav = new Fav({
                  userid: newuser._id,
                  couponid: el._id,
                });
                await fav.save();
              });
            }
          });
          
        }
        var userData = {
          udata: {
            email: req.body.email,
            type: "1",
            id: newuser._id,
            fname: req.body.fname,
            lname: req.body.lname,
          },
          token: "",
        };
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
        readHTMLFile('/home/ubuntu/services/myapp/views/emails/customer-account-creation-confirmation-email.handlebars',async function(err, html) {
          var template = handlebars.compile(html);
          var replacements = {
            email: req.body.email,
            fname: req.body.fname,
            lname: req.body.lname, 
          };
          console.log(process.env.SMTP_USERNAME);
          var htmlToSend = template(replacements);
          let info = await transporter.sendMail({
            from: 'no-reply@momnpophub.com', // sender address
            to: '"'+req.body.email+'"', // list of receivers
            subject: "Welcome to Momnpophub ", // Subject line
            text: "Welcome to Momnpophub?", // plain text body
            html : htmlToSend
          });
          console.log("Message sent: %s", info.messageId);
            // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

            // Preview only available when sending through an Ethereal account
            
          });
    // ----------email code ends---------
        let token = jwt.sign(userData.udata, process.env.JWT_TOKEN);
        userData.token = token;
        res.status(200).json(userData);
        
      } catch (err) {
        res.status(401).json({ message: "bad request " + err });
      }
  });
    }
  });
  
});

router.post("/googlelogin", async function (req, res) {
  var usersdata = await User.find({email:req.body.email});
    //console.log(usersdata);
    if(usersdata.length > 0){
      var userData = {
        udata: {
          email: req.body.email,
          type: "1",
          id: usersdata[0]['id'],
          fname: req.body.fname,
          lname: req.body.lname,
        },
        token: "",
      };
      let token = jwt.sign(userData.udata, process.env.JWT_TOKEN);
      userData.token = token;
      res.status(200).json(userData);

    }else{
      var pass = suid(16);
      bcrypt.hash(pass, saltRounds, async function (err, hash) {
      const users = new User({
        _id: new mongoose.Types.ObjectId(),
        email: req.body.email,
        password: hash,
        type: "1",
      });
      try {
        const newuser = await users.save();
        var customersData =await Customer.find({email:req.body.email});
        if(customersData.length > 0){
          const userprofiledata = new Userprofile({
            _id: new mongoose.Types.ObjectId(),
            fname: customersData[0]['fname'],
            lname: customersData[0]['lname'],
            phonenumber: customersData[0]['phone'],
            userid : newuser._id,
          });
          var newuserprofiles = await userprofiledata.save();
          customersData.forEach(async element  => {
            var userdealsdata = await Coupon.find({userid:element.createrid});
            if(userdealsdata.length > 0){
              userdealsdata.forEach(async el =>{
                var fav = new Fav({
                  userid: newuser._id,
                  couponid: el._id,
                });
                await fav.save();
              });
            }
          });
          
        }else{
          const userprofiledata = new Userprofile({
            _id: new mongoose.Types.ObjectId(),
            fname: req.body.fname,
            lname: req.body.lname,
            userid : newuser._id,
          });
          var newuserprofiles = await userprofiledata.save();
        }
        var userData = {
          udata: {
            email: req.body.email,
            type: "1",
            id: newuser._id,
            fname: req.body.fname,
            lname: req.body.lname,
          },
          token: "",
        };
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
        readHTMLFile('/home/ubuntu/services/myapp/views/emails/customer-account-creation-confirmation-email.handlebars',async function(err, html) {
          var template = handlebars.compile(html);
          var replacements = {
              email: req.body.email,
              fname: req.body.fname,
            lname: req.body.lname,
          };
          console.log(process.env.SMTP_USERNAME);
          var htmlToSend = template(replacements);
          let info = await transporter.sendMail({
            from: 'no-reply@momnpophub.com', // sender address
            to: '"'+req.body.email+'"', // list of receivers
            subject: "Welcome to Momnpophub ", // Subject line
            text: "Welcome to Momnpophub?", // plain text body
            html : htmlToSend
          });
          console.log("Message sent: %s", info.messageId);
            // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

            // Preview only available when sending through an Ethereal account
            
          });
    // ----------email code ends---------
        let token = jwt.sign(userData.udata, process.env.JWT_TOKEN);
        userData.token = token;
        res.status(200).json(userData);
        
      } catch (err) {
        res.status(401).json({ message: "bad request " + err });
      }
  });
    }
  
});

router.post("/login", async function (req, res) {
  if(req.body.email == "" || req.body.password == ""){
    res.status(404).json({ message: "user not found" });
  }
  await User.findOne({ email: req.body.email }).then(function (user) {
    if (!user) {  
      res.status(404).json({ message: "user not found" });
    } else {
      bcrypt.compare(req.body.password, user.password,async function (err, result) {
        if (result == true) {
          console.log(user._id);
          var userprofiledata = await Userprofile.findOne({userid:mongoose.Types.ObjectId(user._id)});
          var userData = {
            udata: {
              email: user.email,
              type: user.type,
              id: user._id,
              btype: userprofiledata.btype,
              key:userprofiledata.logo
            },
            token: "",
          };
          let token = jwt.sign(userData.udata, process.env.JWT_TOKEN);
          userData.token = token;
          res.status(200).json(userData);
        } else {
          res.status(404).send({ message: "Incorrect password" });
        }
      });
    }
  });
});
router.post("/loginforapp", async function (req, res) {
  if(req.body.email == "" || req.body.password == ""){
    res.status(404).json({ message: "user not found" });
  }
  await User.findOne({ email: req.body.email }).then(function (user) {
    if (!user) {  
      res.status(404).json({ message: "user not found" });
    } else {
      bcrypt.compare(req.body.password, user.password,async function (err, result) {
        var userprofiledata = await Userprofile.find({userid:user.id});
        if(userprofiledata.length > 0){
          if (result == true) {
            var userData = {
              udata: {
                email: user.email,
                type: user.type,
                id: user._id,
                fname: userprofiledata[0]['fname'],
                lname: userprofiledata[0]['lname']
              },
              token: "",
            };
            let token = jwt.sign(userData.udata, process.env.JWT_TOKEN);
            userData.token = token;
            res.status(200).json(userData);
          
        } else {
          res.status(404).send({ message: "Incorrect password" });
        }
      }
      });
    }
  });
});
router.get("/:id",isAuth,  async function (req, res, next) { console.log
  var Userdataone = await User.findById(req.params.id);
  console.log(Userdataone._id);
  if (Userdataone._id) {
    var Userprofiledata = await Userprofile.find({userid:mongoose.Types.ObjectId(Userdataone._id)});
    console.log('userDataFrofileID : ' + Userprofiledata[0]._id);
    var userdata = [];
    userdata.push(Userdataone);
    userdata.push(Userprofiledata);
    res.status(200).json(userdata);
  } else {
    res.status(404).json({ message: "user not found" });
  }
});

router.put("/update/:id",isAuth,  async function (req, res, next) {
  var Userdataone = await Userprofile.findOne({'userid':req.params.id});
  // res.json(Userdataone);
  try {
    await Userprofile.findByIdAndUpdate(
      Userdataone._id,
      {
        fname: req.body.fname,
        lname: req.body.lname,
        address: req.body.address,
        bname: req.body.bname,
        baddress: req.body.baddress,
        website : req.body.website,
        description : req.body.description,
        phonenumber : req.body.phonenumber
      },
      function (err, doc) {
        if (err) {
          res.status(404).send("error " + err);
        } else {
          res.status(200).json({"message":"User updated successfully"});
        }
      }
    );
  } catch (err) {
    res.status(404).json({ "message": "data not found" });
  }
});

router.put("/updatepassword/:id",async function(req,res,next){
  var user = await User.findOne({'_id':req.params.id});
  console.log(user);
  bcrypt.compare(req.body.password, user.password, function (err, result) {
    if (result == true) {
      res.send("true");
    }else{
      res.send("false");
    }
  });
  
})

router.post("/forgotpasswordtoken/",async function(req,res,next){
  var user = await User.find({'email':req.body.email});
  console.log(user);
  if(user.length > 0){
    var userprofile = await Userprofile.find({'userid':user[0]['_id']});
    if(userprofile.length >0){
    var token = suid(16);
    var forgotpass = new Forgotpass({
      email: req.body.email,
      token: token,
    });
    var result = await forgotpass.save();
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
    readHTMLFile('/home/ubuntu/services/myapp/views/emails/business-or-customer-account-password-reset-email.handlebars',async function(err, html) {
      var template = handlebars.compile(html);
      var replacements = {
          token: token,
          fname:userprofile[0]['fname'],
          lname:userprofile[0]['lname']
      };
      console.log(process.env.SMTP_USERNAME);
      var htmlToSend = template(replacements);
      let info = await transporter.sendMail({
        from: 'no-reply@momnpophub.com', // sender address
        to: '"'+req.body.email+'"', // list of receivers
        subject: "Password reset", // Subject line
        text: "Password reset", // plain text body
        html : htmlToSend
      });
      console.log("Message sent: %s", info.messageId);
        // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

        // Preview only available when sending through an Ethereal account
        
      });
// ----------email code ends---------
    res.json({'result':result});
    }
  }else{
    res.json({'message':"user not found"});
  }
  
});

router.post("/forgotpasswordtokenmobile/",async function(req,res,next){
  var user = await User.find({'email':req.body.email});
  console.log(user);
  if(user.length > 0){
    var userprofile = await Userprofile.find({'userid':user[0]['_id']});
    if(userprofile.length > 0){

    var token = suid(16);
    var forgotpass = new Forgotpass({
      email: req.body.email,
      token: token,
    });
    var result = await forgotpass.save();
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
    readHTMLFile('/home/ubuntu/services/myapp/views/emails/business-or-customer-account-password-reset-email-mobile.handlebars',async function(err, html) {
      var template = handlebars.compile(html);
      var replacements = {
          token: token,
          fname:userprofile[0]['fname'],
          lname:userprofile[0]['lname']
      };
      console.log(process.env.SMTP_USERNAME);
      var htmlToSend = template(replacements);
      let info = await transporter.sendMail({
        from: 'no-reply@momnpophub.com', // sender address
        to: '"'+req.body.email+'"', // list of receivers
        subject: "Password reset", // Subject line
        text: "Password reset", // plain text body
        html : htmlToSend
      });
      console.log("Message sent: %s", info.messageId);
        // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

        // Preview only available when sending through an Ethereal account
        
      });
// ----------email code ends---------
    res.json({'result':result});
    }
  }else{
    res.json({'message':"user not found"});
  }
  
});

router.post("/passwordreset/:token",async function(req,res,next){
  var token = await Forgotpass.find({
    $and:[
      {'token':req.params.token},
      {'date':{$gt: new Date(Date.now() - 24*60*60 * 1000)}
    }
    ]
  });
  console.log(token);
  if(token.length > 0){
    var Userdataone = await User.findOne({'email':token[0].email});
    bcrypt.hash(req.body.password, saltRounds, async function (err, hash) {
      await User.findByIdAndUpdate(
        Userdataone._id,
        {
          password: hash,
        },
        async function(err,doc){
          if (err) {
            res.status(404).send("error " + err);
          } else {
            await Forgotpass.deleteOne({_id:token[0]._id});
            res.status(200).json({"message":"password updated successfully"});
          }
        }
      );
    });
  }else{
    res.status(404).json({"message":"Token invalid or expired"});
  }
  
}); 

router.post("/checktoken", async function (req, res, next) {
  let token = req.body.token;
  jwt.verify(token, process.env.JWT_TOKEN, (err, user) => {
    // if there has been an error...
    if (err) {
      // shut them out!
      res.status(500).json({ error: "Not Authorized" });
    }
    // if the JWT is valid, allow them to hit
    // the intended endpoint
    res.status(200).json({ user });
  });
});
router.post("/updatelogo/",upload.single('logoimg'),async function(req,res,next){
  await Userprofile.update({userid:req.body.userid},{logo:req.file.key});
  res.status(200).json({image:req.file.key});
});

router.get("/getlogo/:key",function(req,res,next){
  const getParams ={
    Key: req.params.key,
    Bucket: process.env.AWS_BUCKET
  }
  const readSteam = s3.getObject(getParams).createReadStream();
  readSteam.pipe(res);
});

router.post("/unsubscribed",async function(req,res,next){
  await Userprofile.update({userid:req.body.userid},{unsubscribed:"0"});
  res.status(200).json({"message":"unsubsribed successfully"})
});

module.exports = router;