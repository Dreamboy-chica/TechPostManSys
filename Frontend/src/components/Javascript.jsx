import  { useEffect, useState } from 'react'
import axios from 'axios'

const Javascript = () => {
  let [data,setData]=useState([])
  useEffect(()=>{
    axios.get("http://localhost:7070/getbycat/Javascript").then((res)=>{
      setData(res.data)
    }).catch((err)=>{

    })

  },[])
  return (
    <div className='postcon'>
      {
        data.map((item)=>{
          return(
            <div className='post' >
              <h1>{item.title}</h1>
              <p>{item.body}</p>
              <div className='pfoot'>
                <p>{item.cat}</p>
                <p>{new Date(item.dop).toDateString()}</p>
                <p>{item.name}</p>
                </div>
              </div>
          )
        })
      }
    </div>
  )
}

export default Javascript