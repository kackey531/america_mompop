var express = require("express");
var mongoose = require("mongoose");
const Stripe = require('stripe');
const Accountlink = require('../model/accountlinks');
const Coupon = require("../model/coupons");
const User = require("../model/users");
const Userprofile = require("../model/userprofiles");
const nodemailer = require("nodemailer");
const hbs = require("nodemailer-express-handlebars");
const handlebars=require('handlebars');
const fs = require('fs');
const isAuth = require("../middleware/auth");
const stripe = Stripe(process.env.STRIPE_SK);
const { v4: uuidv4 } = require('uuid');
const { send } = require("process");
var router = express.Router();
//cus_IIYyYTPV5NKWb8
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
router.post("/createstripecustomer",isAuth, async function (req, res, next) {
    try{
        const customer = await stripe.customers.create({
            id: req.body.userid,
            email:req.body.email,
        }).then(async customer => {
            try{
                const datasaved = await Userprofile.update({userid:req.body.userid},{stripecustomerid:customer.id});
                if(datasaved){
                    res.status(200).json(customer);
                }else{
                    res.status(401).json({message:"data not saved"});
                }
            }catch(error){
                res.status(401).json({message:"badrequest " + error});
            }
            
        }).catch(error => {
            res.status(401).json({message:"badrequest " + error});
        })
        res.status(200).json(customer);
    }catch(err){
        res.status(401).json({message:"badrequest " + err});
    }
  
});
router.post("/checkstripecustomer",isAuth, async function (req, res, next) {
    try{
        const userData = await Userprofile.find({userid:req.body.userid});
        if(userData.length > 0){
            if(userData[0]['stripecustomerid']){
                res.status(200).json({stripecustomerid:userData[0]['stripecustomerid']});
            }else{
                res.status(200).json({message:"No stripe customer id found"});
            }
        }else{
            res.status(404).json({message:"Not found"});
        }
        res.status(200).json(customer);
    }catch(err){
        res.status(401).json({message:"badrequest " + err});
    }
  
});
router.post("/createaccount",isAuth,async function(req,res,next){
    try{
        //acct_1HiDORK09Ns6Znkz
        const account = await stripe.accounts.create({
            type: 'express',
            country: 'US',
            email: req.body.email,
            capabilities: {
              transfers: {requested: true},
            },
        });
        res.status(200).json(account);
    }catch(err){
        res.status(401).json("bad request " + err);
    }
});
router.post("/connectwithauth",async function(req,res,next){
    try{
        console.log("stripe id is");
        console.log(process.env.STRIPE_SK);
        const response = await stripe.oauth.token({
            grant_type: 'authorization_code',
            code: req.body.code,
        });
        
        if(response){
        var connected_account_id = response.stripe_user_id;
        console.log(connected_account_id)
        const accountlink = new Accountlink({
            userid: req.body.userid,
            accountid: connected_account_id,
        });
      const newaccountlink = await accountlink.save();
      //business-account-payment-setup-email.handlebars
      //email code starts
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
    readHTMLFile('/home/ubuntu/services/myapp/views/emails/business-account-payment-setup-email.handlebars',async function(err, html) {
        var template = handlebars.compile(html);
        var replacements = {
            //fname: req.body.fname,
            //lname: req.body.lname,
        };
        console.log(process.env.SMTP_USERNAME);
        var htmlToSend = template(replacements);
        let info = await transporter.sendMail({
        from: 'no-reply@momnpophub.com', // sender address
        to: 'chananap08@gmail.com', // list of receivers
        subject: "Payment method added successfully", // Subject line
        text: "Payment method added successfully", // plain text body
        html : htmlToSend
        });
        console.log("Message sent: %s", info.messageId);
        // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

        // Preview only available when sending through an Ethereal account
        
        });}
      res.status(200).json({"accountid":connected_account_id});

    }catch(err){
        res.status(401).json({message:"error" + err});
    }
});
router.post("/linkaccount",async function(req,res,next){
    try{
        //acct_1J5wUgCJ76i5MmQv
        const accountLinks = await stripe.accountLinks.create({
            //account: req.body.accountid,
            account:"acct_1J5wUgCJ76i5MmQv",
            refresh_url: req.body.refresh_url,
            return_url: req.body.return_url,
            type: 'account_onboarding',
          });
        console.log(accountLinks);
        res.status(200).json(accountLinks);
    }catch(err){
        console.log(err);
        res.status(401).json("bad request " + err);
    }
});

router.get("/createintent/:amount/:userid/:customerid",isAuth,async function(req,res,next){
    try{
        const accountid = await Accountlink.find({userid:req.params.userid}); // Business account user
        const account = await User.find({_id:req.params.customerid}); // Customer account id
        console.log(accountid);
        console.log(account);
        //console.log(accountinfo);
        if(account.length > 0){
            const accountinfo = await Userprofile.find({userid:req.params.customerid});
            console.log(accountinfo);
            
            if(accountinfo.length > 0){
                if(accountinfo[0]['stripecustomerid'] !== undefined){
                    if (accountid.length > 0){
                        var money = parseFloat(req.params.amount) * 100;
                        var datatosend = {
                            amount: money,
                            customer : accountinfo[0]['stripecustomerid'],
                            currency: 'usd',
                            payment_method_types: ['card'],
                            transfer_data: {
                                amount: money,
                                destination: accountid[0]['accountid'],
                            }    
                        }
                        
                        const paymentIntent = await stripe.paymentIntents.create(datatosend);
                        res.status(200).json({
                            "client_secret":paymentIntent.client_secret
                        });
                        
                        //res.send(senddata);
                    }else{
                        res.status(404).json({message:"stripe account not connected"});
                    }
                }else{
                    await stripe.customers.create({
                        id: req.params.customerid,
                        email:account[0]['email'],
                    }).then(async customer => {
                        try{
                            const datasaved = await Userprofile.update({userid:req.params.userid},{stripecustomerid:customer.id});
                            if (accountid.length>0){
                                var money = parseFloat(req.params.amount) * 100;
                                var datatosend = {
                                    amount: money,
                                    customer : customer.id,
                                    currency: 'usd',
                                    payment_method_types: ['card'],
                                    transfer_data: {
                                        amount: money,
                                        destination: accountid[0]['accountid'],
                                    }
                                }
                                const paymentIntent = await stripe.paymentIntents.create(datatosend);
                                res.status(200).json({
                                    "client_secret":paymentIntent.client_secret
                                });
                                //res.send(senddata);
                            }else{
                                res.status(404).json({message:"stripe account not connected"});
                            }
                        }catch(error){
                            res.status(401).json({message:"4 badrequest " + error});
                    
                        }
                    });
                }
            }
        }else{
            res.status(404).json({"message":"User not found"});
        }
        }catch(err){
        //acct_1HiDORK09Ns6Znkz
        
        res.status(401).json(" 6 bad request " + err);
    }
});

router.post("/create_native_pay_intent/",isAuth,async function(req,res,next){
    try{
        const accountid = await Accountlink.find({userid:req.body.userid});
        const account = await User.find({_id:req.body.customerid});
        
        if(account.length > 0){
            const accountinfo = await Userprofile.find({userid:req.body.customerid});
            //console.log(accountinfo);
            if(accountinfo.length > 0){
                if(accountinfo[0]['stripecustomerid'] !== undefined){
                    
                    if (accountid.length > 0){
                        var money = parseFloat(req.body.amount) * 100;
                        var datatosend = {
                            amount: money,
                            customer : accountinfo[0]['stripecustomerid'],
                            currency: 'usd',
                            payment_method: req.body.payment_method_id,
                            payment_method_types: ['card'],
                            // off_session:true,
                            // confirm: true,
                            transfer_data: {
                                amount: money,
                                destination: accountid[0]['accountid'],
                            }    
                        }
                        
                        const paymentIntent = await stripe.paymentIntents.create(datatosend);
                        res.status(200).json({
                            "stripe_id":accountid[0]['accountid'],
                            "client_secret":paymentIntent.client_secret
                        });
                        
                        //res.send(senddata);
                    }else{
                        res.status(404).json({message:"stripe account not connected"});
                    }
                    
                }else{
                    await stripe.customers.create({
                        id: req.body.customerid,
                        email:account[0]['email'],
                        
                    }).then(async customer => {
                        const datasaved = await Userprofile.update({userid:req.body.customerid},{stripecustomerid:customer.id});
                        var money = parseFloat(req.body.amount) * 100;
                        var datatosend = {
                            amount: money,
                            customer : customer.id,
                            currency: 'usd',
                            payment_method: req.body.payment_method_id,
                            payment_method_types: ['card'],
                            // off_session:true,
                            // confirm: true,
                            transfer_data: {
                                amount: money,
                                destination: accountid[0]['accountid'],
                            }    
                        }
                        
                        const paymentIntent = await stripe.paymentIntents.create(datatosend);
                        res.status(200).json({
                            "stripe_id":accountid[0]['accountid'],
                            "client_secret":paymentIntent.client_secret
                        });
                    });
                }
            }
        }else{
            res.status(404).json({"message":"User not found"});
        }

    }catch(err){
        //acct_1HiDORK09Ns6Znkz
        
        res.status(401).json("5 bad request " + err);
    }
});

router.post("/getstripeuserdetail",isAuth,async function(req,res,next){
    console.log("inside !"+req.body.userid);
    try{
    const account = await Userprofile.find({userid:req.body.userid});
    console.log(account);
    if(account.length > 0){
        if(account[0]['stripecustomerid'] !== undefined){
            console.log("inside");
            const customer = await stripe.customers.retrieve(
                account[0]['stripecustomerid']
            );

            console.log(customer);
            if(customer){
                res.status(200).json(customer);
            }else{
                res.status(404).json({message:"error fetching data"});
            }
        }else{
            res.status(404).json({message:"Stripe customer not created yet for this userid"});
        }

    }else{
        res.status(404).json({message:"user not found"});
    }
}catch(err){
    res.status(404).json({message:err});
}
});

router.post("/updatestripeuseraddress",isAuth,async function(req,res,next){
    const account = await Userprofile.find({userid:req.body.userid});
    if(account.length > 0){
        if(account[0]['stripecustomerid'] !== undefined){
            const customer = await stripe.customers.update(
                account[0]['stripecustomerid'],{
                    "address": {
                        "city": req.body.city,
                        "country":req.body.country,
                        "line1":req.body.line1,
                        "line2":req.body.line2,
                        "postal_code": req.body.postalcode,
                        "state":req.body.state
                    },
                }
            );
            if(customer){
                res.status(200).json(customer);
            }else{
                res.status(404).json({message:"error fetching data"});
            }
        }else{
            res.status(404).json({message:"Stripe customer not created yet for this userid"});
        }

    }else{
        res.status(404).json({message:"user not found"});
    }
});


router.post("/listpaymentmethods",isAuth,async function(req,res,next){
    const account = await Userprofile.find({userid:req.body.userid});
    if(account.length > 0){
        if(account[0]['stripecustomerid'] !== undefined){
            const paymentMethods = await stripe.paymentMethods.list({
                customer: account[0]['stripecustomerid'],
                //customer:'cus_IIaNZPt0m1P0RR',
                type: 'card',
              });
            if(paymentMethods){
                res.status(200).json(paymentMethods);
            }else{
                res.status(404).json({message:"error fetching data"});
            }
        }else{
            res.status(404).json({message:"Stripe customer not created yet for this userid"});
        }

    }else{
        res.status(404).json({message:"user not found"});
    }
});

router.post("/createbankaccount",isAuth,async function(req,res,next){
    try{
        const bankAccount = await stripe.customers.createSource(
            'cus_IIYyYTPV5NKWb8',
            {
                source: {
                    object: "bank_account",
                    country: "US",
                    currency:"usd",
                    account_number:"000123456789",
                    routing_number: "110000000",
                    account_holder_name: "Anmol Austen",
                    account_holder_type: "individual",
                }
            }
        );
        res.status(200).json(bankAccount);
    }catch(err){
        res.status(401).json({message:"badrequest " + err});
    }
});
router.post("/saveaccountlink",isAuth,async function(req,res,next){
    try{
        const accountlink = new Accountlink({
            userid: req.body.userid,
            accountid: req.body.accountid,
        });
      const newaccountlink = await accountlink.save();
      res.status(200).json({message:"success"});
    }catch(err){
        res.status(401).json({message:"badrequest " + err});
    }
});
router.get("/getlinkaccount/:id", async function (req, res, next) {
    console.log(req.params.id);
    await Accountlink.find({userid:req.params.id}).exec(function(err,data){
        console.log(data);
        if(data.length>0){
            return res.status(200).json({data});
        }else{
            return res.status(404).json({ message: "account not found" });
        }
    });
    
});
router.get("/checkorcreate/:id", async function (req, res, next) {
    var userData = await Userprofile.find({userid:req.params.id});
    if(userData.length > 0){
        if(userData.stripecustomerid != null){

            res.status(200).json({"customerid": userData.stripecustomerid})
        }else{
            await stripe.customers.create().exec(async function(err,data){
                if(!err){
                    await Userprofile.findByIdAndUpdate(
                        userData._id,{
                            stripecustomerid:data.id,
                        },
                        function (err, doc) {
                            if (err) {
                              res.status(404).send("error " + err);
                            } else {
                              res.status(200).json({"customerid":doc.stripecustomerid});
                            }
                    });
                }
            });   
        }
    }
});
router.get("/getallcustomers", async function (req, res, next) {
    var customerslist = await stripe.customers.list({
        limit:20,
    });
    res.status(200).json(customerslist);
});
router.post("/getallcards",async function(req,res,next){
    const accountinfo = await Userprofile.find({userid:req.params.customerid});
    console.log(accountinfo);
    try{
    
    console.log(accountinfo);
    if(accountinfo.length > 0){
        if(accountinfo[0]['stripecustomerid'] !== undefined){
            const cards = await stripe.customers.listSources(
                accountinfo[0]['userid'],
                {object: 'card', limit: 3}
            );
            res.status(200).json(cards);
        }
    }else{
        res.status(404).json("notfound");
    }
}catch(err){
    res.status(404).json(err);
}
});
module.exports = router;