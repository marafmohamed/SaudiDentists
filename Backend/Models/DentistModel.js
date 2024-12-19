const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const { CreateToken } = require("../utils/Utils");
const { Schema } = mongoose;

const specialtyEnum = [
  "Prosthodontics",
  "Dental Technology",
  "Endodontics",
  "Periodontics",
  "Oral and Maxillofacial Surgery",
  "Pedodontics",
  "Orthodontics",
  "Restorative Dentistry",
];

const specialtyArabicEnum = [
  "طب الأسنان التعويضي",
  "تقنية الأسنان",
  "علاج جذور الأسنان",
  "طب دواعم الأسنان",
  "جراحة الفم والوجه والفكين",
  "طب أسنان الأطفال",
  "تقويم الأسنان",
  "طب الأسنان الترميمي",
];

const DentistSchema = new Schema(
  {
    // English form fields
    username: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    privatePhone: { type: String, required: true },
    reservationsPhone: { type: String, required: true }, // Optional
    governmentalSector: { type: String, required: true }, // Optional
    privateSector: { type: String, required: true }, // Optional
    curriculumVitaeUrl: { type: String, required: true }, // Optional
    twitterUrl: { type: String }, // Optional
    instagramUrl: { type: String }, // Optional
    linkedinUrl: { type: String }, // Optional
    snapchatUrl: { type: String }, // Optional
    location: {
      area: { type: String, required: true }, // Optional
      city: { type: String, required: true }, // Optional
    },
    profilePicture: { type: String, required: true },
    locationUrl: { type: [String], required: true },
    category: { type: String, required: true },
    title: { type: String, required: true },
    specialty: { type: String, required: true, enum: specialtyEnum },

    // Arabic form fields
    firstNameArabic: { type: String, required: true },
    lastNameArabic: { type: String, required: true },
    governmentalSectorArabic: { type: String, required: true }, // Optional
    privateSectorArabic: { type: String, required: true }, // Optional
    locationArabic: {
      areaArabic: { type: String, required: true }, // Optional
      cityArabic: { type: String, required: true }, // Optional
    },
    categoryArabic: { type: String, required: true },
    titleArabic: { type: String, required: true },
    specialtyArabic: {
      type: String,
      required: true,
      enum: specialtyArabicEnum,
    },
    description: { type: String, required: true },
    descriptionArabic: { type: String, required: true },

    // Additional field to track request status
    isApproved: { type: Boolean, default: false },
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
