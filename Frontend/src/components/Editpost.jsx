import axios from 'axios'
import  { useContext, useState } from 'react'
import Ct from './Ct'
import { useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie'
import './Addpost.css'

const Editpost = () => {

  let obj=useContext(Ct)
  let navigate=useNavigate()
  let {_pid,title,body,cat}=obj.cobj.item

  let [data,setData]=useState({"_pid":_pid,"title":title,"body":body,"cat":cat})

  let fun=(e)=>{
    setData({...data,[e.target.name]:e.target.value})
  }

  let upd=()=>{
        let x=Cookies.get("logincrd")
    if(x==undefined)
    {
navigate("/login")
    }
    else{
      x=JSON.parse(x)
        axios.put("http://localhost:7070/upd",data,{"headers":{"Authorization":x.token}}).then(()=>{
            navigate("/pbyme")
        })
      }}
  return (
   
    <div className='formcon'>
      <div className='form'>
        
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

        <button onClick={upd} className='addpost'>UpDate</button>
      </div></div>
   
  )}

export default Editpost