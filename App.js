const express = require("express");

const cors=require("cors");
const mongoose = require("mongoose"); //mongoose require kiya
const chalk = require("chalk");
const constant = require("./config/constants");
require("dotenv").config();
MONGODB_URI = process.env.MONGODB_URI;
const app = express();
const loginRouter = require("./routes/login.routes");
const signupRouter = require("./routes/signup.routes");
app.use(cors());

const bodyParser = require("body-parser"); 
app.use(bodyParser.urlencoded({ extended: false })); 

app.use("/login", loginRouter);
app.use("/signup", signupRouter);

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
