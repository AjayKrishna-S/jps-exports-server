const jwt = require("jsonwebtoken");
module.exports = function (requiredRole) {
  return function (req, res, next) {
    const auth = req.headers.authorization?.split(" ")[1];
    if (!auth) return res.status(401).json({ error: "No token" });
    try {
      const payload = jwt.verify(auth, process.env.JWT_SECRET);
      req.user = payload;
      if (requiredRole && payload.role !== requiredRole)
        return res.status(403).json({ error: "Forbidden" });
      next();
    } catch (e) {
      return res.status(401).json({ error: "Invalid token" });
    }
  };
};
