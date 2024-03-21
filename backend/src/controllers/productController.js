const {
    categoryCreateService,categoryListService,categoryUpdate,categoryDeleteService

} = require("../services/productService");


exports.categoryCreateController = async (req,res)=>{
    let result = await categoryCreateService(req);
    res.status(201).send(result);
};


exports.categoryListController = async (req,res)=>{
    let result = await categoryListService(req);
    res.status(200).send(result);
};


exports.categoryUpdateController = async (req,res)=>{
    let result = await categoryUpdate(req);
    res.status(200).send(result);
};


exports.categoryDeleteController = async (req,res)=>{
    let result = await categoryDeleteService(req);
    res.status(200).send(result)
};