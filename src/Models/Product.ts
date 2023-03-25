import mongoose from 'mongoose';
import { Schema, model } from 'mongoose';

interface Product {
  storeId: mongoose.Schema.Types.ObjectId;
  productName: string;
  image: string;
  detail: string;
  price: number;
  date: Date;
}

const productSchema = new Schema<Product>({
  storeId: {
    type: Schema.Types.ObjectId,
    ref: 'Store',
    required: true,
  },
  productName: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  detail: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
});

export default model<Product>('products', productSchema);
