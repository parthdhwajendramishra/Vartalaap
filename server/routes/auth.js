// Import required libraries and models
const router = require("express").Router();
const User = require("../models/User");
const CryptoJs = require("crypto-js");
const jwt = require("jsonwebtoken");

const loginController=require("../controllers/authController");

// Register endpoint
router.post("/register", async (req, res) => {
  // Create a new user object using the User model
  const newUser = new User({
    username: req.body.username,
    email: req.body.email,
    // Encrypt the password using AES encryption from CryptoJS
    password: CryptoJs.AES.encrypt(
      req.body.password,
      process.env.SECRET_KEY
    ).toString(),
  });

  try {
    // Save the new user to the database
    const user = await newUser.save();
    // Return a HTTP status of 201 and the newly created user object
    res.status(201).json(user);
  } catch (err) {
    // Return a HTTP status of 500 and the error object if there's an error
    res.status(500).json(err);
  }
});

// Login endpoint
console.log(loginController.loginController);
router.post("/login", loginController);




// Export the router object
module.exports = router;