import React, { useEffect, useState } from 'react'
import Layout from '../../components/layout/Layout'
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import axios from 'axios';
import Loader from '../../components/Loader';

const BookPage = () => {
    const { id } = useParams();
    const[bookDetails,setBookDetails]=useState([])
    const[loading,setLoading]=useState(true)
    const[hasIssued,setHasIssued]=useState(false)
    const navigate=useNavigate()

    const getBookDetails=async()=>{
        try {
            const res=await axios.get(`http://localhost:5000/api/book/bookdetails/${id}`)
            if(res.data.success){
                setBookDetails(res.data.bookdetails)
                setLoading(false)
            }
        } catch (error) {
            console.log(error)
            toast.error("Something went wrong!")
        }
    }

    const HasIssuedBook=async()=>{
        try {
            const res= await axios.get(`http://localhost:5000/api/book/is-issue/${id}`)
            if(res.data.success){
                setHasIssued(true);
            }
        } catch (error) {
            console.log(error)
            toast.error("Something went wrong!")
        }
    }

    const handleIssueClick=async()=>{
        try {
            const res= await axios.post(`http://localhost:5000/api/book/issue/${id}`)
            if(res.data.success){
                navigate("/")
                toast.success("Book Issued Successfully!")
            }
            else{
                toast.error(`${res.data.msg}`)
            }
        } catch (error) {
            console.log(error)
            toast.error("Something went wrong!")
        }
    }

    const handleReturnClick=async()=>{
        try {
            const res= await axios.post(`http://localhost:5000/api/book/return/${id}`)
            if(res.data.success){
                navigate("/")
                toast.success("Book Returned Successfully!")
            }
        } catch (error) {
            console.log(error)
            toast.error("Something went wrong!")
        }
    }

    useEffect(()=>{
        getBookDetails();
        HasIssuedBook();
        // eslint-disable-next-line
    },[])

  return (
    <Layout>
      <div className="container-fluid row d-flex flex-wrap">
        <div className="col-md-6">
        {loading ? <Loader/> : <img src={bookDetails.image.url} alt="Book" className='m-5' style={{height: "25rem"}} />}
        </div>
      <div className="mt-5 col-md-6">
        <h1> {bookDetails.title}</h1>
        <h4>Author:- {bookDetails.author}</h4>
        <h4>Genre:- {bookDetails.genre}</h4>
        <h3 className='text-success'>{bookDetails.quantity>0 ? "In Stock": "Out of Stock"}</h3>
        <h4>Description:-</h4>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere animi, ipsum distinctio doloribus voluptatem laboriosam aliquam atque deleniti sed, impedit mollitia vitae suscipit, neque fuga similique tenetur provident quos delectus totam modi consequuntur voluptatum ullam dolores. Deleniti error culpa sit quidem, dolores laborum asperiores distinctio accusamus! Exercitationem, voluptas quia. Ad dolor impedit iusto provident reprehenderit quia maiores deleniti, repellendus hic quos obcaecati, beatae excepturi odio alias, facilis voluptas. Inventore deserunt quas distinctio molestiae at magnam iste magni dignissimos, nobis consectetur.</p>
      <div>
        <button className='btn btn-primary m-4' onClick={()=>handleIssueClick()}>Issue this Book</button>
        <button className='btn btn-primary m-4' disabled={!hasIssued} onClick={()=>handleReturnClick()}>Return this Book</button>
      </div>
      </div>
      </div>
    </Layout>
  )
}

export default BookPage
