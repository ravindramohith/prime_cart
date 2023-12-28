import React from 'react'
import { Route } from 'react-router-dom'
import ProtectedRoute from '../auth/ProtectedRoute'
import Dashboard from '../admin/Dashboard'
import AdminProducts from '../admin/AdminProducts'

const Admin = () => {
    return (
        <>
            <Route
                path="/admin/dashboard"
                element={
                    <ProtectedRoute admin>
                        <Dashboard />
                    </ProtectedRoute>
                }
            />
            <Route
                path="/admin/products"
                element={
                    <ProtectedRoute admin>
                        <AdminProducts />
                    </ProtectedRoute>
                }
            />
        </>
    )
}

export default Admin