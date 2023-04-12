import React from "react";
import { Route, Routes } from "react-router-dom";
import Dashboard from "./Views/Dashboard";
import Users from "./Views/Users";
import Login from "./Views/Login";
import ForgotPassword from "./Views/ForgotPassword";
import RecentIssues from "./Views/RecentIssues";
import ChangePassword from "./Views/ChangePassword";
import Staff from "./Views/Staff";
import Profile from "./Views/Profile";
import { PrivateRoutes } from "./Components/PrivateRoutes";
import Sidebar from "./Components/Sidebar";
import GoogleMapComp from "./Components/GoogleMapComp";

function Main(props) {
  return (
    <div>
      <Routes>
        <Route path="/forgetpassword" element={<ForgotPassword />} />
        <Route path="/login" element={<Login />} />
        <Route element={<PrivateRoutes />}>
          <Route element={<Sidebar />}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/users" element={<Users />} />
            <Route path="/staff" element={<Staff />} />
            <Route path="/map" element={<GoogleMapComp />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/recentissues" element={<RecentIssues />} />
          </Route>
          <Route path="/changepassword" element={<ChangePassword />} />
        </Route>
      </Routes>
    </div>
  );
}

export default Main;
