import React,{useState} from 'react'
import Layout from '../../components/layout/Layout'
import AdminMenu from '../../components/layout/AdminMenu';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const UpdateBook = () => {
    const [title,setTitle]=useState("");
  const [author,setAuthor]=useState("");
  const [genre,setGenre]=useState("");
  const [quantity,setQuantity]=useState();
  const { id } = useParams();
  const navigate=useNavigate();

    const updateBook=async(e)=>{
        try {
            e.preventDefault();
            const res=await axios.put(`http://localhost:5000/api/book/updatebook/${id}`,{title,author,genre,quantity})
            if(res.data.success){
              navigate("/dashboard/admin/manage-book");
              toast.success("Book updated Successfully!") 
            }
            else{
              toast.error(`${res.data.msg}`)
            }

        } catch (error) {
            console.log(error)
            toast.error("Something went wrong!")
        }
    }

  return (
    <Layout title={"Dashboard - Update Book - LMS"}>
        <div className="container-fluid m-4 p-3">
        <div className="row">
            <div className="col-md-3">
                <AdminMenu/>
            </div>
            <div className="col-md-9">
                <h1>Update the Selected Book:-</h1>
            <form className='w-75' onSubmit={updateBook}>
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

export default UpdateBook
