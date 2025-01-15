import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './Header.css';

const Header = () => {
  const navigate = useNavigate();
  const page = useLocation();
  const mainPage = page.pathname === "/"; 

  const goHome = () => {
    navigate('/');
  };

  return (
    <header className="header">
      <h1 className="header-title">Smart Gardening</h1>

      {!mainPage && (
        <button onClick={goHome} className="home-btn">
          Go Home
        </button>
      )}
    </header>
  );
};

export default Header;