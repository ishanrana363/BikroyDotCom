const express = require("express");

const router = express.Router();
const userController = require("../controllers/userController");
const authMiddleware = require("../middlewares/authMiddleware");
const categoryController = require("../controllers/categoryController");
const brandController = require("../controllers/brandController");
const productController = require("../controllers/productController");


// users


router.post("/profile-create",userController.registrationController);
router.post("/login",userController.loginController);
router.get("/profile-details",authMiddleware.isValidUser,userController.profileDetailsController);
router.put("/profile-update",authMiddleware.isValidUser,userController.profileUpdateController);
router.delete("/profile-delete/:id",authMiddleware.isAdmin,userController.profileDeleteController);
router.get("/user-list",authMiddleware.isAdmin,userController.allProfileDataController);


// category


router.post("/category-create", authMiddleware.isAdmin,categoryController.categoryCreateController);
router.get("/category-list",categoryController.categoryListController);
router.put("/category-update/:id", authMiddleware.isAdmin, categoryController.categoryUpdateController);
router.delete("/category-delete/:id", authMiddleware.isAdmin, categoryController.categoryDeleteController);
router.get("/category-list-admin", authMiddleware.isAdmin, categoryController.categoryListByAdminController);



// brand


router.post("/brand-create" , authMiddleware.isAdmin,brandController.brandCreateController);
router.get("/brand-list",brandController.brandListController);
router.put("/brand-update/:id",authMiddleware.isAdmin,brandController.brandUpdateController);
router.delete("/brand-delete/:id",authMiddleware.isAdmin,brandController.brandDeleteController);
router.get("/brand-list-admin",authMiddleware.isAdmin,brandController.brandListByAdminController);



//product



router.post("/product-create",authMiddleware.isAdmin,productController.productProductDetailsCreateController);
router.get("/product-list-by-brand/:brandID/:pageNo/:perPage/:searchValue", productController.productListByBrandId);
router.get("/product-list-by-category/:categoryID/:pageNo/:perPage/:searchValue", productController.productListByCategoryId);






module.exports = router;