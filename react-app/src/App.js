import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux'
import { Route, Switch } from "react-router-dom";
import { useHistory, Redirect } from "react-router-dom/cjs/react-router-dom.min";
import LoginFormModal from "./components/C2EAccess/Login";
import SignUpModal from "./components/C2EAccess/SignUp";
import MyCloset from "./components/Closet/Closet";
import CategoryDisplayModal from "./components/Items/CategoryDisplay";
import NavBar from "./components/NavBar/NavBar";
import { authenticate, restoreUser } from "./store/user";
import theDoor from './images/theGreenestDoor.jpg';



function App() {
  const dispatch = useDispatch();
  const history = useHistory();
  const authorized = useSelector(state => state.user.authenticated);
  const closetOwner = useSelector(state => state.user.closetOwner);

  useEffect(() => {
    authenticate()
  }, []);

  useEffect(() => {
    (async () => {
      let res = await dispatch(restoreUser())
      if (res) {
        history.push(`/closet/${res}`)
      }
    })();
  }, [dispatch]);


  return (
    <>
      {(authorized) ? (
        <>
          <NavBar />
          <Switch>
            <Route path="/">
              <MyCloset />
            </Route>
            {/* <Route path="/closet/:closetId/category/:categoryId">
              <CategoryDisplayModal />
            </Route> */}
          </Switch>
        </>
      ) : (
          <>
            <div className="no-navbar"></div>
            <div className="closet-main">
              <div>
                <img alt="Closet Door" src={theDoor} className="closet-door-left3" />
              </div>
              <div>
                <img alt="Closet Door" src={theDoor} className="closet-door-left2" />
              </div>
              <div>
                <img alt="Closet Door" src={theDoor} className="closet-door-left1" />
              </div>
              <div>
                <img alt="Closet Door" src={theDoor} className="closet-door-right3" />
              </div>
              <div>
                <img alt="Closet Door" src={theDoor} className="closet-door-right2" />
              </div>
              <div>
                <img alt="Closet Door" src={theDoor} className="closet-door-right1" />
              </div>
            </div>
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
