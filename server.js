const path = require("path");
const mongoose = require("mongoose");
const express = require("express");
const cookieParser = require("cookie-parser");
const multer = require("multer");
const cors = require("cors");
require("dotenv").config();
require("./db/mongoose");
const indexRoutes = require("./routes/index.routes");
// const User = require("./models/user");
const app = express();

const port = process.env.PORT;

app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use("/images", express.static(path.join(__dirname, "images")));

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images");
  },
  filename: (req, file, cb) => {
    cb(null, req.body.name);
  },
});

const upload = multer({ storage: storage });

app.use("/api", indexRoutes);

app.listen(port, () => console.log(`server up on :- ${port}`));
