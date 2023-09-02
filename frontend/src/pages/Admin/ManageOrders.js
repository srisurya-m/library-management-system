import React,{useState,useEffect} from 'react'
import Layout from '../../components/layout/Layout'
import AdminMenu from '../../components/layout/AdminMenu'
import { toast } from 'react-hot-toast';
import axios from 'axios';
import Loader from '../../components/Loader';

const ManageOrders = () => {
  const [allOrders,setAllOrders]=useState([])
  const [loading,setLoading]=useState(true)

  const getAllOrders=async()=>{
    try {
      const res= await axios.get("http://localhost:5000/api/order/allorders")
      if(res.data.success){
        setAllOrders(res.data.allorders)
        setLoading(false)
      }
    } catch (error) {
      console.log(error)
      toast.error("Something went Wrong!")
    }
  }

  const handleCollectClick=async(id)=>{
    try {
      const res= await axios.delete(`http://localhost:5000/api/order/recieveorder/${id}`)
      if(res.data.success){
        toast.success("Order can be collected by the user!")
        setAllOrders((prevOrders) => prevOrders.filter(order => order._id !== id));
      }
    } catch (error) {
      console.log(error)
      toast.error("Something went wrong!")
    }
  }

  useEffect(()=>{
    getAllOrders();
  },[])

  return (
    <Layout title={"Dashboard - Manage Orders - LMS"}>
        <div className="container-fluid m-4 p-3">
        <div className="row">
            <div className="col-md-3">
                <AdminMenu/>
            </div>
            <div className="col-md-9">
            <h1>Orders</h1>
            {
              loading ? <Loader/> : 
              <>
              {
                allOrders.map((orders)=>(
                  <div key={orders._id} className="card m-2" style={{width: '24rem'}}>
                  <div className="card-body">
                    <h5 className="card-title">{orders.title}</h5>
                    <p className="card-text"> Author:- {orders.author}</p>
                    <p className="card-text"> User Name:- {orders.name}</p>
                    <p className="card-text"> User Gmail:- {orders.email}</p>
                    <div className="d-flex">
                    <button onClick={()=>(handleCollectClick(orders._id))} className="btn btn-success mx-4">Collect At Outlet</button>
                    </div>
                    </div>
                  </div>
              ))}
              </>
            }
            </div>
        </div>
        </div>
    </Layout>
  )
}

export default ManageOrders
