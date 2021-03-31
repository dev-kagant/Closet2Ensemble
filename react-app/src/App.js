import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux'
import { Route, Switch } from "react-router-dom";
import { useHistory, Redirect } from "react-router-dom/cjs/react-router-dom.min";
import LoginFormModal from "./components/C2EAccess/Login";
import SignUpModal from "./components/C2EAccess/SignUp";
import MyCloset from "./components/Closet/Closet";
import NavBar from "./components/NavBar/NavBar";
import { authenticate, restoreUser } from "./store/user";
import theDoor from './images/theGreenestDoor.jpg';
// import theCloset from './images/okthistime.jpg';
import Footer from "./components/Footer/Footer";
import OutfitPlanner from "./components/OutfitPlanner/outfitPlanner"



function App() {
  const dispatch = useDispatch();
  const history = useHistory();
  const closetOwner = useSelector(state => state.user.closetOwner);
  const authorized = useSelector(state => state.user.authenticated);

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
  }, []);


  return (
    <>
      {(authorized) ? (
        <>
          <NavBar />
          <Switch>
            <Route path={`/closet/:id/planner`} exact>
              <OutfitPlanner />
            </Route>
            <Route path="/">
              <MyCloset />
            </Route>
            {/* <Route path="/search">
              <Search />
            </Route> */}
          </Switch>
          <Footer />
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
