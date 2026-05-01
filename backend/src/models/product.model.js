import mongoose from 'mongoose';

const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
      default: 0,
    },
    category: {
      type: String,
      required: true,
      enum: ['Paintings', 'Sketches', 'Custom Art', 'Digital'],
    },
    images: {
      type: [String],
      required: true,
    },
    size: {
      type: String,
    },
    material: {
      type: String,
    },
    stock: {
      type: Number,
      required: true,
      default: 1,
    },
    isFeatured: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model('Product', productSchema);

export default Product;
