import React, { useState } from 'react'
import Layout from '../../components/layout/Layout'
import UserMenu from '../../components/layout/UserMenu'
import { toast } from 'react-hot-toast';
import axios from 'axios';
import { useAuth } from '../../context/auth';

const Profile = () => {
  const [name,setName]=useState("");
  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");
  const [auth]=useAuth();

  const updateUserCreds=async(e)=>{
    e.preventDefault()
    try {
      const res=await axios.put(`http://localhost:5000/api/profile/updatedetails/${auth.user._id}`,{name,email,password});
      if(res.data.success){
        toast.success("Credentials Updated Successfully")
      }
    } catch (error) {
      console.log(error)
      toast.error("Something Went Wrong!")
    }
  }


    return (
        <Layout title={"Profile - LMS"}>
          <div className="container-fluid m-4 p-3">
            <div className="row">
                <div className="col-md-3">
                    <UserMenu/>
                </div>
                <div className="col-md-9">
                    <h1>Update Profile</h1>
                    <form className='w-75' onSubmit={updateUserCreds}>
                      <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label">Name</label>
                        <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="form-control" id="exampleInputName1" aria-describedby="emailHelp" />
                      </div>
                      <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label">Gmail</label>
                        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                      </div>
                      <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label">New Password</label>
                        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="form-control" id="exampleInputPassword1" aria-describedby="emailHelp" />
                      </div>
                      <button type="submit" className="btn btn-primary">Submit</button>
                    </form>
                </div>
            </div>
          </div>
        </Layout>
      )
}

export default Profile
