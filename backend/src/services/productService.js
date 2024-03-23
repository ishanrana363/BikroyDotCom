const productModel = require("../models/productModel");
const productDetails = require("../models/productDetailsModel");
const mongoose = require("mongoose");
const {parseUserToken} = require("../helpers/tokenHelper");


const productUpdateService = async (req) => {
    let parseToken = parseUserToken(req);
    try {
        let productId = new mongoose.Types.ObjectId(req.params.id);
        let filter = { _id : productId };
        let reqBody = req.body;
        if (parseToken.role==="admin"){
            await productModel.findByIdAndUpdate(filter,reqBody);
            return {status:"success", msg:"Product update successfully" };
        }else {
            return {status:"fail",msg:"Permission not allow"};
        }
    }catch (e) {
        return {status:"fail",msg:e.toString()};
    }
};

const productDetailsService = async (req) => {
    try {
        let productID = new mongoose.Types.ObjectId(req.params.productID);
        let matchStage = {$match:{_id:productID}};

        let joinWithCategoryId = {
            $lookup : { from:"categories",localField:"categoryID",foreignField:"_id",as:"category" }
        };


        let joinWithBrandId = {
            $lookup : { from:"brands",localField:"brandID",foreignField:"_id",as:"brand" }
        };


        let joinWithProductId = {
            $lookup : {
                from : "productdetails" , localField:"_id",foreignField:"productID",as:"product"
            }
        };

        const unwindCategoryId = {$unwind:"$category"};
        const unwindBrandId = {$unwind:"$brand"};
        const unwindProductId = {$unwind:"$product"}


        let data = await productModel.aggregate([
            matchStage,joinWithCategoryId,joinWithBrandId,joinWithProductId,unwindProductId,unwindCategoryId,unwindBrandId
        ]);


        return {status:"success",data:data};
    }catch (e) {
        return {status:"fail",msg:e.toString()};
    }
};

const productByRemarkListService = async (req) => {
    try {
        let remark = req.params.remark;
        let matchStage = {$match: {remark: remark} };

        let joinWithCategoryId = {
            $lookup : { from:"categories",localField:"categoryID",foreignField:"_id",as:"category" }
        };


        let joinWithBrandId = {
            $lookup : { from:"brands",localField:"brandID",foreignField:"_id",as:"brand" }
        };

        const unwindCategoryId = {$unwind:"$category"};
        const unwindBrandId = {$unwind:"$brand"};

        let data = await productModel.aggregate([
            matchStage,joinWithCategoryId,joinWithBrandId,unwindCategoryId,unwindBrandId
        ]);

        return {status:"success",data:data};

    }catch (e) {
        return {status:"fail",msg:e.toString()};
    }
}


module.exports = {
    productUpdateService,
    productDetailsService,
    productByRemarkListService
}

