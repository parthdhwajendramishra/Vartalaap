// Require necessary modules
const router = require("express").Router(); // Router middleware for Express
const User = require("../models/User"); // User model for MongoDB database
const CryptoJS = require("crypto-js"); // CryptoJS library for encrypting user password
const verify = require("../middleware/verifyToken"); // Middleware for verifying user authentication token

// Update user route
router.put("/:id", verify, async (req, res) => {
  // Check if user is authorized to update account
  if (req.user.id === req.params.id || req.user.isAdmin) {
    // If user wants to update password, encrypt the new password
    if (req.body.password) {
      req.body.password = CryptoJS.encrypt(
        req.body.password,
        process.env.SECRET_KEY
      ).toString();
    }

    try {
      // Update user's account with new information
      const updatedUser = await User.findByIdAndUpdate(req.params.id, {
        $set: req.body,
      });

      // Return updated user object as JSON response
      res.status(200).json(updatedUser);
    } catch (err) {
      // If error occurred, return error as JSON response
      res.status(500).json(err);
    }
  } else {
    // If user is not authorized to update account, return 403 error
    res.status(403).json("You can update only your account!");
  }
});

// Delete user route
router.delete("/:id", verify, async (req, res) => {
  // Check if user is authorized to delete account
  if (req.user.id === req.params.id || req.user.isAdmin) {
    try {
      // Delete user's account
      const updatedUser = await User.findByIdAndDelete(req.params.id);
      // Return success message as JSON response
      res.status(200).json("User has been deleted...");
    } catch (err) {
      // If error occurred, return error as JSON response
      res.status(500).json(err);
    }
  }
});

// Find user by ID route
router.get("/find/:id", async (req, res) => {
  try {
    // Find user by ID
    const user = await User.findById(req.params.id);
    // Remove password from user object and return remaining user info as JSON response
    const { password, ...info } = user._doc;
    res.status(200).json(info);
  } catch (err) {
    // If error occurred, return error as JSON response
    res.status(500).json(err);
  }
});

// Get all users route
router.get("/", verify, async (req, res) => {
  // Check if user is authorized to view all users
  if (req.user.isAdmin) {
    try {
      const query = req.query.new; // Check if query parameter 'new' exists
      console.log("Getting all data");
      // If query parameter 'new' exists, return only 2 most recent users
      const users = query
        ? await User.find().sort({ _id: -1 }).limit(2)
        : await User.find(); // Otherwise, return all users
      // Return array of users as JSON response
      res.status(200).json(users);
    } catch (err) {
      // If error occurred, return error as JSON response
      res.status(500).json(err);
    }
  } else {
    // If user is not authorized to view all users, return 403 error
    res.status(403).json("You are not allowed to see all users");
  }
});


// This code sets up a route for GET users stats
router.get("/stats", async (req, res) => {
    // Create a new Date object representing today's date, and then set another Date object representing the date one year ago.
    const today = new Date();
    const lastYear = today.setFullYear(today.getFullYear() - 1);
  
    try {
      // Use the aggregate() method of the User model to query the database and group the user documents by the month in which they were created.
      const data = await User.aggregate([
        {
          $project: {
            month: { $month: "$createdAt" },
          },
        },
        {
          $group: {
            _id: "$month",
            total: { $sum: 1 },
          },
        },
      ]);
      // Send a JSON response to the client with a status of 200 and the aggregated data.
      res.status(200).json(data);
    } catch (err) {
      // If there is an error, send a JSON response with a status of 500 and the error message.
      res.status(500).json(err);
    }
  });
  




module.exports = router