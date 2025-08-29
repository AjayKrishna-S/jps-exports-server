const mongoose = require("mongoose");
const Product = require("../models/Product");
require("dotenv").config();

async function run() {
  await mongoose.connect(process.env.MONGO_URI);
  const items = [
    {
      name: "Coconut (Tender)",
      excerpt: "Premium tender coconut for beverage and oil.",
      description: "Farm-fresh tender coconuts...",
      origin: "Kerala, India",
      minOrder: "1000 pcs",
      imageUrl: "/images/coconut.jpg",
      tags: ["coconut", "tender coconut", "kerala"],
    },
    {
      name: "Moringa Leaf (Dried)",
      excerpt: "Nutrient-rich moringa leaf powder.",
      description: "Organic moringa leaves, sun-dried...",
      origin: "Tamil Nadu",
      minOrder: "50 kg",
      imageUrl: "/images/moringa.jpg",
      tags: ["moringa", "leaf", "powder"],
    },
  ];
  await Product.insertMany(items);
  console.log("seeded");
  process.exit(0);
}
run();
