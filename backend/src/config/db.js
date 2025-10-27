// /backend/src/config/db.js

import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    // Ensure MONGO_URI is set in the .env file
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ MongoDB Connected');
  } catch (err) {
    console.error('❌ DB Connection Failed:', err.message);
    // Exit process with failure
    process.exit(1);
  }
};

export default connectDB;