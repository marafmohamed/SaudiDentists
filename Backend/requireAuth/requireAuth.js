const jwt = require("jsonwebtoken");
const Dentist = require("../Models/DentistModel");
const Admin = require("../Models/AdminModel");
const CheckAdminToken = async (req, res, next) => {
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
    next();
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const CheckToken = async (req, res, next) => {
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
      req.user = await Admin.findById(_id);
      if (!req.user) return res.status(401).json({ error: "User not found" });
    }
    next();
  } catch (error) {
    console.log("Error in CheckToken:", error);
    res.status(400).json({ error: error.message });
  }
};

module.exports = { CheckToken, CheckAdminToken };
