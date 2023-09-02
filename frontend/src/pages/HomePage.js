import React, { useState,useEffect} from 'react'
import Layout from '../components/layout/Layout'
import { toast } from 'react-hot-toast';
import axios from 'axios';
import { useAuth } from '../context/auth'
import { NavLink} from 'react-router-dom';
import Loader from '../components/Loader';
import "../styles/HomePage.css"
import Typewriter from "typewriter-effect";

const HomePage = () => {
  const [auth]=useAuth();
  const [allBooks,setAllBooks]=useState([]);
  const [loading,setLoading]=useState(true);
  const [page,setPage]=useState(1)
  const [search,setSearch]=useState("");
  const [searchedBooks, setSearchedBooks] = useState([]);

  const handleInfinitScroll=async()=>{
    try {
      if(window.innerHeight + document.documentElement.scrollTop  + 1 >= document.documentElement.scrollHeight ){
        setPage((prev)=>prev+1)
      }
    } catch (error) {
      console.log(error)
    }
  }

  //get all books pagewise(Pagination)
  const getAllBooks=async()=>{
    try {
      const {data}=await axios.get(`http://localhost:5000/api/book/pagination?page=${page}`)
      if(data.totalPages>=page){
        setAllBooks((prev)=>[...prev,...data.books])
        setLoading(false)
      }
    } catch (error) {
      console.log(error)
      toast.error("Something went wrong!");
    }
  }

  //Searching a book
  const getSearchedBooks=async(search)=>{
    try {
      if(search){
        const res= await axios.get(`http://localhost:5000/api/book/search?title=${search}`)
        if(res.data.success){
          return res.data.books;
        }
        else{
          // toast.error(`${res.data.msg}`)
          return res.data.books
        }
      }
    } catch (error) {
      console.log(error)
      toast.error("Something went wrong")
    }
  }

  useEffect(()=>{
    getAllBooks();
    // eslint-disable-next-line 
  },[page])

  useEffect(()=>{
    window.addEventListener("scroll",handleInfinitScroll);
    return ()=>window.removeEventListener("scroll",handleInfinitScroll)
  },[])
  
  useEffect(() => {
    const fetchSearchedBooks = async () => {
      const books = await getSearchedBooks(search);
      if (books) {
        setSearchedBooks(books);
        setLoading(false);
      }
    };
    fetchSearchedBooks();
  }, [search]);

    return (
    <Layout title={"Home-LMS"}>
      {/* <pre>{JSON.stringify(auth,null,4)} </pre> */}
      <div className=" App d-flex justify-content-center align-items-center">
            <Typewriter
                onInit={(typewriter) => {
                    typewriter
                        .typeString("...LMS...")
                        .pauseFor(250)
                        .deleteAll()
                        .typeString("Welcomes You")
                        .pauseFor(250)
                        .deleteAll()
                        .typeString("Experience Learning...")
                        .pauseFor(250)
                        .deleteAll()
                        .typeString("Beyond Borders & Abilities..")
                        .start();
                }}
            />
        </div>
        <div className=" container mt-4 d-flex justify-content-center">
          <div className="form w-100 justify-content-center">
          <i className="fas fa-search"></i>
          <input className="w-100 rounded-pill p-2 form-control form-input" value={search} onChange={(e)=>setSearch(e.target.value)} type="text" placeholder='Search Title Of Book Here' />
        </div>
        </div>
      <div className="d-flex flex-wrap justify-content-center">
      {loading ? <Loader/> : search  && searchedBooks.length>0 ?
            <>
            {
            searchedBooks.map((book) => (
              <div key={book._id} className="card m-5" style={{width: '18rem'}}>
              <img src={book.image.url} className="card-img-top" alt="book" />
              <div className="card-body">
                <h5 className="card-title">{book.title}</h5>
                <p className="card-text"> Author:- {book.author}</p>
                <p className="card-text"> Genre:- {book.genre}</p>
                <div className="d-flex">
                <NavLink to={!auth.token ? "/login" : `/${book._id}`}  className="btn btn-primary mx-4">View</NavLink>
                </div>
                </div>
              </div>
            ))}
            </> :
            <>
            {allBooks.map((book)=>(
            <div key={book._id} className="card m-5" style={{width: '18rem'}}>
            <img src={book.image.url} className="card-img-top" alt="book" />
            <div className="card-body">
              <h5 className="card-title">{book.title}</h5>
              <p className="card-text"> Author:- {book.author}</p>
              <p className="card-text"> Genre:- {book.genre}</p>
              <div className="d-flex">
              <NavLink to={!auth.token ? "/login" : `/${book._id}`}  className="btn btn-primary mx-4">View</NavLink>
              </div>
              </div>
            </div>
          ))} 
          </>
          }
      </div>  

    </Layout>
  )
}

export default HomePage
