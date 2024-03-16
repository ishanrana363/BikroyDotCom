const mongoose = require("mongoose");
const {Schema,model} = mongoose;

const subCategorySchema = new Schema({
    subCategoryName : {
        type : String,
        required : true,
        unique : true
    },
    categoryId : {
        type : mongoose.Schema.Types.ObjectId,
        required : true
    }
},{timestamps:true,versionKey:false});


const subCategory = model("subCategory",subCategorySchema);


module.exports = subCategory;