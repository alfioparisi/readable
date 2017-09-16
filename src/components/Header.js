import React from 'react';
import { NavLink } from 'react-router-dom';

const Header = () => (
  <header>
    <div>
      <button>Nav button</button>
      <h1>Readable</h1>
    </div>
    <nav>
      <ul>
        <li>
          <NavLink to="/">Home</NavLink>
        </li>
        <li>
          <NavLink to="/category">Category</NavLink>
        </li>
      </ul>
    </nav>
  </header>
);

export default Header;
