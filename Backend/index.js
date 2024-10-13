let express=require("express")
let mongoose=require("mongoose")
const route = require("./routes/route")
let cors=require("cors")
let app=express()
app.use(express.json())
app.use(cors())
mongoose.connect("mongodb://127.0.0.1:27017/kaali").then(()=>{
    console.log("Database has been connected !")
})
app.use("/",route)  //when the application start home route should be display
app.listen(7070,()=>{
    console.log("Server has been running on port 7070")
})