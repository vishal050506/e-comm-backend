// import { v2 as cloudinary } from "cloudinary";
// import productModel from "../model/productModel.js";

// const addProduct = async (req, res) => {
//   try {
//     const { name, description, price, category, sizes, bestseller } = req.body;

//     const image1 = req.files.image1 ? req.files.image1[0] : null;
//     const image2 = req.files.image2 ? req.files.image2[0] : null;
//     const image3 = req.files.image3 ? req.files.image3[0] : null;
//     const image4 = req.files.image4 ? req.files.image4[0] : null;

//     const images = [image1, image2, image3, image4].filter(Boolean);

//     if (images.length === 0) {
//       return res
//         .status(400)
//         .json({ success: false, message: "No images uploaded" });
//     }

//     let imagesUrl = await Promise.all(
//       images.map(async (item) => {
//         let result = await cloudinary.uploader.upload(item.path, {
//           resource_type: "image",
//         });
//         return result.secure_url;
//       })
//     );

//     // console.log("Images URL Array:", imagesUrl); // Debugging ✅

//     const productData = {
//       name,
//       description,
//       price: Number(price),
//       category,
//       sizes: JSON.parse(sizes),
//       image: imagesUrl, //this is an array
//       bestseller: bestseller === "true",
//       date: Date.now(),
//     };

//     // console.log("Product Data Before Saving:", productData); // Debugging ✅

//     const product = new productModel(productData);
//     await product.save(); // this is awaited

//     res.json({ success: true, message: "Product Added Successfully", product });
//   } catch (error) {
//     console.error("Error Saving Product:", error);
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// // Function to list products
// const listProduct = async (req, res) => {
//   // try {
//   //   const products = await productModel.find({});
//   //   res.status(200).json({ success: true, products });
//   // } catch (error) {
//   //   console.error("Error fetching products:", error);
//   //   res.status(500).json({ success: false, message: error.message });
//   // }
// };

// // Function to remove a product
// const removeProduct = async (req, res) => {
//   try {
//     const { id } = req.body;
//     await productModel.findByIdAndDelete(req.body.id);
//     res.status(200).json({ success: true, message: "Product removed" });
//   } catch (error) {
//     console.error("Error removing product:", error);
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// // Function to get a single product
// const singleProduct = async (req, res) => {
//   // try {
//   //   const { productId } = req.body;
//   //   const product = await productModel.findById(productId);
//   //   res.status(200).json({ success: true, product });
//   // } catch (error) {
//   //   res.json({ success: false, message: error.message });
//   // }
// };

// export { addProduct, removeProduct, singleProduct, listProduct };
import { v2 as cloudinary } from "cloudinary";
import productModel from "../model/productModel.js";

const addProduct = async (req, res) => {
  try {
    const { name, description, price, category, sizes, bestseller } = req.body;

    const image1 = req.files.image1 && req.files.image1[0];
    const image2 = req.files.image2 && req.files.image2[0];
    const image3 = req.files.image3 && req.files.image3[0];
    const image4 = req.files.image3 && req.files.image4[0];

    const images = [image1, image2, image3, image4].filter(
      (item) => item !== undefined
    );

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
      image: imagesUrl,
      bestseller: bestseller === "true" ? true : false,
      date: Date.now(),
    };
    console.log(productData);
    const product = new productModel(productData);
    await product.save();
    res.json({ success: true, message: "Product Added Successfully" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
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
