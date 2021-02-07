import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux'
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
// import LoginFormModal from "./components/auth/Login";
// import SignUpModal from "./components/auth/SignUp";
import LoginFormModal from "./components/C2EAccess/Login";
import SignUpModal from "./components/C2EAccess/SignUp";
import MyCloset from "./components/Closet/Closet";
import NavBar from "./components/NavBar/NavBar";
import { authenticate, restoreUser } from "./store/user";
// import { state } from "./store/index";
// import ProtectedRoute from "./components/auth/ProtectedRoute";
// import UsersList from "./components/UsersList";
// import User from "./components/User";

function App() {
  const dispatch = useDispatch()
  const authorized = useSelector(state => state.user.authenticated);
  const closetOwner = useSelector(state => state.user.closetOwner)

  useEffect(() => {
    authenticate()
  }, []);

  useEffect(() => {
    (async () => {
      await dispatch(restoreUser())
    })();
  }, [dispatch]);


  return (
    <>
      {(authorized) ? (
        <>
          <NavBar />
          <Switch>
            <Route path="/closet/:id">
              <MyCloset />
            </Route>
          </Switch>
        </>
      ) : (
          <>
            <div className="no-navbar"></div>
            <Switch>
              <Route path="/" exact={true}>
                <LoginFormModal />
              </Route>
              <Route path="/sign-up" exact={true}>
                <SignUpModal />
              </Route>
            </Switch>
          </>
        )}
    </>

  )
}

export default App;
