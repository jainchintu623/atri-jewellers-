const mongoose = require("mongoose")

const AddressSchema = new mongoose.Schema({
  
    FirstName:{
        type:String,
        required:true
    },
   LastName:{
        type:String,
        required:true
    },
    StreetAddress:{
        type:String,
        required:true
    },
    City:{
        type:String,
        required:true
    },
    State:{
        type:String,
        required:true
    },
   ZipCode:{
        type:Number,
        required:true
    },
    user:{
        type:mongoose.Schema.ObjectId,
        ref:"users"
    },
    PhoneNo:{
        type:String,
        required:true
    }




})

const Address = mongoose.model("addresses",AddressSchema)

module.exports = Address;