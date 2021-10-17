import React, { useContext, useRef, useState } from "react";
import Modal from "@mui/material/Modal";
import styles from "./Profile.module.css";
import { TokenContext } from "../../context/TokenProvider";
import axios from "axios";
import ArrowCircleUpIcon from "@mui/icons-material/ArrowCircleUp";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "650px",
  height: "400px",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  background: "white",
  display: "flex",
  justifyContent: "space-evenly",
  alignItems: "center",
};

export const CreatePin = ({ open1, setOpen1 }) => {
  const { gUser, token } = useContext(TokenContext);
  const [success, setSuccess] = useState(false);
  const [file, setFile] = useState("");
  const input1Ref = useRef();
  const input2Ref = useRef();
  const handleChange = (e) => {
    setFile(e.target.files[0]);
  };

  async function handleSubmit() {
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "pinterest-clone");
    data.append("cloud_name", "masai101");
    fetch("	https://api.cloudinary.com/v1_1/masai101/image/upload", {
      method: "post",
      body: data,
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data.url, "data url file");
        const payload = {
          user_id: gUser._id,
          photo_url: data.url,
          goodquality_url: data.url,
          description: input1Ref?.current?.textContent,
          tags: [input2Ref?.current?.textContent],
        };

        axios
          .post("https://pinterest-backend-server.herokuapp.com/posts", payload, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          .then((res) => {
            console.log(res.data);
            setSuccess(true);
            setTimeout(() => {
              setSuccess(false);
            }, 700);
            setOpen1(!open1);
          })
          .catch((error) => {
            console.log(error.message);
          });
      })
      .catch((err) => {
        console.log("err:", err);
      });
  }

  return (
    <div>
      <div
        style={{ display: success ? "block" : "none" }}
        className={styles.saving}
      >
        Posted Successfully
      </div>
      <Modal
        open={open1}
        onClose={() => setOpen1(!open1)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div style={style}>
          <div className={styles.fileUpload}>
            <div>
              <input
                type="file"
                accept="image/bmp,image/gif,image/jpeg,image/png,image/tiff,image/webp"
                aria-hidden="true"
                style={{
                  cursor: "pointer",
                  height: "100%",
                  opacity: 0,
                  position: "absolute",
                  width: "100%",
                  left: "0px",
                  top: "0px",
                  fontSize: "0px",
                }}
                onChange={handleChange}
              />

              <div className={styles.caption}>
                <div className={styles.svg}>
                  {" "}
                  {/* <img src="upArraow.svg" alt="" />{" "} */}
                  <ArrowCircleUpIcon />
                </div>
                <div>
                  {" "}
                  <p>Drag and drop or click to upload</p>{" "}
                </div>
              </div>
            </div>
            <div className={styles.caption1}>
              Recommendation:use high-quality .jpg files smaller than 10mb
            </div>
          </div>
          <div>
            <div>
              <p
                className={styles.textArea}
                contentEditable="true"
                ref={input1Ref}
              ></p>
            </div>
            <div className={styles.userDetails}>
              <img
                src={gUser.profile_photo_url}
                alt="https://images.unsplash.com/profile-1553882437332-2aaadee4ff49?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&cs=tinysrgb&fit=crop&h=128&w=128"
                width="50px"
                height="50px"
                style={{ borderRadius: "50%" }}
              />
              <p
                style={{
                  marginLeft: "20px",
                  fontWeight: "600",
                  fontSize: "15px",
                }}
              >
                {gUser.name}
              </p>
            </div>
            <div>
              <p
                className={`${styles.textArea} ${styles.textArea2}`}
                contentEditable="true"
                ref={input2Ref}
              ></p>
            </div>
            <button onClick={handleSubmit} className={styles.submitBtn}>
              Submit
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};
