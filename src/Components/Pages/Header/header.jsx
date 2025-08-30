import "./header.css";
import logo from "../../../assets/logo.png";
import HomeImg from "../../../assets/home.png";
import logoutImg from "../../../assets/logout.png";
import MainImg from "../../../assets/main.png";
import { useNavigate, useLocation } from "react-router-dom";

export default function Header({ currentUser, onLogout }) {
  const navigate = useNavigate();
  const location = useLocation();

  const handleHomeClick = () => {
    navigate('/home');
  };

  const handleMainClick = () => {
    navigate('/main');
  };

  const handleLogoutClick = () => {
    if (onLogout) {
      onLogout();
    }
    navigate('/login');
  };

  // Check if current path is active
  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <div className="header">
      <div className="logo">
        <img src={logo} alt="Reddit Clone Logo" />
        <h2>Reddit Clone</h2>
      </div>
      
      <div className="user-info">
        {currentUser && (
          <span className="welcome-text">
            Welcome, {currentUser.username}
          </span>
        )}
      </div>
      
      <div className="button-container">
        <button 
          onClick={handleHomeClick}
          data-tooltip="Home"
          aria-label="Go to Home"
          className={isActive('/home') ? 'active' : ''}
        >
          <img src={HomeImg} alt="Home" />
        </button>

        <button 
          onClick={handleMainClick}
          data-tooltip="Profile"
          aria-label="Go to Profile"
          className={isActive('/main') ? 'active' : ''}
        >
          <img src={MainImg} alt="Profile" />
        </button>

        <button 
          onClick={handleLogoutClick}
          data-tooltip="Logout"
          aria-label="Logout"
        >
          <img src={logoutImg} alt="Logout" />
        </button>
      </div>
    </div>
  );
}