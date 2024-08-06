const express = require("express");
const authRouter = express.Router();
const authController = require("../controller/auth.controller");

authRouter
    .route("/")
    .get(authController.getUser)
    .put(authController.updateName)
    .post(authController.register);

authRouter.route("/login").post(authController.login);

module.exports = authRouter;
