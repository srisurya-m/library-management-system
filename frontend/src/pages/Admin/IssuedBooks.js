import React,{useState,useEffect} from 'react'
import Layout from '../../components/layout/Layout'
import AdminMenu from '../../components/layout/AdminMenu'
import { toast } from 'react-hot-toast';
import axios from 'axios';
import Loader from '../../components/Loader';

const IssuedBooks = () => {
  const [issuedBooks,setIssuedBooks]=useState([]);
  const [loading,setLoading]=useState(true);
  const getIssuedBooks=async()=>{
    try {
      const {data}=await axios.get("http://localhost:5000/api/book/issues")
      if(data){
        setIssuedBooks(data.IssuedBooks)
        setLoading(false)
      }
    } catch (error) {
      console.log(error)
      toast.error("Something went wrong!");
    }
  }

  useEffect(()=>{
    getIssuedBooks();
  },[])

  return (
    <Layout title={"Dashboard - Issued Book - LMS"}>
        <div className="container-fluid m-4 p-3">
        <div className="row">
            <div className="col-md-3">
                <AdminMenu/>
            </div>
            <div className="col-md-9">
            <h1>Issued books</h1>
            <div className="row">
            {loading ? <Loader/> :
            <>
            {issuedBooks.map((issuedBook)=>(
            <div key={issuedBook._id} className="card m-2" style={{width: '25.5rem'}}>
            <div className="card-body">
              <h5 className="card-title">{issuedBook.title}</h5>
              <p className="card-text"> Author:- {issuedBook.author}</p>
              <p className="card-text"> User Id :- {issuedBook.user_id}</p>
              <p className="card-text text-danger"> User's name and contact details of the user are not shared to maintain the confidentiality </p>
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

export default IssuedBooks
