import { v2 as cloudinary } from "cloudinary";
import productModel from "../model/productModel.js";

const addProduct = async (req, res) => {
  try {
    const { name, description, price, category, sizes, bestseller } = req.body;

    // Handle images dynamically
    const images = Object.values(req.files || {}).flat();
    let imagesUrl = await Promise.all(
      images.map(async (item) => {
        let result = await cloudinary.uploader.upload(item.path, {
          resource_type: "image",
        });
        return result.secure_url;
      })
    );

    const productData = {
      name,
      description,
      price: Number(price),
      category,
      sizes: JSON.parse(sizes),
      bestseller: bestseller === "true",
      images: imagesUrl,
      date: Date.now(),
    };

    console.log(productData);

    const product = new productModel(productData);
    await product.save();

    res
      .status(201)
      .json({ success: true, message: "Product added successfully" });
  } catch (error) {
    console.error("Error adding product:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Function to list products
const listProduct = async (req, res) => {
  try {
    const products = await productModel.find({});
    res.status(200).json({ success: true, products });
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Function to remove a product
const removeProduct = async (req, res) => {
  try {
    const { id } = req.body;
    await productModel.findByIdAndDelete(req.body.id);
    res.status(200).json({ success: true, message: "Product removed" });
  } catch (error) {
    console.error("Error removing product:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Function to get a single product
const singleProduct = async (req, res) => {
  try {
    const { productId } = req.body;
    const product = await productModel.findById(productId);

    res.status(200).json({ success: true, product });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

export { addProduct, removeProduct, singleProduct, listProduct };
