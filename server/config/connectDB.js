const mongoose = require("mongoose"); // Mongoose object modeling for MongoDB

const connectDB = async (DATABASE_URL) => {
  try {
    const DB_OPTIONS = {
      dbName: "Vartalaap"
    }
    await mongoose.connect(DATABASE_URL, DB_OPTIONS)
    console.log('Database Connected Successfully...')
  } catch (error) {
    console.log(error)
  }
}


module.exports = connectDB