const jwt = require("jsonwebtoken");
const CreateToken = (_id) => {
    return jwt.sign({ _id }, process.env.SECRET, { expiresIn: "10d" });
  };

module.exports = {
    CreateToken
};