const userModel = require("../models/userModel");
const profileModel = require("../models/profileModele");
const sendEmailUtility = require("../helpers/emailHelper");
const {encodeToken} = require("../helpers/tokenHelper");

exports.sendEmail = async (req,res) => {
    try {
        let email = req.params.email;
        let otpCode = Math.floor(100000 + Math.random() * 999999 );
        let emailText = ` Your verification code is ${otpCode} `;
        let emailSub = ` Verification code `
        await sendEmailUtility(email,emailText,emailSub);
        await userModel.updateOne({email:email}, { $set : { otp : otpCode } } ,{ upsert : true } );
        res.status(201).json({
            status:"success",
            msg : "6 digits otp code has been send successfully"
        });

    }catch (e) {
        return {
            status:"fail",
            data : e.toString()
        }
    }
};



exports.emailVerify = async (req, res) => {
    try {
        const { email, otp } = req.params;
        const filter = { email, otp };

        const userData = await userModel.findOne(filter);

        if (userData) {
            const { _id: userId } = userData;

            const token = encodeToken(email, userId.toString());

            await userModel.updateOne(filter, { $set: { otp: "0" } });

            return res.status(201).json({
                status: "success",
                message: "Token created successfully",
                token : token
            });
        } else {
            return res.status(404).json({
                status: "fail",
                message: "User data not found",
            });
        }
    } catch (error) {
        console.error("Error in email verification:", error);
        res.status(500).json({
            status: "fail",
            message: "Internal server error",
            error: error.toString()
        });
    }
};


exports.profileSaves = async (req,res)=>{
    try {
        let userId = req.headers["user_id"];
        let reqBody = req.body;
        reqBody.userId = userId;
        let data = await profileModel.create(reqBody);
        res.status(201).json({
            status:"success",
            data : data
        });

    }catch (e){
            res.status(500).json({
            status: "fail",
            message: "Internal server error",
            error: e.toString()
        });
    }
};


exports.profileRead = async (req,res)=>{
    try {
        let userId = req.headers["user_id"];
        let filter = { userId : userId };
        let data = await profileModel.findOne(filter);
        if (data){
            res.status(200).json({
                status:"success",data : data
            });
        }else {
            res.status(404).json({
                status:"fail",data : "User profile not found"
            });
        }
    }catch (e) {
        res.status(500).json({
            status: "fail",
            message: "Internal server error",
            error: e.toString()
        });

    }
};


exports.profileDelete = async (req, res) => {
    try {
        let userId = req.headers["user_id"];
        let id = req.params.id;
        let filter = { userId : userId, _id : id };
        let data = await profileModel.deleteOne(filter);
        if (data.deletedCount ===1){
            return res.status(200).json({status:"success",msg : "User profile delete successfully"});
        }else {
            return res.status(404).json({status:"fail", msg : "User data not found!" });
        }
    } catch (error) {
        res.status(500).json({
            status: "fail",
            message: "Internal server error",
            error: error.toString()
        });
    }
};







