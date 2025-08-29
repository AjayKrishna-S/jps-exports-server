const mongoose = require("mongoose");
const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, index: true },
    slug: { type: String, index: true },
    excerpt: String,
    description: String,
    origin: String,
    minOrder: String,
    imageUrl: String,
    tags: [String],
    currency: String,
  },
  { timestamps: true }
);
productSchema.index({ name: "text", description: "text", tags: "text" });
module.exports = mongoose.model("Product", productSchema);
