const {categoryCreateService,subCategoryCreateService} = require("../services/productService");


exports.categoryCreateController= async (req,res)=>{
    let result = await categoryCreateService(req);
    res.status(201).send(result);
};


exports.subCategoryCreateController = async (req,res)=>{
    let result = await subCategoryCreateService(req);
    res.status(201).send(result);
};