const express = require("express");
const session = require("express-session");
const passport = require("passport");

const cors = require("cors");

const mongoose = require("mongoose"); //mongoose require kiya
const chalk = require("chalk");
const constant = require("./config/constants");
require("dotenv").config();
MONGODB_URI = process.env.MONGODB_URI;

const app = express();
app.use(session({ secret: "cats" }));
app.use(passport.initialize());
app.use(passport.session());
require("./config/googleauth");
const { Response } = require('./model/responce.model');

const loginRouter = require("./routes/login.routes");
const signupRouter = require("./routes/signup.routes");
const contactRouter = require("./routes/contact.routes");
const genrelUser = require("./routes/genraluser.routes")
const membersoradminUser=require("./routes/membersoradmin.routes");
const adminUser=require("./routes/admin.routes");
const userRouter=require("./routes/user.routes");


app.use(cors());

const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));


app.response.unauthorizedUser = function(message, data, displayMessage, code) {
  console.log(chalk.yellow('Unauthorized User'));
  this.status(200).send(
    Response('error', 'Unauthorized User', {displayMessage:`User is Unauthorized`}, undefined, 403),
  );
};

app.response.success = function(message, data, displayMessage, code) {
  console.log(chalk.green(message));
  this.status(200).send(
    Response('success', message, data, displayMessage, code),
  );
};

app.response.error = function(message, data, displayMessage, code) {
  console.log(chalk.red(message));
  if (data) {
    console.log(chalk.red(data));
  }
  message = typeof message != 'string' ? 'Something went wrong' : message;
  this.status(200).send(Response('error', message, data, displayMessage, code));
};

app.use("/user", userRouter);
app.use("/login", loginRouter);
app.use("/signup", signupRouter);
app.use("/contact", contactRouter);
app.use("/genraluser", genrelUser);
app.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["email", "profile"] })
);
app.get(
  "/signup/google/callback",
  passport.authenticate("google", {
    successRedirect: "http://localhost:3001/#account",
    failureRedirect: "/signup/auth/failure",
  })
);
app.use("/member", membersoradminUser);
app.use("/admin", adminUser);
mongoose
  .connect(MONGODB_URI) //mongoose database connect ho jaye
  .then((result) => {
    //than tab hi server on ho
    console.log(
      chalk.green.bold(
        `
        Yep this is working 🍺
        App listen on port: ${constant.PORT} 🍕
        Env: ${process.env.NODE_ENV} 🦄
      `
      )
    );
    app.listen(constant.PORT);
  })
  .catch((err) => {
    console.log(chalk.red("Cannot run!"));
  });
