const mongoose = require("mongoose");
const orderSchema = new mongoose.Schema(
  {
    productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
    name: String,
    email: String,
    company: String,
    message: String,
    sourceIp: String,
  },
  { timestamps: true }
);
module.exports = mongoose.model("Order", orderSchema);
