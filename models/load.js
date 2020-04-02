const mongoose = require("mongoose");
const Schema= mongoose.Schema

const LoadSchema = new Schema({

    dimention:{
        type:Object,
        required:true
    },
    status:{
        type:String,
        required:true
    },
    created_by:{
        type:String,
        required:true
    },
    assigned_to:{
        type:String,
        required:true
    },
    state:{
        type:String,
        required:true
    }
    ,
    payload:{
        type:Number,
        required:true
    },
    
    length:{
        type:Number,
        required:true
    },
    width:{
        type:Number,
        required:true
    },
    height:{
        type:Number,
        required:true
    },
    logs:{
        type:Array,
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