const mongoose = require("mongoose");

const {Schema,model} = mongoose;


const categorySchema = new Schema({
    categoryName : {
        type : String,
        required : true,
        unique : true
    }
},{timestamps:true,versionKey:false});

const categoryModel = model("categories",categorySchema);

module.exports = categoryModel;