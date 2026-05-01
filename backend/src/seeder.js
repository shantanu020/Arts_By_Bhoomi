import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Product from './models/product.model.js';
import User from './models/user.model.js';
import Blog from './models/blog.model.js';
import connectDB from './config/db.js';

dotenv.config();

connectDB();

const products = [
  {
    title: 'Serenity in Blue',
    price: 15000,
    description: 'An oil painting exploring peaceful blue gradients.',
    images: ['https://images.unsplash.com/photo-1541961017774-22349e4a1262?q=80&w=1000&auto=format&fit=crop'],
    category: 'Paintings',
    stock: 1,
  },
  {
    title: 'Charcoal Portrait',
    price: 5000,
    description: 'A deep charcoal sketch on textured paper.',
    images: ['https://images.unsplash.com/photo-1580136608260-4ebceb8e4e9f?q=80&w=1000&auto=format&fit=crop'],
    category: 'Sketches',
    stock: 0,
  },
  {
    title: 'Golden Hour',
    price: 12000,
    description: 'Acrylic landscape captured during sunset.',
    images: ['https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?q=80&w=1000&auto=format&fit=crop'],
    category: 'Paintings',
    stock: 1,
  },
];

const blogs = [
  {
    title: 'How to Start with Charcoal Sketches',
    slug: 'start-charcoal-sketches',
    excerpt: 'Learn the basic techniques and tools needed to begin your journey with charcoal art.',
    content: '<h1>Charcoal Basics</h1><p>Charcoal is one of the most expressive mediums...</p>',
    coverImage: 'https://images.unsplash.com/photo-1580136608260-4ebceb8e4e9f?q=80&w=1000&auto=format&fit=crop',
    category: 'Tutorial',
    isPublished: true,
  },
  {
    title: 'The Magic of Acrylic Gradients',
    slug: 'magic-acrylic-gradients',
    excerpt: 'Exploring how to blend colors seamlessly using acrylic paints for stunning sunsets.',
    content: '<h1>Acrylic Blending</h1><p>Blending acrylics requires speed and the right brushes...</p>',
    coverImage: 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?q=80&w=1000&auto=format&fit=crop',
    category: 'Process',
    isPublished: true,
  },
];

const importData = async () => {
  try {
    await Product.deleteMany();
    await Blog.deleteMany();

    await Product.insertMany(products);
    await Blog.insertMany(blogs);

    console.log('Data Imported!');
    process.exit();
  } catch (error) {
    console.error(`${error}`);
    process.exit(1);
  }
};

importData();
