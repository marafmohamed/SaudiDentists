const mongoose = require("mongoose");
const { sendMail } = require("../Services/EmailService");
const DentistModel = require("./DentistModel");
const Schema = mongoose.Schema;

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

const RequestSchema = new Schema(
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
    tiktokUrl: { type: String }, // Optional
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

// Static method to accept a dentist request
RequestSchema.statics.acceptRequest = async function (requestData) {
  try {
    // Check if dentist exists by email and phone
    const existingDentist = await DentistModel.findOne({
      email: requestData.email,
      privatePhone: requestData.privatePhone,
    });
    console.log(existingDentist);
    let dentist;
    if (existingDentist) {
      // Update existing dentist
      dentist = {
        username: requestData.username,
        firstName: requestData.firstName,
        lastName: requestData.lastName,
        email: requestData.email,
        password: requestData.password,
        privatePhone: requestData.privatePhone,
        reservationsPhone: requestData.reservationsPhone,
        governmentalSector: requestData.governmentalSector,
        privateSector: requestData.privateSector,
        curriculumVitaeUrl: requestData.curriculumVitaeUrl,
        twitterUrl: requestData.twitterUrl,
        instagramUrl: requestData.instagramUrl,
        linkedinUrl: requestData.linkedinUrl,
        snapchatUrl: requestData.snapchatUrl,
        tiktokUrl: requestData.tiktokUrl,
        location: {
          area: requestData.location.area,
          city: requestData.location.city,
        },
        profilePicture: requestData.profilePicture,
        locationUrl: requestData.locationUrl,
        category: requestData.category,
        title: requestData.title,
        specialty: requestData.specialty,
        firstNameArabic: requestData.firstNameArabic,
        lastNameArabic: requestData.lastNameArabic,
        governmentalSectorArabic: requestData.governmentalSectorArabic,
        privateSectorArabic: requestData.privateSectorArabic,
        locationArabic: {
          areaArabic: requestData.locationArabic.areaArabic,
          cityArabic: requestData.locationArabic.cityArabic,
        },
        categoryArabic: requestData.categoryArabic,
        titleArabic: requestData.titleArabic,
        specialtyArabic: requestData.specialtyArabic,
        description: requestData.description,
        descriptionArabic: requestData.descriptionArabic,
        isApproved: true,
      };
      dentist = await DentistModel.findOneAndUpdate(
        { email: requestData.email, privatePhone: requestData.privatePhone },
        {
          ...dentist,
          isApproved: true,
        },
        { new: true }
      );
    } else {
      console.log(requestData);
      // Create new dentist
      dentist = {
        username: requestData.username,
        firstName: requestData.firstName,
        lastName: requestData.lastName,
        email: requestData.email,
        password: requestData.password,
        privatePhone: requestData.privatePhone,
        reservationsPhone: requestData.reservationsPhone,
        governmentalSector: requestData.governmentalSector,
        privateSector: requestData.privateSector,
        curriculumVitaeUrl: requestData.curriculumVitaeUrl,
        twitterUrl: requestData.twitterUrl,
        instagramUrl: requestData.instagramUrl,
        linkedinUrl: requestData.linkedinUrl,
        snapchatUrl: requestData.snapchatUrl,
        tiktokUrl: requestData.tiktokUrl,
        location: {
          area: requestData.location.area,
          city: requestData.location.city,
        },
        profilePicture: requestData.profilePicture,
        locationUrl: requestData.locationUrl,
        category: requestData.category,
        title: requestData.title,
        specialty: requestData.specialty,
        firstNameArabic: requestData.firstNameArabic,
        lastNameArabic: requestData.lastNameArabic,
        governmentalSectorArabic: requestData.governmentalSectorArabic,
        privateSectorArabic: requestData.privateSectorArabic,
        locationArabic: {
          areaArabic: requestData.locationArabic.areaArabic,
          cityArabic: requestData.locationArabic.cityArabic,
        },
        categoryArabic: requestData.categoryArabic,
        titleArabic: requestData.titleArabic,
        specialtyArabic: requestData.specialtyArabic,
        description: requestData.description,
        descriptionArabic: requestData.descriptionArabic,
        isApproved: true,
      };
      dentist = await DentistModel.create(dentist);
      console.log(dentist);
    }
    const emailContent = `<!-- Accepted Dentist Request Template -->
<!DOCTYPE html>
<html lang="ar">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>قبول طلب التسجيل</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            text-align: right;
        }
        .container {
            background-color: #f4f4f4;
            border-radius: 10px;
            padding: 20px;
        }
        .status-badge {
            background-color: #28a745;
            color: white;
            padding: 10px;
            border-radius: 5px;
            display: inline-block;
            margin-bottom: 15px;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="status-badge">طلبك مقبول</div>
        
        <h2>مرحباً ${requestData.firstName} ${requestData.lastName}</h2>
        
        <p>نسعد بإعلامك بأن طلب تسجيلك كطبيب في منصتنا قد تمت الموافقة عليه.</p>
        
        <p>يمكنك الآن الدخول إلى حسابك باستخدام البريد الإلكتروني وكلمة المرور التي قمت بإنشائها.</p>
        
        <p>إذا كانت لديك أي أسئلة أو استفسارات، لا تتردد في التواصل معنا.</p>
        
        <p>مع تحياتنا،<br>فريق الدعم</p>
    </div>
</body>
</html>
`;
    sendMail(requestData.email, "تم قبول طلبك", emailContent);

    return dentist;
  } catch (error) {
    throw new Error(`Error accepting dentist request: ${error.message}`);
  }
};

// Static method to refuse a dentist request
RequestSchema.statics.refuseRequest = async function (requestData) {
  try {
    // TODO: Implement email sending function for rejection
    // await sendRejectionEmail(requestData);
    const emailContent = `<!-- Refused Dentist Request Template -->
<!DOCTYPE html>
<html lang="ar">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>رفض طلب التسجيل</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            text-align: right;
        }
        .container {
            background-color: #f4f4f4;
            border-radius: 10px;
            padding: 20px;
        }
        .status-badge {
            background-color: #dc3545;
            color: white;
            padding: 10px;
            border-radius: 5px;
            display: inline-block;
            margin-bottom: 15px;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="status-badge">طلبك مرفوض</div>
        
        <h2>مرحباً ${requestData.firstName} ${requestData.lastName}</h2>
        
        <p>نأسف لإبلاغك بأن طلب تسجيلك كطبيب في منصتنا لم يتم قبوله في الوقت الحالي.</p>
        
        <p>قد يكون السبب راجعًا إلى عدم استيفاء جميع الشروط المطلوبة أو وجود نقص في المعلومات المقدمة.</p>
        
        <p>نشجعك على مراجعة متطلبات التسجيل والتقدم مرة أخرى.</p>
        
        <p>إذا كانت لديك أي أسئلة، يمكنك التواصل معنا للحصول على مزيد من التوضيح.</p>
        
        <p>مع تحياتنا،<br>فريق الدعم</p>
    </div>
</body>
</html>`;
    sendMail(requestData.email, "تم رفض طلبك", emailContent);
    // Optional: You might want to log rejected requests or perform other actions
    return {
      message: "Dentist request has been refused",
      requestData,
    };
  } catch (error) {
    throw new Error(`Error refusing dentist request: ${error.message}`);
  }
};

module.exports = mongoose.model("Request", RequestSchema);
