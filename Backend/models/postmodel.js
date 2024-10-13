let mongoose=require("mongoose")
let postsch=new mongoose.Schema(
    {
    "_pid":String, //automatically gen. by uuid don't give it 
    "title":String,
    "cat":String,
    "body":String,
    "_uid":String, //user email-id
    "name":String,
    "dop":Date,
    "accept":{
        type:String,
        default:"false"
    },
    "comm":[]
}

)
let postm=mongoose.model("post",postsch)
module.exports=postm