var express = require("express");
var router = express.Router();
var serve = require("../controller/serveProfile");

const User = require("../model/users");
const Userprofile = require("../model/userprofiles");
const Coupon = require("../model/coupons");
const { exists } = require("fs");

router.get("/profile/:id", function (req, res, next) { console.log(req);
  var id = req.params.id;
  id.replace('%', 'percent');
  var email = id.split(':e:e:')[1];
  id = id.split(':e:e:')[0];
  id = id.split('-')[0];
  var query = Userprofile.find({ "_id": id });
  query.exec(function (err, profiles) {
    if(profiles){
        console.log("***** profile : " + profiles[0]);
        query = Coupon.find({"userid": profiles[0].userid});
        query.exec(function (err, deals) {
            var newDeal = [];
            for (let i = 0; i < deals.length; i++){
                var publishdate = new Date(deals[i].publishdate);
                var enddate = new Date(deals[i].enddate);
                var current = new Date();
                if((publishdate <= current ) && (current <= enddate)){
                    var dealName = deals[i].name.split(' ');
                    var newName = '';
                    for (let j = 0; j < dealName.length; j++){
                        newName = newName + '-' + dealName[j];
                    }
                    newName = newName.replace('%', 'percent');
                    deals[i].newName = newName;
                    newDeal.push(deals[i]);
                }
            }
            profiles[0].deals = newDeal;
            var bname = profiles[0].bname.split(' ');
            var newName = '';
            for (var i = 0; i < bname.length; i++){
                newName = newName + '-' + bname[i];
            }
            newName = newName.replace('%', 'percent');
            profiles[0].newName = newName;
            profiles[0].email = email;
            serve.serveProfile(res, profiles[0]);
        }); 
    } else {
        res.send("Profile doesn't exists. Retry with another ID.");
    }
  });
});

router.get("/deal/:id", function (req, res) {
    var id = req.params.id;
    var email = id.split(':e:e:')[1];
    id = id.split(':e:e:')[0];
    id = id.split('-')[0];
//    var distance = req.params.distance;
    var query = Coupon.find({"_id": id});
    query.exec(function (err, deals) {
        query = Userprofile.find({"userid": deals[0].userid});
        query.select("_id bname btype baddress lat long website description");
        query.exec(function (err, profiles) {
            if(profiles){
                deals[0].bid = profiles[0]._id;
                deals[0].bname = profiles[0].bname;
                deals[0].website = profiles[0].website;
                deals[0].bdescription = profiles[0].description;
                var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
                var now = new Date();
                var enddate = new Date(deals[0].enddate);
                var timeDifference = enddate - now;
                var expirydate = new Date(deals[0].expirydate);
                enddate = months[enddate.getMonth()] + ' ' + enddate.getDate() + ', ' + enddate.getFullYear();
                deals[0].enddate1 = enddate;
                expirydate = months[expirydate.getMonth()] + ' ' + expirydate.getDate() + ', ' + expirydate.getFullYear();
                deals[0].expirydate1 = expirydate;

                deals[0].time = timeDifference;
                deals[0].btype = profiles[0].btype;
                deals[0].baddress = profiles[0].baddress;
                deals[0].lat = profiles[0].lat;
                deals[0].long = profiles[0].long;
                var bname = profiles[0].bname.split(' ');
                var newName = '';
                for (var i = 0; i < bname.length; i++){
                    newName = newName + '-' + bname[i];
                }
                newName = newName.replace('%', 'percent');
                deals[0].newName = newName;                
                deals[0].email = email;
                serve.serveDeal(res, deals[0]);
            } else {
                res.send("Deal detail doesn't exists. Retry with another ID.");
            }
        });
    }); 
  });

  router.post("/profile/:id", function (req, res, next) {
  var id = req.body.id;
  var email = req.body.email;
  var query = Userprofile.find({ "_id": id });
  query.exec(function (err, profiles) {
    if(profiles){
        console.log("***** profile : " + profiles[0]);
        query = Coupon.find({"userid": profiles[0].userid});
        query.exec(function (err, deals) {
            var newDeal = [];
            for (let i = 0; i < deals.length; i++){
                var publishdate = new Date(deals[i].publishdate);
                var enddate = new Date(deals[i].enddate);
                var current = new Date();
                if((publishdate <= current ) && (current <= enddate)){
                    var dealName = deals[i].name.split(' ');
                    var newName = '';
                    for (let j = 0; j < dealName.length; j++){
                        newName = newName + '-' + dealName[j];
                    }
                    newName = newName.replace('%', 'percent');
                    deals[i].newName = newName;
                    newDeal.push(deals[i]);
                }
                if(i == deals.length - 1) {
                    profiles[0].deals = newDeal;
                    var bname = profiles[0].bname.split(' ');
                    var newName = '';
                    for (let j = 0; i < bname.length; i++){
                        newName = newName + '-' + bname[i];
                    }
                    newName = newName.replace('%', 'percent');
                    profiles[0].newName = newName;
                    profiles[0].email = email;
                    serve.serveProfile(res, profiles[0], true);

                }
            }
        }); 
    } else {
        res.send("Profile doesn't exists. Retry with another ID.");
    }
  });
});

router.post("/deal/:id", function (req, res) {
    var id = req.body.id;
    var email = req.body.email;
    var query = Coupon.find({"_id": id});
    query.exec(function (err, deals) {
        query = Userprofile.find({"userid": deals[0].userid});
        query.select("_id bname btype baddress email lat long website description");
        query.exec(function (err, profiles) {
            if(profiles){
                deals[0].bid = profiles[0]._id;
                deals[0].bname = profiles[0].bname;
                deals[0].website = profiles[0].website;
                deals[0].bdescription = profiles[0].description;
                var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
                var now = new Date();
                var enddate = new Date(deals[0].enddate);
                var timeDifference = enddate - now;
                var expirydate = new Date(deals[0].expirydate);
                enddate = months[enddate.getMonth()] + ' ' + enddate.getDate() + ', ' + enddate.getFullYear();
                deals[0].enddate1 = enddate;
                expirydate = months[expirydate.getMonth()] + ' ' + expirydate.getDate() + ', ' + expirydate.getFullYear();
                deals[0].expirydate1 = expirydate;

                deals[0].time = timeDifference;
                deals[0].btype = profiles[0].btype;
                deals[0].baddress = profiles[0].baddress;
                deals[0].lat = profiles[0].lat;
                deals[0].long = profiles[0].long;
                var bname = profiles[0].bname.split(' ');
                var newName = '';
                for (var i = 0; i < bname.length; i++){
                    newName = newName + '-' + bname[i];
                }
                newName = newName.replace('%', 'percent');
                deals[0].newName = newName;                
                deals[0].email = email;
                serve.serveDeal(res, deals[0], true);
            } else {
                res.send("Deal detail doesn't exists. Retry with another ID.");
            }
        });
    }); 
  });

module.exports = router;