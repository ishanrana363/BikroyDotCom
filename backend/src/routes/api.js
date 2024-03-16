const express = require("express");

const router = express.Router();
const userController = require("../controllers/userController");
const authMiddleware = require("../middlewares/authMiddleware");
const productController = require("../controllers/productController");

// users

router.post("/send-otp/:email",userController.sendEmail);
router.post("/otp-verify/:email/:otp" , userController.emailVerify);
router.post("/profile/save" , authMiddleware, userController.profileSaves);
router.get("/profile/details" , authMiddleware, userController.profileRead);
router.delete("/profile/delete/:id" , authMiddleware, userController.profileDelete);


// product


router.post("/category/create",productController.categoryCreateController);
router.post("/subCategory/create",productController.subCategoryCreateController);




module.exports = router;