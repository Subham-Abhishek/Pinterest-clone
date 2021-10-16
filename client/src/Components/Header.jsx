import React, { useContext, useState } from "react";
import classes from "./header.module.css";
import SearchIcon from "@mui/icons-material/Search";
import NotificationsIcon from "@mui/icons-material/Notifications";
import SmsIcon from "@mui/icons-material/Sms";
import Avatar from "@mui/material/Avatar";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { TokenContext } from "../context/TokenProvider";
import { Link } from "react-router-dom";

export const Header = () => {
  const [show, setShow] = useState(false)
  const {query, setQuery, gUser, setGUser} = useContext(TokenContext)
    console.log('header', gUser);

    const set_removeGUser = () => {
      localStorage.removeItem('token')
      localStorage.removeItem('gUser')
      setGUser();
    }

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
        <input value={query} onChange={(e) => setQuery(e.target.value)} type="search" name="search" placeholder="Search" />
      </div>
      <div className={classes.bell}>
        <NotificationsIcon />
      </div>
      <div className={classes.inbox}>
        <SmsIcon />
        <div className={classes.redNum}>9+</div>
      </div>
      <div className={classes.avatar}>
        <Link to="/user">
        <Avatar alt="saj" src={gUser.profile_photo_url} sx={{ width: 30, height: 30 }} />
        </Link>
      </div>
      <div className={classes.downtown}>
        <div onClick={() => setShow(!show)}>
        <KeyboardArrowDownIcon />
        </div>
        <div style={{display: show ? 'block' : 'none'}} className={classes.gUser}>
          <p>Currently in</p>
          <div className={classes.gUserdetails}>
            <img src={gUser.profile_photo_url} alt="avatar" />
            <div className={classes.ph3}>
              <h3>{gUser.name}</h3>
              <p>{gUser.email}</p>
            </div>
          </div>
          <div className={classes.logout}>
            <h2 className={classes.detailsbtn}><Link to="/edit_profile">Settings</Link></h2>
            <h2 className={classes.detailsbtn} onClick={() => set_removeGUser()}><Link to="/">Log out</Link></h2>
          </div>
        </div>
      </div>
    </div>
  );
};
