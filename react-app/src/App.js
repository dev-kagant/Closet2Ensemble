import React, { useState, useEffect, useSelector } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
// import LoginFormModal from "./components/auth/Login";
// import SignUpModal from "./components/auth/SignUp";
import LoginFormModal from "./components/C2EAccess/Login";
import SignUpModal from "./components/C2EAccess/SignUp";
// import NavBar from "./components/NavBar";
// import ProtectedRoute from "./components/auth/ProtectedRoute";
// import UsersList from "./components/UsersList";
// import User from "./components/User";

function App() {
  // const authenticated = useSelector((state) => state.user.authenticated)
  // const [loaded, setLoaded] = useState(false);

  // useEffect(() => {
  //   (async () => {
  //     const user = await authenticate();
  //     if (!user.errors) {
  //       setAuthenticated(true);
  //     }
  //     setLoaded(true);
  //   })();
  // }, []);

  // if (!loaded) {
  //   return null;
  // }

  return (
    <BrowserRouter>
      {/* <NavBar setAuthenticated={setAuthenticated} /> */}
      <Switch>
        <Route path="/" exact={true}>
          <LoginFormModal />
        </Route>
        <Route path="/sign-up" exact={true}>
          <SignUpModal />
        </Route>
        {/* <ProtectedRoute path="/users" exact={true} authenticated={authenticated}>
          <UsersList />
        </ProtectedRoute>
        <ProtectedRoute path="/users/:userId" exact={true} authenticated={authenticated}>
          <User />
        </ProtectedRoute>
        <ProtectedRoute path="/" exact={true} authenticated={authenticated}>
          <h1>My Home Page</h1>
        </ProtectedRoute> */}
      </Switch>
    </BrowserRouter>
  );
}

export default App;
