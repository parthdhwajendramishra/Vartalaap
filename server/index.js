// Import the required packages and modules.
const express = require("express"); // Express web framework for Node.js
const app = express(); // Create an instance of the Express application
const mongoose = require("mongoose"); // Mongoose object modeling for MongoDB
const dotenv = require("dotenv"); // Loads environment variables from a .env file

// Load environment variables from .env file
dotenv.config();

// Import the authentication and user routes
const authRoute = require("./routes/auth");
const userRoute = require("./routes/users");
const port = process.env.PORT
// Parse requests with JSON payloads
app.use(express.json());

// Connect to MongoDB using the MONGO_URL environment variable
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("Database Connected")) // Log a message if the connection is successful
  .catch((err) => console.log(err)); // Log an error message if the connection fails

// Register the authentication and user routes with the Express application
app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);


// Start the server on port 8800 and log a message when it starts running
app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`)
});