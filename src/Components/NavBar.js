import React from 'react';
import { Link } from 'react-router-dom';
import './NavBar.css';

function NavBar() {
  return (
    <nav className="navbar">
      <ul>
        <li><Link to="/student" className="nav-link">Student List</Link></li>
        <li><Link to="/faculty" className="nav-link">Faculty List</Link></li>
        <li><Link to="/upload" className="nav-link">Data Upload</Link></li>
      </ul>
    </nav>
  );
}

export default NavBar;
