// import React, { useState, useEffect } from 'react';
// import { NavLink, useHistory } from 'react-router-dom';
// import { useSelector, useDispatch } from 'react-redux';
// import './NewItem.css'

// const ItemsNav = () => {
//     const history = useHistory();
//     const dispatch = useDispatch()
//     const currentClosetOwner = useSelector(state => state.user.closetOwner);

//     useEffect(() => {
//         if (!currentClosetOwner) {
//             return
//         }
//     })

//     return (
//         <nav className="item-navbar">
//             <ul className="item-navbar-list">
//                 <li>
//                     <NavLink to={`/`} exact={true} className="itemsNav-style" activeClassName="active">
//                         Add A New Item
//                     </NavLink>
//                 </li>
//                 <li>
//                     <NavLink to="/search" exact={true} className="itemsNav-style" activeClassName="active">
//                         Add Some Staples
//                     </NavLink>
//                 </li>
//             </ul>
//         </nav>
//     );
// }

// export default ItemsNav;
