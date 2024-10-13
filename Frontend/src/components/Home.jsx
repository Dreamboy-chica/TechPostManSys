import { useContext, useEffect, useState } from 'react'
import { Link, Outlet } from 'react-router-dom'
import Cookies from 'js-cookie'
import Ct from './Ct'
import './home.css'
const Home = () => {
  let [crd,setcrd]=useState({"token":"","role":""})
  let obj=useContext(Ct)
  useEffect(()=>{
    let x=Cookies.get("logincrd")
    if(x!=undefined)
    {
   setcrd(JSON.parse(x))
    }
    else{
      setcrd({"token":"","role":""})
    }

  },[obj.cobj.f])

  return (
    <div className='home'>
        <div className='submenu'>
          <div className='subfilter'>Filter</div>
          <div className='topic'>Topic</div>
          <hr></hr>
          
            <Link to="/">All</Link>
            <Link to="/ai">AI and Data</Link>
            <Link to="/cyber">Cybersecurity</Link>
            <Link to="/java">Java</Link>
            <Link to="/js">JavaScript</Link>
            <Link to="/py">Python</Link>
            <Link to="/react">ReactJS</Link>
            <Link to="/database">Database</Link>
            <Link to="/other">Others</Link>
            { crd.token!=""&&<Link to="/pbyme">My Post</Link>}

        </div>
        <div className='cont'>
             {/* all the child component-content will display here */}
            <Outlet/>
        </div>

    </div>
  )
}

export default Home