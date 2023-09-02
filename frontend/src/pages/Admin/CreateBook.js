import React,{useState} from 'react'
import Layout from '../../components/layout/Layout'
import AdminMenu from '../../components/layout/AdminMenu'
import {toast} from "react-hot-toast";
import axios from 'axios';

const CreateBook = () => {
  const [title,setTitle]=useState();
  const [author,setAuthor]=useState();
  const [genre,setGenre]=useState();
  const [quantity,setQuantity]=useState();

  //creating a book
  const createSingleBook=async(e)=>{
    e.preventDefault()
    try {
      const {data}= await axios.post("http://localhost:5000/api/book/createbook",{title,author,genre,quantity});
      if(data.success){
        toast.success("Book created successfully!");
      }
      else{
        toast.error(`${data.msg}`)
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong!");
    }

  }

  return (
    <Layout title={"Dashboard - Create Book - LMS"}>
        <div className="container-fluid m-4 p-3">
        <div className="row">
            <div className="col-md-3">
                <AdminMenu/>
            </div>
            <div className="col-md-9">
              <h1>Create a Book</h1>
            <form className='w-75' onSubmit={createSingleBook}>
            <div className="mb-3">
              <label htmlFor="exampleInputEmail1" className="form-label">Title</label>
              <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} className="form-control" id="exampleInputTitle1" aria-describedby="emailHelp" />
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputEmail1" className="form-label">Author</label>
              <input type="text" value={author} onChange={(e) => setAuthor(e.target.value)} className="form-control" id="exampleInputAuthor1" aria-describedby="emailHelp" />
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputEmail1" className="form-label">Genre</label>
              <input type="text" value={genre} onChange={(e) => setGenre(e.target.value)} className="form-control" id="exampleInputGenre1" aria-describedby="emailHelp" />
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputEmail1" className="form-label">Quantity</label>
              <input type="number" value={quantity} onChange={(e) => setQuantity(e.target.value)} className="form-control" id="exampleInputQuantity1" aria-describedby="emailHelp" />
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
          </form>

            </div>
        </div>
        </div>
    </Layout>
  )
}

export default CreateBook
