import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './Header.css';

const Header = () => {
  const navigate = useNavigate();
  const page = useLocation(); // Use useLocation to get the current path
  const mainPage = page.pathname === "/"; // Check if it's the main page

  const goHome = () => {
    navigate('/');
  };

  return (
    <header className="header">
      <h1 className="header-title">Smart Gardening</h1>
      {/* Only show the home button if it's not the main page */}
      {!mainPage && (
        <button onClick={goHome} className="home-btn">
          Go Home
        </button>
      )}
    </header>
  );
};

export default Header;