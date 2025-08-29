const express = require("express");
const router = express.Router();
const Product = require("../models/Product");
const auth = require("../middleware/auth");
const slugify = require("slugify");

// Public list + search
router.get("/", async (req, res) => {
  const q = req.query.q || "";
  const filter = q ? { $text: { $search: q } } : {};
  const products = await Product.find(filter).limit(
    parseInt(req.query.limit || 50)
  );
  res.json(products);
});

// Public single
router.get("/:id", async (req, res) => {
  const p = await Product.findById(req.params.id);
  res.json(p);
});

// Admin CRUD
router.post("/", auth("admin"), async (req, res) => {
  const body = req.body;
  body.slug = slugify(body.name || "", { lower: true });
  const p = await Product.create(body);
  res.json(p);
});
router.put("/:id", auth("admin"), async (req, res) => {
  const p = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.json(p);
});
router.delete("/:id", auth("admin"), async (req, res) => {
  await Product.findByIdAndDelete(req.params.id);
  res.json({ ok: true });
});

module.exports = router;
