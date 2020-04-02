const mongoose = require("mongoose");
const Schema= mongoose.Schema

const TruckSchema = new Schema({

    truckType:{
        type:String,
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
    payload:{
        type:Number,
        required:true
    },
    dimension:{
        type:Object,
        required:true
    },
    date:{
        type:String,
        required:true
    }
    
    

})

module.exports= mongoose.model('Truck',TruckSchema)