import dotenv from "dotenv";
import mongoose from "mongoose";
import Product from "./models/Product.js";

dotenv.config();

const products = [
  {
    name: "Royal Layered Chain",
    category: "Chains",
    price: 89999,
    image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=900&q=85",
  },
  {
    name: "Elegant Diamond Necklace",
    category: "Necklaces",
    price: 159999,
    image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=900&q=85",
  },
  {
    name: "Temple Gold Necklace",
    category: "Necklaces",
    price: 189999,
    image: "https://images.unsplash.com/photo-1617038260897-41a31f9a1d1c?auto=format&fit=crop&w=900&q=85",
  },
  {
    name: "Minimal Gold Chain",
    category: "Chains",
    price: 67999,
    image: "https://images.unsplash.com/photo-1611652022419-a9419f74343d?auto=format&fit=crop&w=900&q=85",
  },
  {
    name: "Classic Diamond Ring",
    category: "Rings",
    price: 74999,
    image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=900&q=85",
  },
  {
    name: "Ruby Drop Earrings",
    category: "Earrings",
    price: 45999,
    image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=900&q=85",
  },
  {
    name: "Layered Gold Pendant",
    category: "Chains",
    price: 82999,
    image: "https://images.unsplash.com/photo-1599643477877-530eb83abc8e?auto=format&fit=crop&w=900&q=85",
  },
  {
    name: "Diamond Link Bracelet",
    category: "Bracelets",
    price: 98999,
    image: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&w=900&q=85",
  },
  {
    name: "Pearl Heritage Necklace",
    category: "Necklaces",
    price: 112999,
    image: "https://images.unsplash.com/photo-1535632787350-4e68ef0ac584?auto=format&fit=crop&w=900&q=85",
  },
  {
    name: "Infinity Gold Chain",
    category: "Chains",
    price: 91999,
    image: "https://images.unsplash.com/photo-1601121141461-9d6647bca1ed?auto=format&fit=crop&w=900&q=85",
  },
  {
    name: "Emerald Statement Ring",
    category: "Rings",
    price: 68999,
    image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=900&q=85",
  },
  {
    name: "Pearl Drop Earrings",
    category: "Earrings",
    price: 32499,
    image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=900&q=85",
  },
  {
    name: "Classic Gold Bracelet",
    category: "Bracelets",
    price: 56999,
    image: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&w=900&q=85",
  },
  {
    name: "Royal Solitaire Ring",
    category: "Rings",
    price: 48999,
    image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=900&q=85",
  },
  {
    name: "Heritage Gold Necklace",
    category: "Necklaces",
    price: 124999,
    image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=900&q=85",
  },
  {
    name: "Modern Link Chain",
    category: "Chains",
    price: 77999,
    image: "https://images.unsplash.com/photo-1617038260897-41a31f9a1d1c?auto=format&fit=crop&w=900&q=85",
  },
];

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.error("MONGODB_URI is missing.");
  process.exit(1);
}

const connectionString = MONGODB_URI.replace(
  /\/\?replicaSet/,
  "/supriya_jewellery?replicaSet"
);

try {
  await mongoose.connect(connectionString);

  console.log("Connected to MongoDB");
  console.log("Database:", mongoose.connection.name);

  await Product.deleteMany({});
  await Product.insertMany(products);

  console.log(`${products.length} products inserted successfully`);

  await mongoose.disconnect();
  console.log("Disconnected from MongoDB");
} catch (error) {
  console.error("Seeding failed:", error);
  await mongoose.disconnect();
  process.exit(1);
}