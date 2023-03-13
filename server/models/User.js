/* This code defines a Mongoose schema for a user with the following properties:

    username: A string that is required and must be unique.
    email: A string that is required and must be unique.
    password: A string that is required.
    profilePic: A string that has a default value of an empty string.
    isAdmin: A boolean that has a default value of false.

The timestamps option is set to true, which means that Mongoose will automatically add createdAt and updatedAt fields to the schema.

Finally, the module exports a Mongoose model for the schema, using the name "User". This can be used to perform CRUD (Create, Read, Update, Delete) operations on the "users" collection in a MongoDB database.
*/


const mongoose = require("mongoose");
const UserSchema = new mongoose.Schema(
    {
    username: {
        type: String,
        required: true,
        unique: true
    },

    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    profilePic: {
        type: String,
        default: ""
    },
    isAdmin: {
        type: Boolean,
        default: false
    }
},
    { timestamps: true }
)

module.exports =mongoose.model("User",UserSchema);