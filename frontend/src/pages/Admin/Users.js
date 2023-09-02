import React,{useState,useEffect} from 'react'
import Layout from '../../components/layout/Layout'
import AdminMenu from '../../components/layout/AdminMenu'
import { toast } from 'react-hot-toast';
import axios from 'axios';

const Users = () => {
  const [users,setUsers]=useState([]);

  const getAllUsers=async()=>{
    try {
      const res=await axios.get("http://localhost:5000/api/profile/userdetails")
      if(res.data.success){
        setUsers(res.data.usersdetail)
      }
    } catch (error) {
      console.log(error)
      toast.error("Something went wrong!")
    }
  }

  const handleChangeRole=async(id,role)=>{
    try {
      const res=await axios.put(`http://localhost:5000/api/profile/changerole/${id}`,{role})
      if(res.data.success){
        toast.success("Role Updated Successfully!")

        setUsers(prevUsers =>
          prevUsers.map(user =>
            user._id === id ? { ...user, role: role } : user
          )
        );
      }
    } catch (error) {
      console.log(error)
      toast.error("Something went wrong!")
    }
  }

  const handleDeleteClick=async(id)=>{
    try {
      const res=await axios.delete(`http://localhost:5000/api/profile/deleteuser/${id}`)
      if(res.data.success){
        toast.success("User Deleted Successfully!");

        setUsers((prevUsers) => prevUsers.filter(user => user._id !== id));
      }
    } catch (error) {
      console.log(error)
      toast.error("Something went Wrong!")
    }
  }


  useEffect(()=>{
    getAllUsers()
  },[])

  return (
    <Layout title={"Dashboard - All Users - LMS"}>
        <div className="container-fluid m-4 p-3">
        <div className="row">
            <div className="col-md-3">
                <AdminMenu/>
            </div>
            <div className="col-md-9">
            <h1>All users</h1>
            <div className="d-flex flex-wrap ">
            {
              users.map((user)=>(
                <div key={user._id} className="card m-3" style={{width: '22.6rem'}}>
                  <div className="card-body">
                    <h5 className="card-title">{user.name}</h5>
                    <h6 className="card-subtitle mb-2 text-muted">Email:- {user.email}</h6>
                    <h6 className="card-subtitle mb-2 text-muted">Date of Joining:- {user.date}</h6>
                    <h6 className="card-subtitle mb-2 text-muted">Role:- {user.role}</h6>
                    <div className="d-flex flex-wrap">
                    <div className="dropdown m-2">
                      <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                        Change Role
                      </button>
                      <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                        <li><button className="dropdown-item" onClick={() => handleChangeRole(user._id, "admin")} >Admin</button></li>
                        <li><button className="dropdown-item" onClick={() => handleChangeRole(user._id, "user")} >User</button></li>
                      </ul>
                    </div>
                    <button onClick={()=> handleDeleteClick(user._id)} className="btn btn-danger m-2">Delete User</button>
                    </div>
                  </div>
                </div>

              ))
              }
              </div>
            </div>
        </div>
        </div>
    </Layout>
  )
}

export default Users
