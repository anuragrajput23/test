const mongoose = require("mongoose");

/**
 * Establish connection to MongoDB database
 * @returns {Promise} MongoDB connection object
 */
const connectDB = async () => {
  try {
    const mongoUri =
      process.env.MONGODB_URI || "mongodb://localhost:27017/algotracker";

    const conn = await mongoose.connect(mongoUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log(`[INFO] MongoDB connected: ${conn.connection.host}`);

    return conn;
  } catch (error) {
    console.error(`[ERROR] Database connection failed: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;
