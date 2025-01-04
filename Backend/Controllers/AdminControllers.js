const Admin = require("../Models/AdminModel");
const Login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const admin = await Admin.login(email, password);
    res.status(200).json(admin);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
// const SignUp = async (req, res) => {
//     const { firstName, lastName, email, password } = req.body;
//     try {
//         const admin = await Admin.signUp({ firstName, lastName, email, password });
//         res.status(200).json(admin);
//     } catch (error) {
//         res.status(400).json({ message: error.message });
//     }
// };
module.exports = { Login };
