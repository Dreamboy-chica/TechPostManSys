let mongoose=require("mongoose")

let usersch=new mongoose.Schema(
    {
        "_uid":String, //user-email-id
        "name":String,
        "pwd":String,
        "phono":Number,
        "role":{
            type:String,
            default:"user" //no-need to give in the postman
        }
    }
)

let umodel=mongoose.model("user",usersch)
module.exports=umodel