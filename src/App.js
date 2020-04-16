import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import Auth0 from "./Auth0";
import Home from "./views/Home";
import OrgTopLevel from "./views/Organization";

export default function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [authObject, setAuthObject] = useState({});

  useEffect(() => {
    handleLogIn();
  }, []);

  function handleLogOut() {
    setLoggedIn(false);
  }

  function handleLogIn() {
    // Auth0 returns the token in the params of the URL after successful login and redirect
    const totalHash = window.location.hash;
    if (totalHash) {
      // remove leading # and split into components,
      // so now you have ['key1=value1', 'key2=value2']
      const hashArray = totalHash.substr(1).split("&");
      let authObject = {};
      hashArray.forEach(item => {
        const keyValArray = item.split("=");
        // turns [key, value] into authObject={key: value}
        authObject[keyValArray[0]] = keyValArray[1];
      });
      // the auth object has many items in it, we generally care about the access_token
      setAuthObject(authObject);
      // this is where you would also handle authorization errors from the API
      !!authObject.access_token ? setLoggedIn(true) : setLoggedIn(false);
    }
  }

  return (
    <Router>
      <div>
        {/* "Nav-bar" */}
        
        {/* NOTE! 
        This works like a normal switch, so you have to put the specific routes the highest,
        and work your way down to least-specific */}
        <Switch>
          <PrivateRoute path="/org" pathRedirect="/" isLoggedIn={loggedIn}>
            <OrgTopLevel authObject={authObject} />
          </PrivateRoute>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </div>
      {loggedIn ? (
          <button 
            onClick={() => handleLogOut()}
            className="m-1 bg-red-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="button"
          >
            Log Out
          </button>
        ) : (
          <button
            onClick={() => {
              Auth0.login();
            }}
            className="m-1 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">Sign In</button>
        )}
    </Router>
  );
}
