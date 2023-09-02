import React from 'react'
import { NavLink } from 'react-router-dom'


const AdminMenu = () => {
  return (
    <>
    <div className="text-center">
    <div className="list-group">
        <h4>Admin Panel</h4>
        <NavLink to="/dashboard/admin/create-book" className="list-group-item list-group-item-action">Create a Book</NavLink>
        <NavLink to="/dashboard/admin/manage-book" className="list-group-item list-group-item-action">Manage Books</NavLink>
        <NavLink to="/dashboard/admin/manage-orders" className="list-group-item list-group-item-action">Manage Orders</NavLink>
        <NavLink to="/dashboard/admin/users" className="list-group-item list-group-item-action">Manage all Users</NavLink>
        <NavLink to="/dashboard/admin/issued-books" className="list-group-item list-group-item-action">View Issued Books</NavLink>
        </div>
    </div>
    </>
  )
}

export default AdminMenu
