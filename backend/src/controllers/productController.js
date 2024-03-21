const {categoryCreateService} = require("../services/productService");
const {parseToken} = require("../helpers/tokenHelper")


exports.categoryCreateController = async (req,res)=>{
    let result = await categoryCreateService(req);
    res.status(201).send(result);
}