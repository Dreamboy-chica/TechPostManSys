let express=require("express")
const { register,login,islogin} = require("../controllers/usercontroller")
const {addpost,getpost,getbycat, getdonebyme, delpost,upd,getreviewpost, accept, updreview}=require("../controllers/postcontroller")

let route=new express.Router()
route.post('/register',register)
route.post('/login',login)

route.post('/addpost',islogin,addpost)
route.get('/getpost',getpost)
route.get("/getbycat/:cat",getbycat)
route.get("/getdonebyme/:_uid",islogin,getdonebyme)
// _pid is just a variable to store the postid
route.delete("/delpost/:_pid",islogin,delpost)  
route.put("/upd",islogin,upd)

route.get('/getreviewpost',islogin,getreviewpost)
route.get("/accept/:_pid",islogin,accept)
route.put("/updreview",islogin,updreview)

module.exports=route

