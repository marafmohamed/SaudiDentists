const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const validator = require("validator");
const { CreateToken } = require("../utils/Utils");
const Schema = mongoose.Schema;

const AdminSchema = new Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);
AdminSchema.statics.login = async function (email, password) {
  const admin = await this.findOne({ email });
  if (!admin) {
    throw new Error("Email not found");
  }

  const isMatch = await bcrypt.compare(password, admin.password);
  if (!isMatch) {
    throw new Error("Password is incorrect");
  }
  const token = CreateToken(admin._id);

  return { admin, token };
};
AdminSchema.statics.signUp = async function ({
  firstName,
  lastName,
  email,
  password,
}) {
  let admin = await this.findOne({ email });
  if (admin) {
    throw new Error("Email already exists");
  }
  if (!validator.isEmail(email)) {
    throw new Error("Invalid email");
  }
  if (
    validator.isEmpty(password) ||
    !validator.isStrongPassword(password, {
      minLowercase: 1,
      minLength: 8,
      minUppercase: 1,
    })
  ) {
    throw new Error("Password is weak");
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  admin = new this({
    firstName,
    lastName,
    email,
    password: hashedPassword,
  });
  await admin.save();
  return admin;
};

module.exports = mongoose.model("Admin", AdminSchema);
