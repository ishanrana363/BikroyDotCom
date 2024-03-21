const express = require("express");

const router = express.Router();
const userController = require("../controllers/userController");
const authMiddleware = require("../middlewares/authMiddleware");
const productController = require("../controllers/productController")


// users


router.post("/profile-create",userController.registrationController);
router.post("/login",userController.loginController);
router.get("/profile-details",authMiddleware.isValidUser,userController.profileDetailsController);
router.put("/profile-update",authMiddleware.isValidUser,userController.profileUpdateController);
router.delete("/profile-delete/:id",authMiddleware.isAdmin,userController.profileDeleteController);
router.get("/user-list",authMiddleware.isAdmin,userController.allProfileDataController);


// product


router.post("/category-create", authMiddleware.isAdmin,productController.categoryCreateController);
router.get("/category-list",productController.categoryListController);
router.put("/category-update/:id", authMiddleware.isAdmin, productController.categoryUpdateController);
router.delete("/category-delete/:id", authMiddleware.isAdmin, productController.categoryDeleteController);








module.exports = router;