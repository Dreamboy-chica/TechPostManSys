import axios from 'axios'
import  { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie'
import Ct from './Ct'

const Login = () => {

    const initalData={_uid: "",pwd: ""}
    const [data, setData] = useState(initalData)
    const [message, setMessage] = useState("")
    let navigate=useNavigate()
    let obj=useContext(Ct)

    const fun = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
    };

    const log = async (e) => {
        e.preventDefault()
        setMessage("")
        setData(initalData)

        try {
            const res = await axios.post("http://localhost:7070/login", data)

            if(res.data.token===undefined)
                {
                  setMessage(res.data.message)
                }
                else{
                  Cookies.set("logincrd",JSON.stringify(res.data)) //setting the cookies 
                                                        //  in the bowser in string format
                  obj.updfun({f:true})
              navigate("/")
                }
            } 

        catch
         {
            setMessage("An error occurred. Please try again.")
         } 
    }

    return (

        <div className="d-flex justify-content-center align-items-center vh-100">
            <div className="card">
            <div className="card-body">
            <h2 className="py-3">Login</h2>
          
        <form onSubmit={log}>
            <div className='msg text-danger my-3'>{message}</div>

            <div className="mb-2">
                <input type="email" className="form-control" placeholder="Email"
                name="_uid" value={data._uid} onChange={fun} required />
            </div>

            <div className="mb-2">
                <input type="password" className="form-control" placeholder="Password"
                name="pwd" value={data.pwd} onChange={fun} required />
            </div>

            <button type="submit" className="btn" >
                <span onClick="log">Login</span>
            </button>
        </form>
    </div>
</div>
</div>)
}

export default Login;



