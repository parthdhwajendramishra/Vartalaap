const User = require("../models/User");
const CryptoJs = require("crypto-js");
const jwt = require("jsonwebtoken");

const loginController=async (req, res) => {
    try {
      // Find the user with the given email address
      const user = await User.findOne({ email: req.body.email });
      // Return a HTTP status of 401 and an error message if no user is found
      !user && res.status(401).json("Wrong password or username!");
  
      // Decrypt the user's password and convert it to a string
      const bytes = CryptoJs.AES.decrypt(user.password, process.env.SECRET_KEY);
      const originalPassword = bytes.toString(CryptoJs.enc.Utf8);
  
      // Return a HTTP status of 401 and an error message if the password is incorrect
      originalPassword !== req.body.password &&
        res.status(401).json("Wrong password or username!");
  
      // Generate a new JWT with the user's ID and isAdmin status, using the secret key from the environment variables and an expiration of 5 days
      const accessToken = jwt.sign(
        { id: user._id, isAdmin: user.isAdmin },
        process.env.SECRET_KEY,
        { expiresIn: "5d" }
      );
  
      // Remove the password from the user object and return it along with the access token
      const { password, ...info } = user._doc;
      res.status(200).json({ ...info, accessToken });
    } catch (err) {
      // Return a HTTP status of 500 and the error object if there's an error
      res.status(500).json(err);
    }
  }

  module.exports=loginController;