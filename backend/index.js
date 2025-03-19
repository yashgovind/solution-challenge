const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const path = require("path");
require("dotenv").config();
const mongoose = require("mongoose");
const ejs = require("ejs");
const cors = require("cors");
const DB_NAME = 'solution challenge';
const session = require("express-session");
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const userRoutes = require('./routes/userRouter');
const aiResponseRoutes = require('./routes/aiResponse');
const authRoute = require("./middleware/auth");
const contentResponse = require("./")

const ejs = require("ejs");
app.use(cors());


const authRoute = require("./routes/loginSignup");
 // SET UP SESSION------below code comes from express-session
 app.use(session({
  secret: process.env.PASSPORT_LONG_SECRET,
  resave: false,
  saveUninitialized: false
 }));
 app.use(express.json());
 app.set("view engine", "ejs");
 app.use(cookieParser());
 app.use(express.urlencoded({ extended: true }));
 app.use(express.static(path.join(__dirname, "public")));
 // some more standard middlewares.
 app.use(passport.initialize());
 app.use(passport.session());
// middlware for passportjs


// auth router.

app.use("/api", authRoute);
app.use('/api', userRoutes);
app.use('/api', aiResponseRoutes);
app.use('/api', contentResponse);
app.use('/api', googleProxyRoutes);

//connections.
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log(`database connected at instance ${process.env.MONGO_URI}/${DB_NAME}`);
  })
  .catch((err) => {
    console.log("error connecting to database", err);
  });

app.listen(process.env.PORT, async () => {
    console.log(`connected to server at port ${process.env.PORT}`);
})
