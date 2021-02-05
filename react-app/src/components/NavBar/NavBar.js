import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux'
import LogoutButton from '../auth/LogoutButton';

const NavBar = () => {
  const currentUserCloset = useSelector(state => state.user.closetOwner);

  return (
    <nav>
      <ul>
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
          <LogoutButton />
        </li>
      </ul>
    </nav>
  );
}

export default NavBar;
