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
  const { page, limit , speciality, region, cite } = req.query;
  try {
    const dentists = await Dentist.getPaginatedDentists(page, limit);
    res.status(200).json(dentists);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = { Login, getPaginatedDentists };
