import React from "react";
import { Route, Routes } from "react-router-dom";
import Dashboard from "./Pages/Dashboard";
import Users from "./Pages/Users";
import Login from "./Pages/Login";
import ForgotPassword from "./Pages/ForgotPassword";
import RecentIssues from "./Pages/RecentIssues";
import ChangePassword from "./Pages/ChangePassword";
import Staff from "./Pages/Staff";
import Reports from "./Pages/Reports";

function Main(props) {
  return (
    <div>
      {/* <BrowserRouter> */}
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/users" element={<Users />} />
        <Route path="/staff" element={<Staff />} />
        <Route path="/reports" element={<Reports />} />
        <Route path="/login" element={<Login />} />
        <Route path="/recentissues" element={<RecentIssues />} />
        <Route path="/forgetpassword" element={<ForgotPassword />} />
        <Route path="/changepassword" element={<ChangePassword />} />
      </Routes>
      {/* </BrowserRouter> */}
    </div>
  );
}

export default Main;
