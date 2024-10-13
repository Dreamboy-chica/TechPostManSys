import { useState } from "react"
import Ct from "./components/Ct"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import Nav from './components/Nav'
import Home from './components/Home'
import Register from "./components/Register"
import Addpost from './components/Addpost'
import Login from "./components/Login"
import Admin from './components/Admin'
import Logout from './components/Logout'
import AiData from "./components/AiData"
import Cyber from "./components/Cyber"
import Java from "./components/Java"
import Javascript from "./components/Javascript"
import Python from "./components/Python"
import Reactjs from "./components/Reactjs"
import Database from "./components/Database"
import Other from "./components/Other"
import Postbyme from "./components/Postbyme"
import Editpost from "./components/Editpost"

import All from "./components/All"



const App = () => {

  let [cobj,setCont]=useState({"f":false})
  let updfun=(obj)=>{
    setCont({...cobj,...obj})
  }
  let obj={"cobj":cobj,"updfun":updfun}
  return (
    <div>
      <Ct.Provider value={obj}>  
        <BrowserRouter> 
        <Nav/>
        <Routes>

          <Route path="/"  element={<Home/>}>

          <Route path="/" element={<All/>}/>
          <Route path='/ai' element={<AiData/>}/>
          <Route path="/cyber" element={<Cyber/>}/>
          <Route path="/java" element={<Java/>}/>
          <Route path='/js' element={<Javascript/>}/>
          <Route path="/py" element={<Python/>}/>
          <Route path="/react" element={<Reactjs/>}/>
          <Route path='/database' element={<Database/>}/>
          <Route path='/other' element={<Other/>}/>
          <Route path="/pbyme" element={<Postbyme/>}/>
          <Route path='/edit' element={<Editpost/>}/>
          </Route>

          <Route path="/reg"  element={<Register/>}/>
          <Route path="/login"  element={<Login/>}/>
          <Route path="/addpost"  element={<Addpost/>}/>
          <Route path="/admin"  element={<Admin/>}/>
          <Route path="/logout"  element={<Logout/>}/>

        </Routes>
        </BrowserRouter>
     
      </Ct.Provider>
    </div>
  )
}

export default App;
