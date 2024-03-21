const express = require("express");

const router = express.Router();
const userController = require("../controllers/userController");
const authMiddleware = require("../middlewares/authMiddleware");


router.post("/registration",userController.registrationController);
router.post("/login",userController.loginController);
router.get("/profile/details",authMiddleware.isValidUser,userController.profileDetailsController);
router.put("/profile/update",authMiddleware.isValidUser,userController.profileUpdateController);
router.delete("/profile/delete/:id",authMiddleware.isAdmin,userController.profileDeleteController);
router.get("/all/profile/data",authMiddleware.isAdmin,userController.allProfileDataController);

// users






module.exports = router;