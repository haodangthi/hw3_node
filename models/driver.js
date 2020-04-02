const mongoose = require("mongoose");
const Schema= mongoose.Schema

const DriverSchema = new Schema({
    name:{
        type:String,
        required:true
    },
    surname:{
        type:String,
        required:true
    },

    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    isAssigned:{
        type:Boolean,
        required:true
    },
    assignedTruck:{
        type:String
    },
    isDriver:{
        type:Boolean,
        required:true
    }

})

module.exports= mongoose.model('Driver',DriverSchema)