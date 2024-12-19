const Dentist = require("../Models/DentistModel");

const Login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const dentist = await Dentist.login(email, password);
    res.status(200).json(dentist);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getPaginatedDentists = async (req, res) => {
  const { page, limit } = req.query;
  try {
    const skip = (page - 1) * limit;
    const dentists = await Dentist.find().skip(skip).limit(parseInt(limit));
    const totalStudents = await Dentist.countDocuments();
    const totalPages = Math.ceil(totalStudents / limit);
    res.status(200).json({ dentists, totalPages });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = { Login, getPaginatedDentists };
