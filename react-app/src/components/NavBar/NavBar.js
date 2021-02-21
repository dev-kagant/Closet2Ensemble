import React, { useState, useEffect } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from "../../store/user"
import './NavBar.css'

const NavBar = () => {
  const history = useHistory();
  const dispatch = useDispatch()
  const currentClosetOwner = useSelector(state => state.user.closetOwner);

  const onLogout = async () => {
    return await dispatch(logout())
      .then(() => history.push('/'));
  };

  return (
    <nav className="navbar-fall">
      <ul className="navbar">
        <li>
          <NavLink to={`/`} exact={true} className="navbar-halo" activeClassName="active">
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to="/search" exact={true} className="navbar-halo" activeClassName="active">
            Search
          </NavLink>
        </li>
        <li>
          <NavLink to={`/closet/:id/planner`} className="navbar-halo" exact={true} activeClassName="active">
            Planner
          </NavLink>
        </li>
        <li>
          {/* <NavLink to={`/closet/friend/${friendsCloset.id}`} exact={true} activeClassName="active"> */}
          <NavLink to="/closet/friend/" exact={true} className="navbar-halo" activeClassName="active">
            Friends
          </NavLink>
        </li>
        <li>
          <NavLink to={`/closet/:id/planner`} exact={true} className="navbar-halo" activeClassName="active">
            Closet Stats
          </NavLink>
        </li>
        <li>
          <div className="logout-div navbar-halo" onClick={onLogout}>Logout</div>
        </li>
      </ul>
    </nav>
  );
}

export default NavBar;
