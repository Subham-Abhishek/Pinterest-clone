import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { ImagePlaceholder } from "./ImagePlaceholder";
import CropFreeIcon from "@mui/icons-material/CropFree";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import { CommentList } from "./CommentList";

export const PhotoDetail = () => {
  const { id } = useParams();
  const [pin, setPin] = useState({});
  const [loading, setLoading] = useState(true);
  console.log("pin", pin);

  const fetchPin = useCallback(() => {
    axios
      .get(
        `https://api.unsplash.com/photos/${id}?client_id=KnIdKmvxNCmKWEiC6BUzyQtUnIryKv1Cv53bbTc9ahU`
      )
      .then(({ data }) => {
        console.log("sadas", data);
        setPin({ ...data });
        setLoading(false);
      })
      .catch((err) => {
        console.log("You are lost");
      });
  }, [id]);

  useEffect(() => {
    fetchPin();
  }, [fetchPin]);

  return (
    <Pin>
      <div className="pin">
        {loading ? (
          <ImagePlaceholder height={Math.floor(Math.random() * 400 + 150)} />
        ) : (
          <>
            <div className="pinPhoto">
              <img src={pin.urls.regular} alt={pin.alt_description} />
              <CropFreeIcon />
            </div>
            <div className="pinDetails">
              <div className="top">
                <div className="send">
                  <a rel="noreferrer" href={pin.links.download} target="_blank">
                    <MoreHorizIcon />
                  </a>
                  <div>
                    <FileUploadIcon />
                  </div>
                </div>
                <div className="sendbtn">Save</div>
              </div>
              <div className="sociallink">
                <a
                  href={pin.user.social.portfolio_url}
                  target="_blank"
                  rel="noreferrer"
                >
                  {pin.user.social.portfolio_url
                    ? pin.user.social.portfolio_url.slice(8)
                    : pin.links.html}
                </a>
              </div>
              <div className="pinHead">
                <h1>{`${pin.alt_description.slice(0, 50)}`}</h1>
                <p>{`#${
                  pin.user.bio
                    ? pin.user.bio
                    : "Pinterest is an American image sharing and social media service designed to enable saving and discovery of information on the internet using images"
                }`}</p>
              </div>
              <div className="user">
                <div className="userDetails">
                  <img
                    src={`https://joeschmoe.io/api/v1/${pin.user.username}`}
                    alt="User Avatar"
                  />
                  <div className="name_followers">
                    <h4>{pin.user.name}</h4>
                    <p>{`${pin.user.total_likes} followers`}</p>
                  </div>
                </div>
                <button className="followbtn">Follow</button>
              </div>
              <div className="comments">
                <CommentList />
              </div>
            </div>
          </>
        )}
      </div>
    </Pin>
  );
};

const Pin = styled.div`
  .pin {
    width: 65vw;
    height: 100vh;
    overflow-y: scroll;
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
      }
    }
    .pinDetails {
      padding: 5px 15px;
      .top {
        /* position: relative; */
        display: flex;
        align-items: center;
        justify-content: space-between;
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
          padding: 12px 16px;
          border-radius: 20px;
          cursor: pointer;
          transition: 300ms;
          &:hover {
            background-color: #ddd;
            box-shadow: 0 4px 10px lightgrey;
            transition: all 300ms;
          }
        }
      }
    }
  }
`;
