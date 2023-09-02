import React, { useState } from 'react'
import Layout from '../../components/layout/Layout'
import { toast } from 'react-hot-toast';
import UserMenu from '../../components/layout/UserMenu';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const OrderBook = () => {
    const [name,setName]=useState("");
  const [email,setEmail]=useState("");
  const[title,setTitle]=useState("")
  const[author,setAuthor]=useState("")
  const navigate=useNavigate();

    const placeBookOrder=async(e)=>{
        e.preventDefault()
        try {
            const res= await axios.post(`http://localhost:5000/api/order/placeorder`,{name,email,title,author})
            console.log(res.data)
            if(res.data.success){
                toast.success("Order placed Successfully!")
                navigate("/")
            }
            if(!res.data.success){
                toast.error(`${res.data.msg}`)
            }
        } catch (error) {
            console.log(error)
            toast.error("Something Went Wrong!")
        }
    }

  return (
    <Layout title={"Order a Book - LMS"}>
          <div className="container-fluid m-4 p-3">
            <div className="row">
                <div className="col-md-3">
                    <UserMenu/>
                </div>
                <div className="col-md-9">
                    <h1>Order Book</h1>
                    <form className='w-75' onSubmit={placeBookOrder}>
                      <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label">Name</label>
                        <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="form-control" id="exampleInputName1" aria-describedby="emailHelp" />
                      </div>
                      <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label">Gmail</label>
                        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                      </div>
                      <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label">Title of Book</label>
                        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} className="form-control" id="exampleInputTitle1" aria-describedby="emailHelp" />
                      </div>
                      <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label">Author of Book</label>
                        <input type="text" value={author} onChange={(e) => setAuthor(e.target.value)} className="form-control" id="exampleInputAuthor1" aria-describedby="emailHelp" />
                      </div>
                      <button type="submit" className="btn btn-primary">Place Order</button>
                    </form>
                </div>
            </div>
          </div>
        </Layout>
  )
}

export default OrderBook
