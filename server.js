const express = require("express");
const app = express();
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/dbconfig");
const cookieParser = require("cookie-parser");
const emailService = require("./utils/emailService");
const path = require("path");
const morgan = require("morgan");
const mongoose = require("mongoose");

//const PORT = process.env.PORT || 8000;
const PORT = 5000;

dotenv.config();
app.use(express.json());
app.use(morgan("dev"));
app.use(cookieParser());
app.use(cors({ credentials: true, origin: "http://localhost:3000" }));

// connect to the db
connectDB();

// listen on port
app.listen(PORT, () => {
  console.log(`Server is running on localhost:${PORT}`);
});

app.get("/", (req, res) => {
  res.send("Welcome to server! this is server side test");
});


// this code is here only to check email template
app.get("/sendemail", (req, res) => {
  emailService
  .sendEmail("saadiajameel54@gmail.com", "ACCEPT", "", "Saadia")
  .then((response) => {
    res.status(200).json({ message: "Email is sent!" });
  })
  .catch((error) => {
    res.status(200).json({message:"Email notification Failed"});
  });
});


// import routes
const userAuthRoute = require("./routes/userAuth");
app.use("/api/auth", userAuthRoute);

const adminAuthRoute = require("./routes/adminAuth");
app.use("/api/admin/auth", adminAuthRoute);

const imagesRoute = require("./routes/image");
app.use("/api/image", imagesRoute);

const adminRoute = require("./routes/admin");
app.use("/api/admin", adminRoute);

const patientRoute = require("./routes/patient");
app.use("/api/user/patient", patientRoute);

const EntryRoute = require("./routes/entry");
app.use("/api/user/entry", EntryRoute);

const UploadRoute = require("./routes/upload");
app.use("/api/user/upload", UploadRoute);

const userRoute = require("./routes/user");
const TeleConEntry = require("./models/TeleConEntry");
app.use("/api/user", userRoute);

app.use("/Storage", express.static(path.join(__dirname, "/Storage")));
app.use("/Storage/images",express.static(path.join(__dirname, "/Storage/images")));
app.use("/Storage/reports",express.static(path.join(__dirname, "/Storage/reports")));