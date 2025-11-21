import mongoose from 'mongoose';
import Product from '../models/product.model.js';

export const getProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    res.status(200).json({
      success: true,
      message: 'All products have been successfully fetched from the database.',
      data: products,
    });
  } catch (error) {
    console.error(`Error on fetching products: ${error.message}`);
    res.status(500).json({
      success: false,
      message: 'Server error',
    });
  }
};

export const createProduct = async (req, res) => {
  const product = req.body;

  if (!product.name || !product.price || !product.image) {
    return res.status(400).json({
      success: false,
      message: 'Please provide all fields',
    });
  }

  const newProduct = new Product(product);

  try {
    await newProduct.save();
    res.status(201).json({
      success: true,
      data: newProduct,
      message: 'New product has been saved.',
    });
  } catch (error) {
    console.error(`Error saving product: ${error.message}`);
    res.status(500).json({
      success: false,
      message: 'Server Error',
    });
  }
};

export const updateProduct = async (req, res) => {
  const { id } = req.params;
  const product = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({
      success: false,
      message: 'Product not found',
    });
  }

  try {
    const updatedProduct = await Product.findByIdAndUpdate(id, product, {
      new: true,
    });
    res.status(200).json({
      success: true,
      message: 'Product have been updated.',
      data: updatedProduct,
    });
  } catch (error) {
    console.error(`Error updating product: ${error.message}`);
    res.status(500).json({
      success: false,
      message: 'Server Error',
    });
  }
};

export const deleteProduct = async (req, res) => {
  const { id } = req.params;
  try {
    await Product.findByIdAndDelete(id);
    res.status(200).json({
      success: true,
      message: 'Product deleted',
    });
  } catch (error) {
    console.error(`Error deleting product: ${error.message}`);
    res.status(404).json({
      success: false,
      message: 'Can not find a product by this id.',
    });
  }
};
