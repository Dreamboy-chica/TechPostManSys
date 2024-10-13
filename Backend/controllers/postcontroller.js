let {v4:uuidv4}=require("uuid")
const postm = require("../models/postmodel")

let addpost=async(req,res)=>{
    try{
        
        let data=new postm({...req.body,"_pid":uuidv4()})
        await  data.save()
        res.json({"message":"Post created"})
    }
    catch(err)
    {   
        // res.json({"message":"Error in Adding Post"})
        console.log(err)
    }}


let getpost=async(req,res)=>
    {
    try{
        let data=await postm.find({"accept":"true"})
        res.json(data)
    }
    catch(err)
    {
        res.json({"message":"Error in Fetching articals"})
    }}


let getbycat=async(req,res)=>
        {
        try{
            let data=await postm.find({"cat":req.params.cat,"accept":"true"})            
            res.json(data)
        }
        catch(err)
        {
            res.json({"message":"Error in Fetching articals"})
        }}

let getdonebyme=async(req,res)=>{

        try{
            let data=await postm.find({"_uid":req.params._uid})
            res.json(data)
        }
        catch(err)
        {
            res.json({"message":"Error in fetching data"})
        }
    }  
    
    let delpost = async (req, res) => {
        try {
            // _pid is just a variable to store the pid
            await postm.findOneAndDelete({ "_pid": req.params._pid })
    
            res.json({ "message": "Post is Deleted" })
        } 
        catch (err) 
        {
            res.json({ "message": "Error in Deleting Post" });
        }
    }

    //for edit or updatation
    let upd=async(req,res)=>{
        try{
            await postm.findOneAndUpdate({"_pid":req.body._pid},{...req.body,"accept":"false"})
    res.json({"message":"Updation Successfully"})
        }
        catch(err)
        {
            console.log(err)
            res.json({"message":"Error in Updation"})
        }
    }

    
let getreviewpost=async(req,res)=>{
    try{
     let data=await postm.find({"accept":"false"})
     res.json(data)

    }
    catch(err)
    {
        res.json({"message":"Error in fetching the data"})
    }
}

let accept=async(req,res)=>
    {
    try
    {
        await postm.findOneAndUpdate({"_pid":req.params._pid},{"accept":"true"})
        res.json({"message":"Post Accepted"})
    }
    catch(err)
    {

    }
  }

// for adding comment by the admin for modificiation of the content then only it accepted  
let updreview=async(req,res)=>{
    try{
        await postm.findOneAndUpdate(
            {
            "_pid":req.body._pid
            },
           {
            $push:{"comm":req.body.message},"accept":"rv"
           })
    res.json({"message":"done"})

    }
    catch(err)
    {

    }

}
  
module.exports={addpost,getpost,getbycat,getdonebyme,delpost,upd,getreviewpost,accept,
    updreview}