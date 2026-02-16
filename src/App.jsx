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
//import Dashboard from "./Dashboard"; // Atkomentuok, kai sukursi failą

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(
    localStorage.getItem("isLoggedIn") === "true",
  );

  const handleLogin = () => {
    localStorage.setItem("isLoggedIn", "true");
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    setIsAuthenticated(false);
  };

  return (
    <Router>
      <Toaster position="top-center" reverseOrder={false} />
      <Routes>
        {/* PAGRINDINIS PUSLAPIS */}
        <Route
          path="/"
          element={isAuthenticated ? <Navigate to="/dashboard" /> : <Welcome />}
        />

        {/* REGISTRACIJA IR PRISIJUNGIMAS */}
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login onLoginSuccess={handleLogin} />} />

        {/* DARBUOTOJŲ SĄRAŠAS (APSAUGOTAS) */}
        <Route
          path="/dashboard"
          element={
            isAuthenticated ? (
              <Dashboard onLogout={handleLogout} />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
