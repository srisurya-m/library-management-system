import React,{useState} from 'react'
import Layout from '../../components/layout/Layout'
import {toast} from "react-hot-toast";
import axios from "axios";
import {useNavigate} from "react-router-dom"
import "../../styles/AuthStyle.css"

const ForgotPassword = () => {
    const [name,setName]=useState("")
    const [email,setEmail]=useState("")
    const [newPassword,setNewPassword]=useState("");
    const navigate=useNavigate();

  //form function
  const handleSubmit=async (e)=>{
    e.preventDefault();
    try {
      const res= await axios.put("http://localhost:5000/api/profile/forgotpassword",{name,email,newPassword});
      if(res.data.success){
        toast.success("password changed Successfully!");
        navigate("/login");
      }
      else{
        toast.error(`${res.data.error}`)
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong!");
    }
  }
  return (
    <Layout title={"Forgotpassword - LMS"} >
      <div className="form-container" style={{ minHeight: "90vh" }}>
        <form onSubmit={handleSubmit}>
          <h4 className="title">RESET PASSWORD</h4>
          <div className="mb-3">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="form-control"
              id="exampleInputName1"
              placeholder="Enter Your Name"
              required
              autoFocus
            />
          </div>
          <div className="mb-3">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-control"
              id="exampleInputEmail1"
              placeholder="Enter Your Email "
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="form-control"
              id="exampleInputPassword1"
              placeholder="Enter Your  new Password"
              required
            />
          </div>
          <button type="submit" className="btn btn-primary">
            RESET
          </button>
        </form>
      </div>
    </Layout>
  )
}

export default ForgotPassword
