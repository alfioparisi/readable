import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      active: false
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.currentUser) this.setState({active: true});
    else this.setState({active: false});
  }

  render() {
    const { categories, currentUser, onClick } = this.props;
    const { active } = this.state;
    return (
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
            {active && (
              <li>
                <button
                  onClick={() => onClick(currentUser.name)}
                >LogOut</button>
              </li>
            )}
            {!active && (
              <li>
                <NavLink to="/signup">SignUp</NavLink>
              </li>
            )}
            {!active && (
              <li>
                <NavLink to="/login">LogIn</NavLink>
              </li>
            )}
          </ul>
        </nav>
      </header>
    );
  }
}

export default Header;
