const jwt = require("jsonwebtoken");
require("dotenv").config();
const jwtKey = process.env.JWTPASS;

exports.encodeToken = (email,user_id) =>{
    const payload = {
        exp : Math.floor(Date.now()/1000)+(60*60*60+24),
        email : email,
        user_id : user_id
    };
    return jwt.sign(payload,jwtKey);
};

exports.decodeToken = (token)=>{
    return jwt.verify(token,jwtKey);
};