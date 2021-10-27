import styles from "./Profile.module.css";
import React, { useContext, useEffect, useState } from "react";
import { TokenContext } from "../../context/TokenProvider";
import axios from "axios";
import { CreatePin } from "./CreatePin";
import { Newsfeed } from "../Newsfeed";

export const UserProfile = () => {
  const { gUser } = useContext(TokenContext);
  const [open1, setOpen1] = useState(false);
  const [user, setUser] = useState({});

  async function getData() {
    try {
      let { data } = await axios.get(
        `https://pinterest-backend-server.herokuapp.com/users/${gUser._id}`
      );
      setUser(data.data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <div className={styles.imageDiv}>
        <img src={user.profile_photo_url} alt="" />
      </div>
      <div>
        <h2 className={styles.name}>{user.name}</h2>
      </div>
      <div className={styles.parentmail}>
        <p className={styles.biomail}>
          <p>{user.bio}</p>
          <p>{user.email} .</p>
        </p>
      </div>
      <div style={{ fontWeight: user?.userFollowedPeople?.length && "bold", textAlign: "center" }}>
        {user?.userFollowedPeople?.length} following
      </div>
      <hr />
      <div className={styles.icons}>
        <div className={styles.idea}>
          <h2>Unorganised Ideas</h2>
        </div>

        <div>
          <img src="adjust.svg" alt="" />
          <button
            style={{ border: "none", background: "none" }}
            onClick={() => setOpen1(!open1)}
          >
            <img src="plus.svg" alt="" />{" "}
          </button>
        </div>
      </div>
      <Newsfeed url="https://pinterest-backend-server.herokuapp.com/savedposts" url1="https://pinterest-backend-server.herokuapp.com/savedposts" />
      <CreatePin open1={open1} setOpen1={setOpen1} />
      <div className={styles.mainDiv}></div>
    </div>
  );
};
