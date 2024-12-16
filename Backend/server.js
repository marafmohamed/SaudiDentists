const express = require("express");
const app = express();
require("dotenv").config();
const cors = require("cors");
const corsOptions = {
//   origin: process.env.FRONT_URL,
  credentials: true,
};
app.use(cors(corsOptions));
app.use(express.json());
const PORT = process.env.PORT || 8080;
const AdminRoutes = require("./Routes/AdminRoutes");
const DentistRoutes = require("./Routes/DentistRoutes");
const RequestRoutes = require("./Routes/RequestRoutes");
app.use("/api/admin", AdminRoutes);
app.use("/api/dentist", DentistRoutes);
app.use("/api/requests", RequestRoutes);
const mongoose = require("mongoose");

mongoose
  .connect(process.env.DB_URI)
  .then(() => {
    app.listen(PORT, () => {
      console.log("server is running on port ", PORT);
    });
    console.log("database connected");
  })
  .catch((err) => {
    console.log("database connection failed", err);
  });
