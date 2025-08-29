const express = require("express");
const router = express.Router();
const Order = require("../models/Order");
const Product = require("../models/Product");
const sendMail = require("../utils/mail");

router.post("/", async (req, res) => {
  const data = req.body;
  const ip = req.ip || req.headers["x-forwarded-for"] || "unknown";
  const order = await Order.create({ ...data, sourceIp: ip });
  const product = await Product.findById(data.productId);
  // send email to admin
  await sendMail(
    process.env.ADMIN_EMAIL,
    `New product request: ${product?.name || "unknown"}`,
    `Name: ${data.name}\nEmail: ${data.email}\nCompany: ${data.company}\nMessage: ${data.message}`
  );
  res.json({ ok: true });
});

module.exports = router;
