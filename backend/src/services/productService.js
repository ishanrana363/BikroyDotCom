const categoryModel = require("../models/categoryModel");
const subCategoryModel = require("../models/subCategoryModel");
const brandModel = require("../models/brandModel");


const categoryCreateService = async (req) => {
    try{
        let reqBody = req.body;
        const data = await categoryModel.create(reqBody);
        return {
            status:"success",data : data
        };
    }catch (e) {
        return {
          status:"fail",msg : e.toString()
        };
    }
};


const subCategoryCreateService = async (req) => {
    try{
        let reqBody = req.body;
        const data = await subCategoryModel.create(reqBody);
        return {
            status:"success",data : data
        };
    }catch (e) {
        return {
            status:"fail",msg : e.toString()
        };
    }
};







module.exports = { categoryCreateService,subCategoryCreateService }