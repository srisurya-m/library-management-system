import React,{useState,useEffect} from 'react'
import Layout from '../../components/layout/Layout'
import AdminMenu from '../../components/layout/AdminMenu'
import { toast } from 'react-hot-toast';
import axios from 'axios';
import { NavLink } from 'react-router-dom';
import Loader from '../../components/Loader';

const ManageBook = () => {
  const [allBooks,setAllBooks]=useState([]);
  const [loading,setLoading]=useState(true);
  const getAllBooks=async()=>{
    try {
      const {data}=await axios.get("http://localhost:5000/api/book/allbooks")
      if(data){
        setAllBooks(data.allbooks)
        setLoading(false)
      }
    } catch (error) {
      console.log(error)
      toast.error("Something went wrong!");
    }
  }

  const handleDeleteClick=async(id)=>{
    try {
      const res=await axios.delete(`http://localhost:5000/api/book/deletebook/${id}`)
    if(res.data.success){
      toast.success("Book deleted successfully!")
      setAllBooks((prevBooks) => prevBooks.filter(book => book._id !== id));
    } 
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(()=>{
    getAllBooks();
  },[])

  return (
    <Layout title={"Dashboard - Manage Book - LMS"}>
        <div className="container-fluid m-4 p-3">
        <div className="row">
            <div className="col-md-3">
                <AdminMenu/>
            </div>
            <div className="col-md-9">
            <h1>Manage book</h1>
            <div className="row">
            {loading ? <Loader/> :
            <>
            {allBooks.map((book)=>(
            <div key={book._id} className="card m-2" style={{width: '18rem'}}>
            <img src={book.image.url} className="card-img-top" alt="book" />
            <div className="card-body">
              <h5 className="card-title">{book.title}</h5>
              <p className="card-text"> Quantity Available:- {book.quantity}</p>
              <p className="card-text"> Author:- {book.author}</p>
              <p className="card-text"> Genre:- {book.genre}</p>
              <div className="d-flex">
              <NavLink to={`/dashboard/admin/manage-book/${book._id}`} className="btn btn-primary mx-4">Edit</NavLink>
              <button onClick={()=>{handleDeleteClick(book._id)}} className="btn btn-danger mx-4">Delete</button>
              </div>
              </div>
            </div>
          ))} 
          </>
          }
          </div>
            </div>
        </div>
        </div>
    </Layout>
  )
}

export default ManageBook
