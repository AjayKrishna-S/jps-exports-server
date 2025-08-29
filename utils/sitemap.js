const Product = require("../models/Product");
module.exports = async function (req, res) {
  try {
    const products = await Product.find().select("slug updatedAt");
    const base = process.env.FRONTEND_URL || "http://localhost:5173";
    let xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;
    xml += `<url><loc>${base}</loc><changefreq>daily</changefreq></url>`;
    products.forEach((p) => {
      xml += `<url><loc>${base}/product/${
        p._id
      }</loc><lastmod>${p.updatedAt.toISOString()}</lastmod></url>`;
    });
    xml += "\n</urlset>";
    res.header("Content-Type", "application/xml");
    res.send(xml);
  } catch (e) {
    res.status(500).send("error");
  }
};
