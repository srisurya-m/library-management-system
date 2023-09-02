import React, { useEffect, useState } from 'react'
import Layout from '../../components/layout/Layout'
import UserMenu from '../../components/layout/UserMenu'
import { toast } from 'react-hot-toast';
import axios from 'axios';
import { useAuth } from '../../context/auth';
import Loader from '../../components/Loader';
import { useNavigate } from 'react-router-dom';

const Issues = () => {
  const [myIssues,setMyIssues]=useState([]);
  const[loading,setLoading]=useState(true)
  const[auth]=useAuth()
  const navigate=useNavigate()

  const getMyIssues=async()=>{
    try {
      const res=await axios.get(`http://localhost:5000/api/book/myissues/${auth.user._id}`)
      console.log(res)
      if(res.data.success){
        setMyIssues(res.data.myIssuedBooks)
        setLoading(false)
      }
    } catch (error) {
      console.log(error)
      toast.error("Something Went Wrong!")
    }
  }

  useEffect(()=>{
    getMyIssues();
    // eslint-disable-next-line
  },[])

    return (
        <Layout title={"My Issues - LMS"}>
          <div className="container-fluid m-4 p-3">
            <div className="row">
                <div className="col-md-3">
                    <UserMenu/>
                </div>
                <div className="col-md-9">
                    <h1>All Issues</h1>
                    <div className="row">
                    {loading ? <Loader/> : myIssues.map((issue)=>(
                      <>
                        <div key={issue._id} className="card m-4" onClick={()=>navigate(`/${issue.book_id}`)} style={{width: '18rem'}}>
                        <div className="card-body">
                          <h5 className="card-title">{issue.title}</h5>
                          <p className="card-text"> Author:- {issue.author}</p>
                          <p className="card-text"> Issue Date:- {issue.issuedate}</p>
                          <p className="card-text"> Return Date:- {issue.returndate}</p>
                          </div>
                      </div>
                      </>
                    ))}
                    </div>
                </div>
            </div>
          </div>
        </Layout>
      )
}

export default Issues
