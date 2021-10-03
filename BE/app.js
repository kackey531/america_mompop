require("dotenv").config();
var createError = require("http-errors");
var express = require("express");
var cors = require("cors");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
var exphbs  = require('express-handlebars');
const saltRounds = 10;
mongoose.connect("mongodb://localhost:27017/mom", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: true,
});
var app = express();
app.use(cors());
var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var eventsRouter = require("./routes/events");
var dealsRouter = require("./routes/deals");
var testtableRouter = require("./routes/testtable");
var couponsRouter = require("./routes/coupons");
var favRouter = require("./routes/fav");
var customerRouter = require("./routes/customers");
var paymentRouter = require("./routes/payments");
var getBusinessInfoRouter = require('./routes/getBusinessInfo');
var getInfoRouter = require('./routes/getInfo');
var getBusListRouter = require('./routes/getBusList');
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
  //console.log(process.env.JWT_TOKEN);
  console.log("connected!");
});
// view engine setup
app.set("views", "./views/");
//app.set("view engine", "pug");
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/events", eventsRouter);
app.use("/deals", dealsRouter);
app.use("/testtables", testtableRouter);
app.use("/coupons", couponsRouter);
app.use("/fav", favRouter);
app.use("/customers",customerRouter);
app.use("/payments",paymentRouter);
app.use("/businessinfo", getBusinessInfoRouter);
app.use("/getinfo", getInfoRouter);
app.use("/search", getBusListRouter);
// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});
app.use(express.static('public'));
// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
