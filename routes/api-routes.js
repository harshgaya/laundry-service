const express = require("express");
const router = express.Router();
const appConfig = require("../config/appenvconfig");
const userController = require("../controllers/userController");
const orderController = require("../controllers/orderController");
const utilsController = require("../controllers/utilsController");

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
router.post("/addStudentToDb", userController.addStudentToDb);

router.post("/addCollegeToDb", userController.addCollegeToDb);
//employeeLogout
router.post("/logout", userController.employeeLogout);
router.get(
  "/getStudentByTagNumber/:tagNumber",
  userController.getStudentByTagNumber
);
///orders
router.post("/addOrdersToDb", orderController.addOrdersToDb);
router.post("/createNewCollection", orderController.createNewCollection);

//utils
router.get(
  "/addNewFieldToAllDocuments",
  utilsController.addNewFieldToAllDocuments
);
