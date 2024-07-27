const express = require("express");
const router = express.Router();
const appConfig = require("../config/appenvconfig");
const userController = require("../controllers/userController");

router.get("/", (req, res) =>
  res.send("Welcome " + appConfig.app_instance_name + " !!")
);

module.exports = router;
///users
router.post("/addUserToDb", userController.addUserIntoDb);
router.get("/getUsers", userController.getUsers);
router.get("/deleteUser/:userId", userController.deleteUser);
router.post("/updateUser/:userId", userController.updateUser);
router.post("/getUserByIdAndPassword", userController.getUserByIdAndPassword);
router.get("/getRoles", userController.getRoles);
