const Testtable = require("../model/testtable");
var express = require("express");
var router = express.Router();

/* GET home page. */
router.post("/insert", async function (req, res, next) {
  const testtabel = new Testtable({
    name: req.body.name,
    city: req.body.city,
  });
  try {
    const newTesttable = await testtabel.save();
    res.json(newTesttable);
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

module.exports = router;
