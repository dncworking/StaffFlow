import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { Toaster } from "react-hot-toast";
import React, { useState } from "react";
import Register from "./Register";
import Login from "./Login";
import Welcome from "./Welcome";
import EmployeesList from "./EmployeesList";
import AddForm from "./AddEmployeesForm";
import EditEmployee from "./EditEmployee";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem("user") !== null;
  });

  const handleLogin = () => {
    localStorage.setItem("isLoggedIn", "true");
    setIsAuthenticated(true);
  };


  return (
    <Router>
      <Toaster position="top-center" reverseOrder={false} />
      <Routes>
        {/* PAGRINDINIS PUSLAPIS */}
        <Route path="/" element={<Welcome />} />

        {/* REGISTRACIJA IR PRISIJUNGIMAS */}
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login onLoginSuccess={handleLogin} />} />

        {/* DARBUOTOJŲ SĄRAŠAS (APSAUGOTAS) */}
        <Route
          path="/employees"
          element={
            isAuthenticated ? (
              <EmployeesList/>
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route path="/edit/:id" element={<EditEmployee />} />
        <Route path="/addEmployeeForm" element={<AddForm />} />
      </Routes>
    </Router>
  );
}

export default App;
