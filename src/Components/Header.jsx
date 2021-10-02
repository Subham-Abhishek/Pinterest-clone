import React, { useContext } from "react";
import classes from "./header.module.css";
import SearchIcon from "@mui/icons-material/Search";
import NotificationsIcon from "@mui/icons-material/Notifications";
import SmsIcon from "@mui/icons-material/Sms";
import Avatar from "@mui/material/Avatar";
import avt from "../img/avatar.png";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { TokenContext } from "../context/TokenProvider";
import { Link } from "react-router-dom";

export const Header = () => {
  const {query, setQuery} = useContext(TokenContext)
    console.log('header');
  return (
    <div className={classes.header}>
      <div className={classes.logo}>
        <img
          src="https://www.freepnglogos.com/uploads/pinterest-logo-png-transparent-background-2.png"
          alt="Logo"
        />
      </div>
      <Link to='/'><div className={classes.home}>Home</div></Link>
      <div className={classes.today}>Today</div>
      <div className={classes.searchbox}>
        <SearchIcon />
        <input value={query} onChange={(e) => setQuery(e.target.value)} type="text" name="search" placeholder="Search" />
      </div>
      <div className={classes.bell}>
        <NotificationsIcon />
      </div>
      <div className={classes.inbox}>
        <SmsIcon />
        <div className={classes.redNum}>9+</div>
      </div>
      <div className={classes.avatar}>
        <Avatar alt="saj" src={avt} sx={{ width: 30, height: 30 }} />
      </div>
      <div className={classes.downtown}>
        <KeyboardArrowDownIcon />
      </div>
    </div>
  );
};
