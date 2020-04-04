const mongoose = require("mongoose");
const Schema= mongoose.Schema

const LoadSchema = new Schema({
    payload:{
        type:Number,
        required:true
    },
    dimension:{
        type:Object,
        required:true
    },
    status:{
        type:String,
        required:true
    },
    state:{
        type:String,
        required:true
    }
    ,
   
    created_by:{
        type:String,
        required:true
    },
    assigned_to:{
        type:String,
        required:true
    },
    message:{
        type:String,
        required:true
    },
    date:{
        type:String,
        required:true
    }
})

module.exports= mongoose.model('Load',LoadSchema)