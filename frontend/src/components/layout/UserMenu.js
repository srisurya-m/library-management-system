import React from 'react'
import { NavLink } from 'react-router-dom'

const UserMenu = () => {
  return (
    <>
    <div className="text-center">
    <div className="list-group">
        <h4>Dashboard</h4>
        <NavLink to="/dashboard/user/profile" className="list-group-item list-group-item-action">Update Profile</NavLink>
        <NavLink to="/dashboard/user/orders" className="list-group-item list-group-item-action">My Orders</NavLink>
        <NavLink to="/dashboard/user/issues" className="list-group-item list-group-item-action">My Issues</NavLink>
        <NavLink to="/dashboard/user/order" className="list-group-item list-group-item-action"> Order a Book</NavLink>
        </div>
    </div>
    </>
  )
}

export default UserMenu
