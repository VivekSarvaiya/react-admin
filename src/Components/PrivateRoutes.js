import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

export const PrivateRoutes = () => {
    console.log(localStorage.getItem("TOKEN"), "token");

    return localStorage.getItem("TOKEN") ? <Outlet /> : <Navigate to="/login" />
}
