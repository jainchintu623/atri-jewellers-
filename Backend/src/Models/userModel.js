const mongoose =require("mongoose") 

const UserSchema = new mongoose.Schema({
    FirstName:{
        type:String,
        required:true,
    },
    LastName:{
        type:String,
        required:true,
    },
    Password:{
        type:String,
        required:true
    },
    ConfirmPassword:{
        type:String,
        required:true
    },
   
   role:{
        type:String,
        required:true,
        default:"user"
    },
    PhoneNo:{
        type:"String"
    },
    Address:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"addresses"
    }],
    PaymentInformation:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"payment_information"
        }
    ],
    Ratings:[
   {
    type:mongoose.Schema.Types.ObjectId,
    ref:"ratings"
   }
    ],
    Reviews:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"reviews"
        }
    ],
    createdAt:{
        type:Date,
        default:Date.now()
    }

})

const User = mongoose.model("users",UserSchema)

module.exports=User;