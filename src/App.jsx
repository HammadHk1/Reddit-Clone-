import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Login from "./Components/Pages/Authentication/Login";
import Main from "./Components/Pages/Main/main";
import Home from "./Components/Home/Home";
import "./App.css";

// Session timeout in milliseconds (10 minutes)
const SESSION_TIMEOUT = 10 * 60 * 1000;

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [sessionTimer, setSessionTimer] = useState(null);

  const handleLogin = (user) => {
    setCurrentUser(user);
    const userData = {
      ...user,
      loginTime: Date.now()
    };
    localStorage.setItem("currentUser", JSON.stringify(userData));
    
    // Start session timer
    startSessionTimer();
  };

  const handleLogout = () => {
    setCurrentUser(null);
    localStorage.removeItem("currentUser");
    clearSessionTimer();
  };

  const clearSessionTimer = () => {
    if (sessionTimer) {
      clearTimeout(sessionTimer);
      setSessionTimer(null);
    }
  };

  const startSessionTimer = () => {
    clearSessionTimer();
    const timer = setTimeout(() => {
      alert("Your session has expired. Please login again.");
      handleLogout();
    }, SESSION_TIMEOUT);
    
    setSessionTimer(timer);
  };

  const checkSessionExpiry = (userData) => {
    if (!userData || !userData.loginTime) return false;
    
    const currentTime = Date.now();
    const loginTime = userData.loginTime;
    const elapsedTime = currentTime - loginTime;
    
    return elapsedTime < SESSION_TIMEOUT;
  };

  // Check for existing login on app load
  useEffect(() => {
    const savedUser = localStorage.getItem("currentUser");
    if (savedUser) {
      const userData = JSON.parse(savedUser);
      
      if (checkSessionExpiry(userData)) {
        setCurrentUser(userData);
        startSessionTimer();
      } else {
        localStorage.removeItem("currentUser");
      }
    }
  }, []);

  // Reset timer on user activity
  useEffect(() => {
    const resetTimer = () => {
      if (currentUser) {
        startSessionTimer();
      }
    };

    window.addEventListener('mousemove', resetTimer);
    window.addEventListener('keypress', resetTimer);
    window.addEventListener('click', resetTimer);

    return () => {
      window.removeEventListener('mousemove', resetTimer);
      window.removeEventListener('keypress', resetTimer);
      window.removeEventListener('click', resetTimer);
    };
  }, [currentUser]);

  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Redirect to Home if logged in, else Login */}
          <Route
            path="/"
            element={
              currentUser ? (
                <Navigate to="/home" replace />
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />

          {/* Login */}
          <Route
            path="/login"
            element={
              currentUser ? (
                <Navigate to="/home" replace />
              ) : (
                <Login onLogin={handleLogin} />
              )
            }
          />

          {/* Home - default page after login */}
          <Route
            path="/home"
            element={
              currentUser ? (
                <Home currentUser={currentUser} onLogout={handleLogout} />
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />

          {/* Main - accessible via navbar */}
          <Route
            path="/main"
            element={
              currentUser ? (
                <Main currentUser={currentUser} onLogout={handleLogout} />
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />

          {/* Catch all */}
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
