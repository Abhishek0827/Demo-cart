import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    product_name:{type:String,required:true},
    product_price:{type:Number,required:true,default:0},
    product_description:{type:String}
});

export default mongoose.model("Product",productSchema);
