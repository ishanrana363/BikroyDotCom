const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/authMiddleware");
const productController = require("../controllers/productController");

router.post("/category/create", productController.categoryCreateController );


module.exports = router;