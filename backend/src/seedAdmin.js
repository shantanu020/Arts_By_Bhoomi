import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import User from './models/user.model.js';
import connectDB from './config/db.js';

dotenv.config();

await connectDB();

const seedAdmin = async () => {
  try {
    const adminExists = await User.findOne({ email: 'admin@artsbybhoomi.com' });

    if (adminExists) {
      console.log('Admin user already exists');
      process.exit();
    }

    // Creating password (the model hashes it automatically in pre-save hook)
    const adminUser = new User({
      name: 'Bhoomi Admin',
      email: 'admin@artsbybhoomi.com',
      password: 'adminpassword123',
      role: 'admin',
    });

    await adminUser.save();
    console.log('Admin user created successfully');
    console.log('Email: admin@artsbybhoomi.com');
    console.log('Password: adminpassword123');
    process.exit();
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

seedAdmin();
