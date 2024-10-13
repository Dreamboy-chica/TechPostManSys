import { useState } from "react"
import './register.css'
import axios from 'axios'
// import { useNavigate } from 'react-router-dom'

const Register = () => {

    const initalData={ name: "",_uid: "",pwd: "",number: ""}

    const [data, setData] = useState(initalData)
    // let navigate=useNavigate()

    const [message, setMessage] = useState("")

    const fun = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
    };

    const reg = async (e) => {
        e.preventDefault()
        setMessage("")
        setData(initalData) //for clearing the input field

        try {
            const res = await axios.post("http://localhost:7070/register", data)
            if (res.data.message === "Registration Done") 
              {
                // navigate("/login")
              } 
            else 
            {
                setMessage(res.data.message)
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
            <h2 className="py-3">Sign up</h2>
          
        <form onSubmit={reg}>

            {/* used to store the server feedback */}
            <div className='msg text-danger my-3'>{message}</div>
            <div className="mb-2">

                <input type="text" className="form-control" placeholder="Full name"
                    name="name" value={data.name} onChange={fun} required />
                </div>

                        

            <div className="mb-2">
                <input type="email" className="form-control" placeholder="Email"
                name="_uid" value={data._uid} onChange={fun} required />
            </div>

            <div className="mb-2">
                <input type="password" className="form-control" placeholder="Password"
                name="pwd" value={data.pwd} onChange={fun} required />
            </div>

            <div className="mb-2">
                <input type="text" className="form-control" placeholder="Mobile no."
                name="number" value={data.number} onChange={fun} required />
            </div>

            <button type="submit" className="btn" >
                <span onClick={reg}>Register</span>
            </button>

        </form>
    </div>
</div>
</div>
    );
}

export default Register;
