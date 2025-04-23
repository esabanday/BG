import { ObjectId } from 'mongodb';

export interface Product {
  _id?: ObjectId;
  name: string;
  description: string;
  price: number;
  image: string;
  colors: string[];
  sizes: string[];
  shopifyId?: string; // For Shopify integration
  createdAt: Date;
  updatedAt: Date;
}

export interface ProductDocument extends Product {
  _id: ObjectId;
} 