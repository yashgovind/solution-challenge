require("dotenv").config();
const express = require("express");
const passport = require("passport");
const { isAuthenticated } = require("../middlewares/auth");
const router = express.Router();

// normal authentication. success --> /profile. failure --> /login
router.post("/api/login",
  passport.authenticate("local", {
    successRedirect: "/api/profile",
    failureRedirect: "/api/login",
  })
);

router.get("/auth/google", passport.authenticate("google", { scope: ["profile", "email"] }));
router.get("/auth/google/callback",
  passport.authenticate("google", { successRedirect: "/api/profile", failureRedirect: "/api" })
);

router.use(isAuthenticated);

// profile route
router.get("/api/profile", (req, res) => {
  res.send(`<h1>Welcome, ${req.user.displayName}</h1> <a href='/api/logout'>Logout</a>`);
});

// logout
router.get("/api/logout", (req, res) => {
  req.logout(() => {
    res.redirect("/api");
  });
});

// default route
router.get("/api", (req, res) => {
  res.render("loginPage");
});

module.exports = router;