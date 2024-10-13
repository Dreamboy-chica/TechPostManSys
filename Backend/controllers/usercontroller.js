let umodel = require("../models/usermodel");
let bcrypt = require("bcrypt");
let jwt=require("jsonwebtoken")

let register = async (req, res) => {
  try {
    let chekobj = await umodel.findOne({ _uid: req.body._uid });
    if (chekobj) {
      res.json({ "message": "Email ID Already exists" });
    } else {
      let hash = await bcrypt.hash(req.body.pwd, 10);
      let data = new umodel({ ...req.body, pwd: hash });
      await data.save();
      res.json({ "message": "Registration Done" });
    }
  } catch (err) {
    res.json({ "message": "Error in Registration" });
  }
};

let login = async (req, res) => {
  try {
    let obj = await umodel.findOne({ _uid: req.body._uid });
    if (obj) 
      {
      let f = await bcrypt.compare(req.body.pwd, obj.pwd);
      if (f) 
        {
        let token = jwt.sign({ _uid: obj._uid }, "abcd");
        res.json({token: token,_uid: obj._uid,name: obj.name,role: obj.role});
        } 
      else 
      {
        res.json({ "message": "Incorrect Password" });
      }
     } 
    else 
    {
      res.json({ "message": "Invalid Email ID" });
    }
  } 
  catch (err) 
  {
    res.json({ "message": "Error in Login" });
  }
}

let islogin=(req,res,next)=>{
  try{
      jwt.verify(req.headers.authorization,"abcd")
      next()

  }
  catch(err)
  {
      res.json({"message":"Please login"})
  }
}


module.exports = { register, login ,islogin};
