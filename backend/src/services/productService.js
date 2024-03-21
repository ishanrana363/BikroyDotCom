const categoryModel = require("../models/categoryModel");
const {parseToken} = require("../helpers/tokenHelper");
const jwt = require("jsonwebtoken");

const categoryCreateService = async (req) => {
    let authToken = req.headers.token;
    let userToken = authToken.split(' ')[1];
    let verifyToken = jwt.verify(userToken,process.env.JWTPASS);
    try{
        const categoryData = {
            categoryName : req.body?.categoryName,
            img : req.body?.img,
            userEmail : verifyToken.email
        };

            if (verifyToken.role==="admin"){
                const data = await categoryModel.create(categoryData);
                return{
                    status:"success",
                    data : data
                };
            }else {
                return{
                    status:"fail",
                    msg:"permission not granted"
                };
            }

    }catch (e) {
        return {
            status:"fail",
            msg : e.toString()
        }
    }
};


module.exports = {
    categoryCreateService
}

