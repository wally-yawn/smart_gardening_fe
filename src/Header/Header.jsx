import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import './Header.css';

const Header = () => {
  const navigate = useNavigate();
  const page = useLocation();

  const isMainPage = page.pathname === "/";
  const isGardenPage = page.pathname === "/mygarden";
  const title = isMainPage
    ? "Welcome to Smart Gardening"
    : isGardenPage
    ? "What a Wonderful Garden"
    : "Oops! This page doesn’t exist. 🌱";

  const goHome = () => {
    navigate('/');
  };

  return (
    <>
      <header className="header">
        <section className='animation-container'>

        <DotLottieReact
            src="https://lottie.host/2d329e8e-3849-48e2-a940-4939e1314e4c/M1alAvpStN.lottie"
            loop
            autoplay
            className="lottie-animation-container"
          />
        </section>
        <section className="header-title">

          <h1>
            {title}
          </h1>
        
        </section>
        

        {!isMainPage && (
          <button onClick={goHome} className="home-btn"aria-labelledby="Home">
            Go Home
          </button>
        )}
      </header>
    </>
  );
};

export default Header;