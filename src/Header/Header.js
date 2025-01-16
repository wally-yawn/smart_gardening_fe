import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import './Header.css';

const Header = () => {
  const navigate = useNavigate();
  const page = useLocation();
  const mainPage = page.pathname === "/"; 

  const goHome = () => {
    navigate('/');
  };

  return (
    <>
      <header className="header">
        <div className="animation-container">
        <DotLottieReact
        src="https://lottie.host/2d329e8e-3849-48e2-a940-4939e1314e4c/M1alAvpStN.lottie"
        loop
        autoplay
      />
          <h1 className="header-title">Welcome to Smart Gardening</h1>
        </div>

        {!mainPage && (
          <button onClick={goHome} className="home-btn">
            Go Home
          </button>
        )}
      </header>
    </>
  );
};

export default Header;