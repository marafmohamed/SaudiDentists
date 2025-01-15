const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const { CreateToken } = require("../utils/Utils");
const { sendMail } = require("../Services/EmailService");
const otpGenerator = require("otp-generator");
const validator = require("validator");
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
    governmentalSector: { type: String }, // Optional
    privateSector: { type: String }, // Optional
    gender: { type: String, required: true },
    curriculumVitaeUrl: { type: String, required: true }, // Optional
    twitterUrl: { type: String }, // Optional
    instagramUrl: { type: String }, // Optional
    linkedinUrl: { type: String }, // Optional
    snapchatUrl: { type: String }, // Optional
    tiktokUrl: { type: String }, // Optional
    youtubeUrl: { type: String }, // Optional
    location: {
      area: { type: String }, // Optional
      city: { type: String, required: true }, // Optional
    },
    profilePicture: { type: String },
    locationUrl: { type: [String] },
    category: { type: String, required: true },
    title: { type: String, required: true },
    specialty: { type: String, required: true, enum: specialtyEnum },

    // Arabic form fields
    firstNameArabic: { type: String, required: true },
    lastNameArabic: { type: String, required: true },
    governmentalSectorArabic: { type: String }, // Optional
    privateSectorArabic: { type: String }, // Optional
    locationArabic: {
      areaArabic: { type: String }, // Optional
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
    otpReset: { type: String },
    otpResetExpiresAt: { type: Date },
  },
  { timestamps: true }
);

DentistSchema.index({ email: 1 }, { unique: true });

DentistSchema.statics.login = async function (email, password) {
  const dentist = await this.findOne({ email });

  if (!dentist) {
    throw new Error("Email not found");
  }

  const isPasswordValid = await bcrypt.compare(password, dentist.password);
  if (!isPasswordValid) {
    throw new Error("Wrong password");
  }

  const token = CreateToken(dentist._id);
  await dentist.save();

  return { dentist, token };
};
DentistSchema.statics.ForgotPassword = async function (email) {
  const dentist = await this.findOne({ email });

  if (!dentist) {
    throw new Error("No user found with this email");
  }

  // Generate OTP for password reset
  const otpReset = otpGenerator.generate(6, {
    upperCaseAlphabets: false,
    specialChars: false,
  });
  const otpResetExpiresAt = Date.now() + 5 * 60 * 1000; // 5 minutes

  dentist.otpReset = otpReset;
  dentist.otpResetExpiresAt = otpResetExpiresAt;
  await dentist.save();
  const mailContent = `<!DOCTYPE html>
<html lang="ar">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>إعادة تعيين كلمة المرور</title>
</head>
<body style="font-family: Arial, sans-serif; text-align: right;">
  <h2>طلب إعادة تعيين كلمة المرور</h2>
  <p>مرحباً،</p>
  <p>لقد طلبت إعادة تعيين كلمة المرور. رمز التحقق الخاص بك هو:</p>
  <h3 style="background-color: #f0f0f0; padding: 10px; display: inline-block; border-radius: 5px;">${otpReset}</h3>
  <p>يرجى إدخال هذا الرمز خلال 5 دقائق لإكمال عملية إعادة تعيين كلمة المرور.</p>
  <p>إذا لم تقم بطلب إعادة تعيين كلمة المرور، يرجى تجاهل هذه الرسالة.</p>
  <p>مع تحياتنا،<br>فريق الدعم</p>
</body>
</html>`;
  // Send OTP email
  sendMail(email, "اعادة تعيين كلمة المرور", mailContent);

  return dentist;
};
DentistSchema.statics.ResetPassword = async function ({
  email,
  otpReset,
  newPassword,
}) {
  const dentist = await this.findOne({ email });

  if (
    !dentist ||
    dentist.otpReset !== otpReset ||
    Date.now() > dentist.otpResetExpiresAt
  ) {
    throw new Error("Invalid or expired OTP");
  }

  // Validate new password strength
  if (
    !validator.isStrongPassword(newPassword, {
      minLength: 8,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 0,
    })
  ) {
    throw new Error("New password is not strong enough");
  }

  // Hash new password and clear OTP
  dentist.password = await bcrypt.hash(newPassword, 10);
  dentist.otpReset = undefined;
  dentist.otpResetExpiresAt = undefined;
  const mailContent = `<!DOCTYPE html>
<html lang="ar">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>تأكيد إعادة تعيين كلمة المرور</title>
</head>
<body style="font-family: Arial, sans-serif; text-align: right;">
  <h2>تم إعادة تعيين كلمة المرور بنجاح</h2>
  <p>مرحباً،</p>
  <p>لقد تم إعادة تعيين كلمة المرور الخاصة بك بنجاح. يمكنك الآن تسجيل الدخول باستخدام كلمة المرور الجديدة.</p>
  <p>إذا لم تقم بطلب إعادة تعيين كلمة المرور، يرجى التواصل مع فريق الدعم فوراً.</p>
  <p>مع تحياتنا،<br>فريق الدعم</p>
</body>
</html>
`;
  sendMail(email, "اعادة تعيين كلمة المرور بنجاح", mailContent);
  await dentist.save();

  return dentist;
};
module.exports = mongoose.model("Dentist", DentistSchema);
