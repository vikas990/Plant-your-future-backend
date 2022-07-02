const express = require("express");
const apiRoutes = express.Router();

const authController = require("../controller/auth");

apiRoutes.post("/register", authController.register);

module.exports = apiRoutes;
