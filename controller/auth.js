const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const router = express.Router();
require("../db/mongoose");
const User = require("../models/user");
const Joi = require("joi");

router.get("/", (req, res) => {
  res.status(200).send("hello world!! Lets start MERN Stack!!");
});

router.get("/register", (req, res) => {
  res.status(200).send("register");
});

module.exports.register = async (req, res) => {
  try {
    const schema = Joi.object().keys({
      username: Joi.string().required(),
      email: Joi.string().email().trim().email().required(),
      password: Joi.required(),
      password2: Joi.required(),
    });
    const validationResult = await schema.validateAsync(req.body);
    const userExist = await User.findOne({ email: validationResult.email });

    if (userExist) {
      return res.status(422).json({ error: "Email alerady exist!!" });
    } else if (validationResult.password != validationResult.password2) {
      return res.status(422).json({ error: "passwords don't match!!" });
    } else if (validationResult.password.length < 6) {
      return res.status(422).json({ error: "password must be of 6 length" });
    } else {
      const newUser = new User({
        username: validationResult.username,
        password: validationResult.password,
        email: validationResult.email,
      });

      const userRegister = await newUser.save();

      if (userRegister) {
        res.status(201).json({ message: "data saved successfully!!" });
      } else {
        res.status(201).json({ error: "Not saved!!" });
      }
    }
  } catch (error) {
    console.log(error);
    let status = 500;
    let msg = "Internal Server Error";
    if (error.isJoi === true) {
      status = 422;
      msg = error.message;
    }
    return res.status(status).json({ message: msg, data: null });
  }
};

// router.get("/login", async (req, res) => {});

// router.post("/login", async (req, res) => {
//   try {
//     let token;
//     const { email, password } = req.body;
//     if (!email || !password) {
//       return res.status(422).json({ error: "All the fields are required!!" });
//     }
//     const userLogin = await User.findOne({ email: email });
//     if (userLogin) {
//       const isMatch = await bcrypt.compare(password, userLogin.password);

//       token = await userLogin.generateAuthToken();
//       console.log(token);

//       res.cookie("jwtToken", token, {
//         expires: new Date(Date.now() + 25892000000),
//       });

//       if (isMatch) {
//         res.status(200).json(userLogin);
//       } else {
//         res.status(400).json({ error: "Invaild credentials password" });
//       }
//     } else {
//       res.status(400).json({ error: "Invaild credentials emial" });
//     }
//   } catch (error) {
//     console.log(error);
//   }
// });
