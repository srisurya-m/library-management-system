import React, { useEffect, useState } from 'react'
import Layout from '../../components/layout/Layout'
import UserMenu from '../../components/layout/UserMenu'
import { toast } from 'react-hot-toast'
import Loader from '../../components/Loader'
import axios from 'axios'

const Orders = () => {
  const [myOrders,setMyOrders]=useState([])
  const [loading,setLoading]=useState(true)

  const getMyOrders=async()=>{
    try {
      const res= await axios.get(`http://localhost:5000/api/order/myorder`)
      if(res.data.success){
        setMyOrders(res.data.myorder)
        setLoading(false)
      }
    } catch (error) {
      console.log(error)
      toast.error("Something went wrong!")
    }
  }

  useEffect(()=>{
    getMyOrders();
  },[])

  return (
    <Layout title={"My Orders - LMS"}>
      <div className="container-fluid m-4 p-3">
        <div className="row">
            <div className="col-md-3">
                <UserMenu/>
            </div>
            <div className="col-md-9">
                <h1>All Orders</h1>
                {
                  loading ? <Loader/> : 
                  <>
                  {myOrders.map((myOrder)=>(
                    <div key={myOrder._id} className="card m-5" style={{width: '24rem'}}>
                    <div className="card-body">
                      <h5 className="card-title">{myOrder.title}</h5>
                      <p className="card-text"> Author:- {myOrder.author}</p>
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

export default Orders
