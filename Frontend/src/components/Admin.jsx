import axios from 'axios'
import { useState,useEffect } from 'react'
import Cookies from 'js-cookie'
import { useNavigate } from 'react-router-dom'
import './admin.css'
 
const Admin = () => {

  let [sv,setsv]=useState(false)   //for the status of the post
  let [data,setData]=useState([]) //for storing list of pending post
  let navigate=useNavigate()
  let [cm,setcm]=useState("") //for commenting of the post 
  
  let fun=(e)=>{
    setcm(e.target.value)//getting the comment value
  }
  
  useEffect(()=>{
    let x=Cookies.get("logincrd")
    if(x==undefined)
    {
navigate("/login")
    }
    else{
      x=JSON.parse(x)
      //get all the pendingpost(false)
      axios.get("http://localhost:7070/getreviewpost",{"headers":{"Authorization":x.token}}).then((res)=>{
        setData(res.data)
      })
  }
  },[sv])


let acceptt=(pid)=>{
    let x=Cookies.get("logincrd")
    let {token}=JSON.parse(x)
    axios.get(`http://localhost:7070/accept/${pid}`,{"headers":{"Authorization":token}}).then(()=>{
      setsv(!sv)
    })
  }

let addcom=(pid)=>
  {
  let x=Cookies.get("logincrd")
    let {token}=JSON.parse(x)
  axios.put("http://localhost:7070/updreview",{"_pid":pid,"message":cm},{"headers":{"Authorization":token}}).then(()=>{
    setsv(!sv)
  })
}
  return (
    <div className='adwrapper'>
    {
      data.map((item)=>{
        return(
          <div className='subcont' key={item._id}>
            <h1 >{item.title}</h1>
            <p>{item.body}</p>
            <div className='pfoot'>
              <p>{item.cat}</p>
              <p>{new Date(item.dop).toDateString()}</p>
              <p>{item.name}</p>
              </div>
              <div>
                {
                  item.comm.toString()
                }</div>
                <input type='text' placeholder='Enter Comment' onChange={fun} value={cm} className='entercomm'/>
                <button onClick={()=>addcom(item._pid)} className='adcom'>Comment</button>
                <button onClick={()=>acceptt(item._pid)} className='acc'>Accept</button>

            </div>
        )
      })
    }
  </div>
  )
}

export default Admin