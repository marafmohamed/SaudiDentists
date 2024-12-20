const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const Dentist = require("../Models/DentistModel");
const Admin = require("../Models/AdminModel");

router.post("/verifyTokenDentist", async (req, res) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(401).json({ error: "Authorization is required" });
  }
  const token = authorization.split(" ")[1];
  try {
    const decodedToken = jwt.verify(token, process.env.SECRET);

    // Check if token is expired
    if (Date.now() >= decodedToken.exp * 1000) {
      return res.status(401).json({ error: "Token is expired" });
    }

    const { _id } = decodedToken;
    req.user = await Dentist.findById(_id);
    if (!req.user) {
      return res.status(401).json({ error: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
router.post("/verifyTokenAdmin", async (req, res) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(401).json({ error: "Authorization is required" });
  }
  const token = authorization.split(" ")[1];
  try {
    const decodedToken = jwt.verify(token, process.env.SECRET);
    // Check if token is expired
    if (Date.now() >= decodedToken.exp * 1000) {
      return res.status(401).json({ error: "Token is expired" });
    }
    const { _id } = decodedToken;
    req.user = await Admin.findById(_id);
    if (!req.user) {
      return res.status(401).json({ error: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
