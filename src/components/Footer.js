// import React from 'react';
// import { NavLink } from 'react-router-dom';
// import { connect } from 'react-redux';
//
// /**
//   @param {array} : the available categories
//   @param {string} : the logged in user, if any
// */
// const Footer = ({ categories, currentUser }) => (
//   <footer className="main-footer">
//     <nav className="footer-nav">
//       <ul>
//         <li className="nav-list-item">
//           <NavLink to={'/'} className="nav-link">home</NavLink>
//         </li>
//         {!currentUser && (
//           <li className="nav-list-item">
//             <NavLink to={'/signup'} className="nav-link">signup</NavLink>
//           </li>
//         )}
//         {!currentUser && (
//           <li className="nav-list-item">
//             <NavLink to={'/login'} className="nav-link">login</NavLink>
//           </li>
//         )}
//       </ul>
//     </nav>
//     <nav className="footer-nav">
//       <ul>
//         <li className="nav-list-item">
//           <NavLink to={'/category'} className="nav-link">all categories</NavLink>
//         </li>
//         {categories && categories.map(category => (
//           <li key={category} className="nav-list-item">
//             <NavLink to={`/category/${category}`} className="nav-link">{category}</NavLink>
//           </li>
//         ))}
//       </ul>
//     </nav>
//   </footer>
// );
//
// const mapStateToProps = state => ({
//   categories: state.categories,
//   currentUser: state.currentUser
// });
//
// export default connect(mapStateToProps)(Footer);

import React, { Component } from 'react';
import FontIcon from 'material-ui/FontIcon';
import { BottomNavigation, BottomNavigationItem } from 'material-ui/BottomNavigation';
import Paper from 'material-ui/Paper';
import { NavLink, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

class Footer extends Component {
  state = {
    selectedIndex: 0,
  };

  select = (index) => this.setState({selectedIndex: index});

  render() {
    const { categories } = this.props;
    return (
      <footer>
        <Paper zDepth={1}>
          <BottomNavigation selectedIndex={this.state.selectedIndex}>
            <BottomNavigationItem
              label={<NavLink to='/' className="nav-link">home</NavLink>}
              icon={<FontIcon />}
              onClick={() => this.select(0)}
            />
            <BottomNavigationItem
              label={<NavLink to='/signup' className="nav-link">signup</NavLink>}
              icon={<FontIcon />}
              onClick={() => this.select(1)}
            />
            <BottomNavigationItem
              label={<NavLink to='/login' className="nav-link">login</NavLink>}
              icon={<FontIcon />}
              onClick={() => this.select(2)}
            />
          </BottomNavigation>
        </Paper>
        <Paper zDepth={1}>
          <BottomNavigation selectedIndex={this.state.selectedIndex}>
            {categories && categories.map((category, idx) => (
              <BottomNavigationItem key={category}
                label={<NavLink to={`category/${category}`} className="nav-link">{category}</NavLink>}
                icon={<FontIcon />}
                onClick={() => this.select(idx)}
              />
            ))}
          </BottomNavigation>
        </Paper>
      </footer>
    );
  }
}

const mapStateToProps = state => ({
  categories: state.categories
});

export default withRouter(connect(mapStateToProps)(Footer));
