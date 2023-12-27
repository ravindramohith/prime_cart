import React from 'react'
import { Route } from 'react-router-dom'
import ProtectedRoute from '../auth/ProtectedRoute'
import Dashboard from '../admin/Dashboard'

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
        </>
    )
}

export default Admin