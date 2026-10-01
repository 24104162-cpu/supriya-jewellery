import dotenv from "dotenv";

dotenv.config();

import express from "express";
import mongoose from "mongoose";
import cors from "cors";

import Product from "./models/Product.js";
import Order from "./models/Order.js";

const app = express();

app.use(cors());
app.use(express.json());


// ===============================
// MongoDB Connection
// ===============================

console.log(
  "MONGODB_URI loaded:",
  process.env.MONGODB_URI ? "YES" : "NO"
);

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("MongoDB connected successfully");
    console.log("Database name:", mongoose.connection.name);
  })
  .catch((error) => {
    console.error("MongoDB connection failed:", error);
  });


// ===============================
// TEST ROUTE
// ===============================

app.get("/", (req, res) => {
  res.send("Supriya Jewellery Backend is Running");
});


// ===============================
// PRODUCT ROUTES
// ===============================

// Get all products
app.get("/api/products", async (req, res) => {
  try {
    const products = await Product.find();
    console.log("Product count:", products.length);

    res.json(products);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch products",
      error: error.message,
    });
  }
});


// Add a product
app.post("/api/products", async (req, res) => {
  try {
    const product = new Product(req.body);

    const savedProduct = await product.save();

    res.status(201).json(savedProduct);
  } catch (error) {
    res.status(400).json({
      message: "Failed to add product",
      error: error.message,
    });
  }
});


// Test route
app.get("/test", (req, res) => {
  res.send("TEST ROUTE WORKS");
});


// ===============================
// ORDER ROUTES
// ===============================

// Create a new order
app.post("/api/orders", async (req, res) => {
  try {
    const {
      customerName,
      phone,
      address,
      items,
      total,
    } = req.body;

    if (
      !customerName ||
      !phone ||
      !address ||
      !items ||
      items.length === 0 ||
      total === undefined
    ) {
      return res.status(400).json({
        message: "Please provide all required order details.",
      });
    }

    const order = new Order({
      customerName,
      phone,
      address,
      items,
      total,
      status: "Placed",
    });

    const savedOrder = await order.save();

    res.status(201).json({
      message: "Order placed successfully",
      order: savedOrder,
    });

  } catch (error) {
    console.error("Order creation failed:", error);

    res.status(500).json({
      message: "Failed to place order",
      error: error.message,
    });
  }
});


// Get all orders
app.get("/api/orders", async (req, res) => {
  try {
    const orders = await Order.find().sort({
      createdAt: -1,
    });

    res.json(orders);

  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch orders",
      error: error.message,
    });
  }
});


// Get one order
app.get("/api/orders/:id", async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({
        message: "Order not found",
      });
    }

    res.json(order);

  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch order",
      error: error.message,
    });
  }
});


// ===============================
// START SERVER
// ===============================

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});