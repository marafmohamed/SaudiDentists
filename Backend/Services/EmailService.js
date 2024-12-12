const nodemailer = require("nodemailer");
const sendMail = (receiverMail, subject, content) => {
  // Create a transporter
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.USER,
      pass: process.env.PASS,
    },
    tls: {
      rejectUnauthorized: false,
    },
  });
  // Email content
  const mailOptions = {
    from: process.env.USER,
    to: receiverMail,
    subject: subject,
    html: content,
  };

  // Send email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Error:", error);
    } else {
      console.log("Email sent:", info.response);
    }

    // Close the transporter
    transporter.close();
  });
};

module.exports = {
  sendMail,
};
