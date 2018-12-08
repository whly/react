import React, { Component } from 'react';
import { Link } from 'react-router-dom';
class Nav extends Component {
  render() {
    return (
        <div className="nav">
            <nav>
              <ul>
                <li><h2><Link to="crud">CRUD</Link></h2></li>
                <li><h2><Link to="search">Search</Link></h2></li>
              </ul>
            </nav>
        </div>
    );
  }
}

export default Nav;