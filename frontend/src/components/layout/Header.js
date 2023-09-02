import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import {ImBooks} from 'react-icons/im'
import { useAuth } from '../../context/auth'
import {toast } from 'react-hot-toast'

const Header = () => {
  const [auth,setAuth]=useAuth()
  const handleLogout=()=>{
    setAuth({
      ...auth,
      user:null,
      token:""
    })
    localStorage.removeItem("auth")
    toast.success("Logged out Successfully!")
  }
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
          <Link className="navbar-brand" to="/"><ImBooks/> LMS</Link>
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            {
              !auth.user ? <>
              <li className="nav-item">
              <Link className="nav-link" to="/register">Register</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/login">Login</Link>
            </li></> : <>
            <li className="nav-item dropdown">
              <NavLink className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                {auth?.user?.name}
              </NavLink>
              <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                <li><NavLink className="dropdown-item" to={`/dashboard/${auth?.user?.role === "admin" ? "admin" : "user" }`} >Dashboard</NavLink></li>
                <li className="nav-item">
                  <NavLink className="dropdown-item" onClick={handleLogout} to="/login">Logout</NavLink>
                </li>
              </ul>
            </li>
            </>
            }
            <li className="nav-item mx-2">
              <Link className="nav-link" aria-current="page" to="/">Home</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>

    </>
  )
}

export default Header
