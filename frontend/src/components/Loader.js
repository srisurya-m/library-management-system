import React from 'react'

const Loader = () => {
  return (
    <>
      <div className="spinner-grow m-2" style={{ animationDelay: "1s" }} role="status">
    <span className="visually-hidden">Loading...</span>
    </div>
      <div className="spinner-grow m-2 " style={{ animationDelay: "1.5s" }} role="status">
    <span className="visually-hidden">Loading...</span>
    </div>
      <div className="spinner-grow m-2 " style={{ animationDelay: "2s" }} role="status">
    <span className="visually-hidden">Loading...</span>
    </div>
    </>
  )
}

export default Loader
