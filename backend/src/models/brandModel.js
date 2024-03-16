const mongoose = require("mongoose");

const {Schema,model} = mongoose;


const brandSchema = new Schema({
    name : {
        type : String,
        required : true,
        unique : true
    }
},{timestamps:true,versionKey:false});

const brandModel = model("brands",brandSchema);

module.exports = brandModel;