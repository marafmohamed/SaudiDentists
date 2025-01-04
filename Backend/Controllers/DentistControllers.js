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
  const { page = 1, limit = 15 } = req.query; // Set defaults for page and limit
  // Ensure page and limit are valid numbers
  if (isNaN(page) || isNaN(limit)) {
    return res.status(400).json({ message: "Invalid page or limit" });
  }

  try {
    const skip = (parseInt(page) - 1) * parseInt(limit); // Correctly calculate skip value
    const dentists = await Dentist.find({})
      .skip(skip)
      .limit(parseInt(limit))
      .select("-password"); // Ensure limit is an integer
    const totalDentists = await Dentist.countDocuments();
    const totalPages = Math.ceil(totalDentists / parseInt(limit)); // Ensure total pages calculation is correct

    res.status(200).json({ dentists, totalPages });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const deleteAccount = async (req, res) => {
  const { dentistId } = req.body;
  try {
    const deletedDentist = await Dentist.findOneAndDelete({ _id: dentistId });
    if (!deletedDentist) {
      return res.status(400).json({ message: "Dentist Not found" });
    }
    return res.status(200).json({ message: "Dentist deleted successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
const getDentist = async (req, res) => {
  const dentist = req.user;
  res.status(200).json(dentist);
};
const getFilteredDentists = async (req, res) => {
  const { specialization, city, doctorName, region, page = 1, limit = 10 } = req.query;

  try {
    const skip = (page - 1) * limit;

    // Build dynamic filter object
    const filter = {};

    // Add specialization filter (English or Arabic)
    if (specialization) {
      filter.$or = [
        { specialty: specialization },
        { specialtyArabic: specialization },
      ];
    }

    // Add city filter (English or Arabic)
    if (city) {
      filter.$and = filter.$and || [];
      filter.$and.push({
        $or: [
          { "location.city": city },
          { "locationArabic.cityArabic": city },
        ],
      });
    }

    // Add doctor name filter (English or Arabic)
    if (doctorName) {
      const nameRegex = new RegExp(doctorName, "i");
      filter.$and = filter.$and || [];
      filter.$and.push({
        $or: [
          { firstName: nameRegex },
          { lastName: nameRegex },
          { firstNameArabic: nameRegex },
          { lastNameArabic: nameRegex },
        ],
      });
    }

    // Query the database with the constructed filter
    const dentists = await Dentist.find(filter)
      .skip(skip)
      .limit(parseInt(limit))
      .select("-password");

    const totalDentists = await Dentist.countDocuments(filter);
    const totalPages = Math.ceil(totalDentists / limit);

    res.status(200).json({ dentists, totalPages });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};


const getDentistWithId = async (req, res) => {
  const { dentistId } = req.params;
  try {
    const dentist = await Dentist.findOne({ _id: dentistId }).select(
      "-password"
    );
    if (!dentist) {
      return res.status(404).json({ message: "Dentist not found" });
    }
    return res.status(200).json(dentist);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
const forgotPassword = async (req, res) => {
  const { email } = req.body;

  try {
    const dentist = await Dentist.ForgotPassword(email);
    res.status(200).json({ message: "OTP sent to email" });
  } catch (error) {
    console.error("Error during forgot password request:", error);
    res.status(500).json({ error: "Server error" });
  }
};
const resetPassword = async (req, res) => {
  const { email, otpReset, newPassword } = req.body;

  try {
    await Dentist.ResetPassword({ email, otpReset, newPassword });
    res.status(200).json({ message: "Password reset successfully" });
  } catch (error) {
    console.error("Error during password reset:", error);
    res.status(500).json({ error: error.message });
  }
};
module.exports = {
  Login,
  getPaginatedDentists,
  deleteAccount,
  getDentist,
  getFilteredDentists,
  getDentistWithId,
  forgotPassword,
  resetPassword,
};
