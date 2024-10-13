import { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie'
import Ct from './Ct'
import './Postdone.css'

const Postbyme = () => {
  let [data, setData] = useState([]);
  let [dl, setdl] = useState(true);
  let navigate = useNavigate();
  let obj = useContext(Ct);

  useEffect(() => {
    let x = Cookies.get("logincrd");
    if (x === undefined) {
      navigate("/login");
    } else {
      x = JSON.parse(x);
      axios.get(`http://localhost:7070/getdonebyme/${x._uid}`, { "headers": { "Authorization": x.token } })
        .then((res) => {
          setData(res.data);
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }, [dl]);

  let del = (_pid) => {
    let x = Cookies.get("logincrd");
    if (x === undefined) {
      navigate("/login");
    } else {
      x = JSON.parse(x);
      axios.delete(`http://localhost:7070/delpost/${_pid}`, { "headers": { "Authorization": x.token } })
        .then((res) => {
          setdl(!dl);
        });
    }
  };

  let edit = (item) => {
    obj.updfun({ "item": item });
    navigate("/edit");
  };

  return (
    <div className='wrapper'>
      {data.map((item) => (
        <div className='subcont' key={item._id}>
          <h1>{item.title}</h1>
          <p>{item.body}</p>
          <div>
            <p className='text-danger'>{item.cat}</p>
            <p>{new Date(item.dop).toDateString()}</p>
            <p>{item.name}</p>
            <p>{item.accept === 'true' ? "Approved" : "Pending"}</p>
          </div>
          <button onClick={() => del(item._pid)} className='del'>Delete Post</button>
          <button onClick={() => edit(item)} className='edit'>Edit Post</button>
     
          <div>{item.comm.toString()}</div>
        </div>
      ))}
    </div>
  );

};

export default Postbyme;
