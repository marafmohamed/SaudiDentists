const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const { CreateToken } = require("../utils/Utils");

const Schema = mongoose.Schema;

const DentistSchema = new Schema(
  {
    // English form fields
    username: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    privatePhone: { type: String, required: true },
    reservationsPhone: { type: String },
    governmentalSector: { type: String },
    privateSector: { type: String },
    curriculumVitaeUrl: { type: String },
    twitterUrl: { type: String },
    instagramUrl: { type: String },
    linkedinUrl: { type: String },
    snapchatUrl: { type: String },
    location: {
      area: { type: String },
      city: { type: String },
    },
    profilePicture: { type: String },
    locationUrl: { type: [String] },
    category: { type: String },
    title: { type: String },
    specialty: { type: String },

    // Arabic form fields
    usernameArabic: { type: String, required: true },
    firstNameArabic: { type: String, required: true },
    lastNameArabic: { type: String, required: true },
    governmentalSectorArabic: { type: String },
    privateSectorArabic: { type: String },
    curriculumVitaeUrlArabic: { type: String },
    locationArabic: {
      areaArabic: { type: String },
      cityArabic: { type: String },
    },
    categoryArabic: { type: String },
    titleArabic: { type: String },
    specialtyArabic: { type: String },
    description: { type: String, required: true },
    descriptionArabic: { type: String, required: true },
  },
  { timestamps: true }
);

DentistSchema.index({ email: 1 }, { unique: true });

DentistSchema.statics.login = async function (email, password) {
  const dentist = await this.findOne({ email });

  if (!dentist) {
    throw new Error("email not found");
  }

  const isPasswordValid = await bcrypt.compare(password, dentist.password);
  if (!isPasswordValid) {
    throw new Error("wrong password");
  }

  const token = CreateToken(dentist._id);
  await dentist.save();

  return { dentist, token };
};

module.exports = mongoose.model("Dentist", DentistSchema);
