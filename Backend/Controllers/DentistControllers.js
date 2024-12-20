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
  const { specialization, city, doctorName, region, page, limit } = req.query;
  try {
    const skip = (page - 1) * limit;
    if (!specialization && !city && !doctorName && !region) {
      const dentists = await Dentist.find().skip(skip).limit(parseInt(limit));
      const totalDentists = await Dentist.countDocuments();
      const totalPages = Math.ceil(totalDentists / limit);
      return res.status(200).json({ dentists, totalPages });
    }
    const dentists = await Dentist.find({
      $and: [
        // Match specialty in English or Arabic
        {
          $or: [
            { specialty: specialization },
            { specialtyArabic: specialization },
          ],
        },
        // Match city in English or Arabic
        {
          $or: [
            { "location.city": city },
            { "locationArabic.cityArabic": city },
          ],
        },
        // Include doctorName condition only if provided
        ...(doctorName
          ? [
              {
                $or: [
                  { firstName: new RegExp(doctorName, "i") },
                  { lastName: new RegExp(doctorName, "i") },
                  { firstNameArabic: new RegExp(doctorName, "i") },
                  { lastNameArabic: new RegExp(doctorName, "i") },
                ],
              },
            ]
          : []),
      ],
    })
      .skip(skip)
      .limit(parseInt(limit));
    const totalDentists = await Dentist.countDocuments({
      $and: [
        // Match specialty in English or Arabic
        {
          $or: [
            { specialty: specialization },
            { specialtyArabic: specialization },
          ],
        },
        // Match city in English or Arabic
        {
          $or: [
            { "location.city": city },
            { "locationArabic.cityArabic": city },
          ],
        },
        // Include doctorName condition only if provided
        ...(doctorName
          ? [
              {
                $or: [
                  { firstName: new RegExp(doctorName, "i") },
                  { lastName: new RegExp(doctorName, "i") },
                  { firstNameArabic: new RegExp(doctorName, "i") },
                  { lastNameArabic: new RegExp(doctorName, "i") },
                ],
              },
            ]
          : []),
      ],
    });
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
module.exports = {
  Login,
  getPaginatedDentists,
  deleteAccount,
  getDentist,
  getFilteredDentists,
  getDentistWithId,
};
