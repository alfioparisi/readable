import React from 'react';
import { NavLink } from 'react-router-dom';

const Header = ({ categories }) => (
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
        {categories && categories.map(category => (
          <li key={category.name}>
            <NavLink to={`/category/${category.path}`}>{category.name}</NavLink>
          </li>
        ))}
        <li>
          <NavLink to="/signup">SignUp</NavLink>
        </li>
        <li>
          <NavLink to="/login">LogIn</NavLink>
        </li>
      </ul>
    </nav>
  </header>
);

export default Header;
