import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Gallery from './models/gallery.model.js';
import connectDB from './config/db.js';

dotenv.config();

await connectDB();

const checkGallery = async () => {
  const items = await Gallery.find({});
  console.log('--- Gallery Items in DB ---');
  console.log(JSON.stringify(items, null, 2));
  process.exit();
};

checkGallery();
