import axios from "axios";
import React, { useCallback, useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { ImagePlaceholder } from "./ImagePlaceholder";
import CropFreeIcon from "@mui/icons-material/CropFree";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import { CommentList } from "./CommentList";
import { Collapse } from "antd";
import { Newsfeed } from "./Newsfeed";
import { TokenContext } from "../context/TokenProvider";

const { Panel } = Collapse;

export const PhotoDetail = () => {
  const { token, gUser } = useContext(TokenContext);
  const { id } = useParams();
  const [pin, setPin] = useState({});
  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState(false);

  const fetchPin = useCallback(() => {
    axios
      .get(`http://localhost:8000/posts/${id}`)
      .then(({ data: { data } }) => {
        setPin({ ...data });
        setLoading(false);
      })
      .catch((err) => {
        console.log("You are lost");
      });
  }, [id]);

  const followUser = (_id) => {
    console.log("followUser");
    const payload = {
      user_id: gUser._id,
      followed_user_id: _id,
    };
    axios
      .post("http://localhost:8000/follows", payload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        fetchPin();
        console.log("res", res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const savePost = (_id) => {
    axios
      .post(
        "http://localhost:8000/savedposts",
        { post_id: _id },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then(() => {
        setSuccess(true);
        setTimeout(() => {
          setSuccess(false);
        }, 1000);
      });
  };

  useEffect(() => {
    fetchPin();
  }, [fetchPin]);

  return (
    <Pin>
      <div style={{ display: success ? "block" : "none" }} className="saving">
        Post Saved
      </div>
      <div className="pin">
        {loading ? (
          <ImagePlaceholder height={Math.floor(Math.random() * 400 + 150)} />
        ) : (
          <>
            <div className="pinPhoto">
              <img src={pin.goodquality_url} alt={pin.description} />
              <CropFreeIcon />
            </div>
            <div className="pinDetails">
              <div className="top">
                <div className="send">
                  <a
                    rel="noreferrer"
                    href={pin.goodquality_url}
                    target="_blank"
                  >
                    <MoreHorizIcon />
                  </a>
                  <div>
                    <FileUploadIcon />
                  </div>
                </div>
                <div className="sendbtn" onClick={() => savePost(pin._id)}>
                  Save
                </div>
              </div>
              <div className="sociallink">
                <a href={pin.website} target="_blank" rel="noreferrer">
                  {pin.website ? pin.website.slice(8) : pin.goodquality_url}
                </a>
              </div>
              <div className="pinHead">
                <h1>{`${pin.description.slice(0, 50)}`}</h1>
                <p>{`#${
                  pin.user_id.bio
                    ? pin.user_id.bio
                    : "Pinterest is an American image sharing and social media service designed to enable saving and discovery of information on the internet using images"
                }`}</p>
              </div>
              <div className="user">
                <div className="userDetails">
                  <img
                    src={`https://joeschmoe.io/api/v1/${pin.user_id.username}`}
                    alt="User Avatar"
                  />
                  <div className="name_followers">
                    <h4>{pin.user_id.name}</h4>
                    <p>{`${pin.user_id?.followers?.length} followers`}</p>
                  </div>
                </div>
                <button
                  onClick={() => followUser(pin.user_id._id)}
                  className="followbtn"
                >
                  {pin.user_id?.followers?.length ? "Followed" : "Follow"}
                </button>
              </div>
              <Collapse
                className="collapse"
                bordered={false}
                defaultActiveKey={["1"]}
                expandIconPosition="right"
              >
                <Panel className="panel" header="Comments" key="1">
                  <div className="comments">
                    <p>Share feedback, ask a question or give a high five</p>
                    <CommentList />
                  </div>
                </Panel>
              </Collapse>
            </div>
          </>
        )}
      </div>
      <h1 style={{ textAlign: "center" }}>More Like This</h1>
      {loading ? (
        ""
      ) : (
        <Newsfeed
          url={`http://localhost:8000/posts/tags/${pin.tags[0]}`}
          url1={`http://localhost:8000/posts/tags/${pin.tags[1]}`}
        />
      )}
    </Pin>
  );
};

const Pin = styled.div`
  height: 500vh;
  .saving {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: rgba(63, 63, 63, 0.816);
    color: #fff;
    z-index: 999999;
    font-size: 30px;
    padding: 50px 150px;
    font-weight: 600;
    border-radius: 80px;
  }
  .pin {
    width: 65vw;
    height: auto;
    min-height: 100vh;
    /* overflow-y: scroll; */
    margin: 20px auto;
    box-shadow: 4px 4px 10px rgba(232, 232, 232, 0.6),
      -4px -4px 10px rgba(232, 232, 232, 0.6);
    border-radius: 30px;
    padding: 20px;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-gap: 15px;
    .pinPhoto {
      position: relative;
      img {
        width: 100%;
        min-height: 400px;
        max-height: 100vh;
        border-radius: 20px;
        &:hover {
          filter: brightness(50%);
          cursor: pointer;
        }
      }
      svg {
        position: absolute;
        background-color: #fff;
        left: 10px;
        top: 10px;
        font-size: 16px;
        padding: 4px;
        border-radius: 50%;
        cursor: pointer;
        font-size: 23px;
      }
    }
    .pinDetails {
      padding: 5px 15px;
      .top {
        /* position: relative; */
        display: flex;
        align-items: center;
        justify-content: space-between;
        position: sticky;
        top: 75px;
        background-color: #fff;
        z-index: 5;
        .send {
          display: flex;
          svg {
            margin-left: 5px;
            font-size: 45px;
            color: #333;
            cursor: pointer;
            padding: 10px;
            border-radius: 50%;
            transition: 500ms;
            &:hover {
              background-color: #e6e6e6e4;
              transition: 500ms;
            }
          }
        }
        .sendbtn {
          color: white;
          background-color: #e60023;
          padding: 10px 15px;
          font-weight: 600;
          border-radius: 25px;
          cursor: pointer;
          &:hover {
            background-color: #970505;
          }
        }
      }
      .sociallink {
        margin-top: 10px;
        margin-left: 10px;
        a {
          color: #333;
          text-decoration: none;
          font-weight: 600;
        }
      }
      .pinHead {
        h1 {
          text-transform: capitalize;
        }
        p {
          text-transform: lowercase;
          font-size: 15px;
        }
      }
      .user {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 20px;
        .userDetails {
          display: flex;
          align-items: center;
          h4,
          p {
            margin: 0;
            font-size: 13px;
          }
          h4 {
            cursor: pointer;
            font-weight: 700;
            &:hover {
              text-decoration: underline;
            }
          }
          img {
            width: 30px;
            margin-right: 17px;
            border: 2px solid #333;
            border-radius: 50%;
            cursor: pointer;
          }
        }
        button {
          border: none;
          font-weight: 700;
          font-size: 15px;
          padding: 11px 19px;
          border-radius: 25px;
          cursor: pointer;
          transition: 300ms;
          &:hover {
            background-color: #ddd;
            box-shadow: 0 4px 10px lightgrey;
            transition: all 300ms;
          }
        }
      }
      .collapse,
      .panel {
        font-size: 20px;
        font-weight: 600;
        padding: 0px;
        background-color: transparent;
        p {
          font-size: 12px;
          font-weight: 400;
        }
      }
    }
  }
`;
