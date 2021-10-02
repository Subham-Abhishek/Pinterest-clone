const mongoose = require('mongoose');

const postSchema=mongoose.Schema({
    user_id:{type:mongoose.Schema.Types.ObjectId,ref:"user",required:true},
    photo_url:{type: String,required:false,default:null},
    goodquality_url: {type:String, required:false,default:null},
    description: {type:String, required:false,default:null},
    website: {type:String, required:false,default:null},
    tags:{type:Array, required:false,default:[]}

},{
    versionKey:false,
    timestamp:true
})

const Post=mongoose.model("post",postSchema)
module.exports =Post