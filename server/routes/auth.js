// Import required libraries and models
const router = require("express").Router();
const verify = require("../middleware/verifyToken"); // Middleware for verifying user authentication token

const {loginController,registerController,passwordResetController}=require("../controllers/authController");

// Register endpoint
router.post("/register", registerController);

// Login endpoint
router.post("/login", loginController);

//Reset password endpoint
router.post("/reset_password",verify,passwordResetController);


// Export the router object
module.exports = router;