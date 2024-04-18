// Header.js
import React from 'react';
import logo from '../assets/logo.png';
import './Header.css';

const Header = () => {
  return (
    <header className="header">
      <img src={logo} alt="PlayMate Logo" className="logo" />
      <h1 className="title">PlayMate</h1>
    </header>
  );
};

export default Header;
