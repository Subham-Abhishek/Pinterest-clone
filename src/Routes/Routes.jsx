import React, { useContext } from "react";
import { Switch, Route } from "react-router-dom";
import { FeedsPage } from "../Pages/FeedsPage";
import { PinDetails } from "../Pages/PinDetails";
import { Landing } from "../Components/landingPage/grid";
import { About } from "../Components/landingPage/About/About";
import { TokenContext } from "../context/TokenProvider";
import { ProfilePage } from "../Pages/ProfilePage";
import { EditProfile } from "../Components/EditProfile";

export const Routes = () => {
  const { gUser } = useContext(TokenContext);
  return (
    <Switch>
      <Route exact path="/">
        {gUser ? <FeedsPage /> : <Landing />}
      </Route>
      <Route path="/edit_profile">
        <EditProfile />
      </Route>
      <Route path="/pin/:id">
        <PinDetails />
      </Route>
      <Route path="/about">
        <About />
      </Route>
      <Route path="/user">
        <ProfilePage />
      </Route>
    </Switch>
  );
};
