import React from 'react'
import Layout from '../../components/layout/Layout'
import AdminMenu from '../../components/layout/AdminMenu'
import { useAuth } from '../../context/auth'

const AdminDashboard = () => {
  const[auth]=useAuth()
  return (
    <Layout>
      <div className="container-fluid m-4 p-3">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu/>
          </div>
          <div className="col-md-9">
            <div className="card w-75 p-2">
              <h3>Admin Name:- {auth?.user?.name}</h3>
              <h3>Admin Email:- {auth?.user?.email}</h3>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default AdminDashboard
