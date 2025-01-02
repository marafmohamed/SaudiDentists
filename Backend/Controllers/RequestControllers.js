const Request = require("../Models/RequestModel");
const Dentist = require("../Models/DentistModel");
const bcrypt = require("bcryptjs");
const createDentistRequest = async (req, res) => {
  const {
    username,
    firstName,
    lastName,
    email,
    password,
    privatePhone,
    reservationsPhone,
    governmentalSector,
    privateSector,
    curriculumVitaeUrl,
    twitterUrl,
    instagramUrl,
    linkedinUrl,
    snapchatUrl,
    tiktokUrl,
    location,
    profilePicture,
    locationUrl,
    category,
    title,
    specialty,
    gender,
    usernameArabic,
    firstNameArabic,
    lastNameArabic,
    governmentalSectorArabic,
    privateSectorArabic,
    curriculumVitaeUrlArabic,
    locationArabic,
    categoryArabic,
    titleArabic,
    specialtyArabic,
    description,
    descriptionArabic,
  } = req.body;
  // Check if all fields are presen
  try {
    // Check if a request already exists with this email
    const existingRequest = await Request.findOne({ email });
    if (existingRequest) {
      return res.status(409).json({
        message: "A request with this email already exists",
        errorCode: "REQUEST_EMAIL_EXISTS",
      });
    }

    // Check if a dentist already exists with this email
    // const existingDentist = await Dentist.findOne({ email });
    // if (existingDentist) {
    //   return res.status(409).json({
    //     message: "A dentist with this email already exists",
    //     errorCode: "DENTIST_EMAIL_EXISTS",
    //   });
    // }
    //hash the password first
    const hashedPassword = await bcrypt.hash(password, 10);
    // Create new request
    const request = new Request({
      username,
      firstName,
      lastName,
      email,
      password: hashedPassword,
      privatePhone,
      reservationsPhone,
      governmentalSector,
      privateSector,
      curriculumVitaeUrl,
      twitterUrl,
      instagramUrl,
      linkedinUrl,
      snapchatUrl,
      tiktokUrl,
      location,
      profilePicture,
      locationUrl,
      category,
      title,
      specialty,
      gender,
      usernameArabic,
      firstNameArabic,
      lastNameArabic,
      governmentalSectorArabic,
      privateSectorArabic,
      curriculumVitaeUrlArabic,
      locationArabic,
      categoryArabic,
      titleArabic,
      specialtyArabic,
      description,
      descriptionArabic,
    });

    // Save the new request
    const newRequest = await request.save();

    if (!newRequest) {
      return res.status(400).json({
        message: "Request not created",
        errorCode: "REQUEST_CREATION_FAILED",
      });
    }

    return res.status(201).json({
      message: "Request created successfully",
      requestId: newRequest._id,
    });
  } catch (error) {
    // Handle potential unique constraint or other database errors
    if (error.code === 11000) {
      return res.status(409).json({
        message: "A request with these credentials already exists",
        errorCode: "DUPLICATE_REQUEST",
      });
    }

    return res.status(500).json({
      message: "Internal server error",
      errorDetails: error.message,
    });
  }
};

const AcceptRequest = async (req, res) => {
  const { requestId } = req.body;
  try {
    const existingRequest = await Request.findOne({ _id: requestId });
    if (!existingRequest) {
      return res.status(404).json({ message: "Request not found" });
    }
    const newDentist = await Request.acceptRequest(existingRequest);
    //delete the request
    await existingRequest.deleteOne();
    return res.status(200).json({ message: "Request accepted successfully" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const RefuseRequest = async (req, res) => {
  const { requestId } = req.body;
  try {
    const existingRequest = await Request.findOne({ _id: requestId });
    if (!existingRequest) {
      return res.status(404).json({ message: "Request not found" });
    }
    Request.refuseRequest(existingRequest);
    await existingRequest.deleteOne();
    return res.status(200).json({ message: "Request refused successfully" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getPaginatedRequests = async (req, res) => {
  const { page = 1, limit = 15 } = req.query; // Default to page 1, limit 10
  try {
    const skip = (page - 1) * limit;
    const requests = await Request.find()
      .skip(skip)
      .limit(parseInt(limit))
      .select("-password");
    const totalStudents = await Request.countDocuments();
    const totalPages = Math.ceil(totalStudents / limit);
    return res.status(200).json({ requests, totalPages });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
module.exports = {
  createDentistRequest,
  AcceptRequest,
  RefuseRequest,
  getPaginatedRequests,
};
