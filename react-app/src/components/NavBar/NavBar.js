import React, { useState } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from "../../store/user"
import './NavBar.css'

const NavBar = () => {
  const history = useHistory();
  const dispatch = useDispatch()
  const currentUserCloset = useSelector(state => state.user.closetOwner);

  const onLogout = async () => {
    return await dispatch(logout())
      .then(() => history.push('/'));
  };


  return (
    <nav className="">
      <ul className="navbar">
        <li>
          <NavLink to={`/closet/:id`} exact={true} activeClassName="active">
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to="/search" exact={true} activeClassName="active">
            Search
          </NavLink>
        </li>
        <li>
          <NavLink to={`/closet/:id/planner`} exact={true} activeClassName="active">
            Planner
          </NavLink>
        </li>
        <li>
          {/* <NavLink to={`/closet/friend/${friendsCloset.id}`} exact={true} activeClassName="active"> */}
          <NavLink to="/closet/friend/" exact={true} activeClassName="active">
            Friends
          </NavLink>
        </li>
        <li>
          <NavLink to={`/closet/:id/planner`} exact={true} activeClassName="active">
            Closet Stats
          </NavLink>
        </li>
        <li>
          <button type="button" onClick={onLogout}>Logout</button>
        </li>
      </ul>
    </nav>
  );
}

export default NavBar;
