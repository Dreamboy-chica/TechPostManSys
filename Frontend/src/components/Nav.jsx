import { Link } from "react-router-dom";
import Cookies from 'js-cookie'
import Ct from "./Ct";
import { useContext, useEffect, useState } from "react";
import './nav.css'

const Nav = () => {

  let [crd,setcrd]=useState({"token":"","role":""})
  let obj=useContext(Ct) //we are using the context

  useEffect(()=>{
    let x=Cookies.get('logincrd')
    if(x!==undefined)  //token is available so 
    {
      setcrd(JSON.parse(x)) //convert token into the normal js-object
    }
    else
    {
      setcrd({"token":"","role":""})
    }

  },[obj.cobj.f])

  return (
    <div>
  <nav>
    <div className="navwrapper"> 
      
    <div className="navbar"> 

      <div><i className="fa-brands fa-joomla text-danger"></i></div>

      <div className="homenav"> 
        <Link to="/" >Home</Link>
      {crd.token==""&& <Link to="/reg">Register</Link>}
      {crd.token==""  &&<Link to="/login">Login</Link>}
      {crd.token!=""  &&<Link to="/addpost">Addpost</Link>}
      {crd.role=="admin"&&  <Link to="/admin">Admin</Link>}
      {crd.token!=""&&  <Link to="/logout">Logout</Link>}
      <div className="name">{crd.name}</div>
    </div>

    </div>
    <div className="navbottom"></div>

    </div>
    </nav>  
    </div>
  );
}

export default Nav;
