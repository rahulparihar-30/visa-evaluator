import mongoose from "mongoose";

const DocumentSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true
    },
    mimeType:{
        type:String,
        required:true,
    },
    size:{type:Number},
    data:{type:Buffer,required:true},
    uploadedAt:{
        type:Date,
        default:Date.now,
    }
})


export default DocumentSchema;