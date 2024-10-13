import axios from 'axios'
import  { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie'
import './Addpost.css'

const Addpost = () => {

  let [data,setData]=useState({"title":"","body":"","cat":""})
  let [message,setMessage]=useState("")
  let navigate=useNavigate()

  let obj
  useEffect(()=>{

    //here we want user-email id and name that's why we are using again
    let x=Cookies.get("logincrd")
    if(x==undefined)
    {
      navigate("/login")
    }
    else
    {
       obj=JSON.parse(x)
      setData({...data,"_uid":obj._uid,"name":obj.name})
    }

  },[])

  let fun=(e)=>{
    setData({...data,[e.target.name]:e.target.value})
  }

  let add=()=>{
    let x=Cookies.get("logincrd")
    if(x==undefined)
    {
      navigate("/login")
    }
    else{
    let {token}=JSON.parse(x)
    axios.post("http://localhost:7070/addpost",{...data,dop:new Date()},{"headers":{"Authorization":token}}).then((res)=>{
      setMessage(res.data.message) //post is added
      setData({...data,"title":"","body":"","cat":""}) //empty the form-field
    })
  }
}
  return (
   
    <div className='formcon'>
      <div className='form'>
        <div className='msg'>{message}</div>
        
        <input type='text' placeholder='Your Title' name="title" value={data.title} onChange={fun} className='title'/>
       
        <select onChange={fun} value={data.cat} name="cat" className='cat'>

          <option selected disabled value="">Select Category</option>
          <option value="AI adn Data">AI and Data</option>
          <option value="Cybersecurity">Cybersecurity</option>
          <option value="Java">Java</option>
          <option value="JavaScript">JavaScript</option>
          <option value="Python">Python</option>
          <option value="ReactJS">ReactJS</option>
          <option value="Database">Database</option>
          <option value="other">Others</option>

        </select>
        <textarea value={data.body} onChange={fun} name='body' placeholder='Type here...' className='body'>
        </textarea>

        <button onClick={add} className='addpost'>AddPost</button>
      </div></div>
   
  )}

export default Addpost