// Import the required packages and modules.
const express = require("express"); // Express web framework for Node.js
const app = express(); // Create an instance of the Express application

const dotenv = require("dotenv"); // Loads environment variables from a .env file
const cors = require('cors');

const connectDB=require('./config/connectDB');
// Load environment variables from .env file
dotenv.config();
app.use(cors());

// Import the authentication and user routes
const authRoute = require("./routes/auth");
const userRoute = require("./routes/users");
const port = process.env.PORT
// Parse requests with JSON payloads
app.use(express.json());

// Connect to MongoDB using the MONGO_URL environment variable
connectDB(process.env.MONGO_URL)

// Register the authentication and user routes with the Express application
app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);


// Start the server on port 8800 and log a message when it starts running
app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`)
});