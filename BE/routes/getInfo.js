var express = require("express");
var router = express.Router();

const User = require("../model/users");
const Userprofile = require("../model/userprofiles");
const Coupon = require("../model/coupons");

router.post("/profile", function (req, res) {
    var id = req.body.id;
    var query = Userprofile.find({ "_id": id });
    query.exec(function (err, profiles) {
        if(profiles){
            query = Coupon.find({"userid": profiles[0].userid});
            query.exec(function (err, deals) {
                var newDeal = [];
                for (var i = 0; i < deals.length; i++){
                    var publishdate = new Date(deals[i].publishdate);
                    var enddate = new Date(deals[i].enddate);
                    var current = new Date();
                    if((publishdate <= current ) && (current <= enddate)){
                        newDeal.push(deals[i]);
                    }
                }
                var sendObj = { profile: profiles[0], deals: newDeal};
                console.log("***** profile : " + sendObj);
                res.send(sendObj);
            }); 
        } else {
            res.send('fail');
        }
    });
});
router.post("/deal", function (req, res) {
    var id = req.body.id;
    var query = Coupon.find({"_id": id});
    query.exec(function (err, deals) {
        query = Userprofile.find({"userid": deals[0].userid});
        query.select("_id bname btype lat long baddress website description");
        query.exec(function (err, profiles) {
            if(profiles){
                var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
                var now = new Date();
                var enddate = new Date(deals[0].enddate);
                var timeDifference = enddate - now;
                var expirydate = new Date(deals[0].expirydate);
                enddate = months[enddate.getMonth()] + ' ' + enddate.getDate() + ', ' + enddate.getFullYear();
                expirydate = months[expirydate.getMonth()] + ' ' + expirydate.getDate() + ', ' + expirydate.getFullYear();
                
                var other = {
                    enddate: enddate,
                    expirydate: expirydate,
                    time: timeDifference,
                    bid : profiles[0]._id,
                    bname : profiles[0].bname,
                    website : profiles[0].website,
                    bdescription : profiles[0].description,
                    btype: profiles[0].btype,
                    baddress: profiles[0].baddress,
                    lat: profiles[0].lat,
                    long: profiles[0].long
                }
                var sendObj = {
                    deals: deals[0],
                    other: other
                }

                res.send(sendObj);
            } else {
                res.send('fail');
            }
        });
    }); 
});

module.exports = router;