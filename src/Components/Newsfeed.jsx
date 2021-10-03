/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { ImagePlaceholder } from "./ImagePlaceholder";
import classes from "./newsfeed.module.css";
import InfiniteScroll from "react-infinite-scroll-component";
import styled from "styled-components";
import UploadIcon from "@mui/icons-material/Upload";
import { Link } from "react-router-dom";
import { TokenContext } from "../context/TokenProvider";
import { animateScroll as scroll } from "react-scroll";

export const Newsfeed = ({url, url1}) => {
  const [lists, setList] = useState([]);
  const { query, token } = useContext(TokenContext);
  const [pageNumber, setPageNumber] = useState(1);
  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState(false);

  const fetchImages = () => {
    axios.get(
      query
        ? `${url}?limit=25&pageNumber=${pageNumber}`
        : `${url1}?limit=25&pageNumber=${pageNumber}`,{
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
    ).then(({ data: { data } }) => {
      console.log('data', data);
      setPageNumber(pageNumber + 1);
      query
        ? setList(data)
        : setList((prev) => {
            return [...new Set([...prev, ...data])];
          });
      setLoading(false);
    })
    .catch((err) => {
      console.log('err',err);
    })
  };

  const savePost = (_id) => {
    axios.post('http://localhost:8000/savedposts',{post_id: _id},{
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then(() => {
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
      }, 500);
    })
  }

  useEffect(() => {
    setTimeout(() => {
      fetchImages();
    }, 1000);
  }, [query]);

  console.log(lists);
  console.log(pageNumber);

  return (
<<<<<<< HEAD
    <div style={{display: success ? 'block' : 'none'}} className={classes.newsparent}>
      <div className={classes.saving}>Post Saved</div>
=======
    <div className={classes.newsparent}>
      <div style={{display: success ? 'block' : 'none'}} className={classes.saving}>Post Saved</div>
>>>>>>> 5affdc17bf534129554fa40cd6b32929f2cdba35
      <div className={classes.newsfeed}>
        <InfiniteScroll
          dataLength={lists.length}
          next={fetchImages}
          hasMore={lists.length > 5}
        >
          {loading ? (
            <>
              <ImagePlaceholder
                height={Math.floor(Math.random() * 400 + 150)}
              />
              <ImagePlaceholder
                height={Math.floor(Math.random() * 400 + 150)}
              />
              <ImagePlaceholder
                height={Math.floor(Math.random() * 400 + 150)}
              />
              <ImagePlaceholder
                height={Math.floor(Math.random() * 400 + 150)}
              />
              <ImagePlaceholder
                height={Math.floor(Math.random() * 400 + 150)}
              />
              <ImagePlaceholder
                height={Math.floor(Math.random() * 400 + 150)}
              />
              <ImagePlaceholder
                height={Math.floor(Math.random() * 400 + 150)}
              />
              <ImagePlaceholder
                height={Math.floor(Math.random() * 400 + 150)}
              />
              <ImagePlaceholder
                height={Math.floor(Math.random() * 400 + 150)}
              />
              <ImagePlaceholder
                height={Math.floor(Math.random() * 400 + 150)}
              />
            </>
          ) : (
            lists.map((list) => {
              return (
                <PinCard key={list._id}>
                  <Link to={`/pin/${list._id}`}>
                    <div className="pinImg">
                      <LazyLoadImage
                        effect="blur"
                        src={list.goodquality_url}
                        alt={list.description}
                        height={Math.floor(list.height / 10)}
                        width="100%"
                        onClick={() =>scroll.scrollToTop()}
                      />
                    </div>
                  </Link>
                  <div onClick={() => savePost(list._id)}className="savebtn">Save</div>
                  <div className="bottom">
                    <div className="descript">
                      {list.user_id.name.slice(0, 10)}
                    </div>
                    <div className="send">
                      <UploadIcon />
                    </div>
                  </div>
                  <div className="avatar">
                    <img
                      src={`https://joeschmoe.io/api/v1/${list.user_id.username}`}
                      alt="User Avatar"
                    />
                  </div>
                </PinCard>
              );
            })
          )}
        </InfiniteScroll>
      </div>
    </div>
  );
};

const PinCard = styled.div`
  position: relative;
  .pinImg,
  img {
    width: 100%;
    height: 100%;
    /* cursor: pointer; */
    border-radius: 5px;
    margin-bottom: 10px;
    &:hover {
      cursor: zoom-in;
      filter: brightness(50%);
    }
  }
  .avatar {
    img {
      position: absolute;
      width: 30px;
      height: 30px;
      margin-left: 5px;
      cursor: default;
      border-radius: 50%;
      box-shadow: 2px 2px 10px lightgrey;
      z-index: 1000;
      top: 10px;
      left: 10px;
      display: none;
      cursor: pointer;
      filter: brightness(100%);
    }
  }
  &:hover {
    .savebtn,
    .descript,
    .send,
    .avatar img {
      display: block;
    }
  }
  .savebtn {
    position: absolute;
    top: 10px;
    right: 10px;
    color: white;
    background-color: #e60023;
    padding: 10px 15px;
    font-weight: 600;
    border-radius: 25px;
    cursor: pointer;
    display: none;
    &:hover {
      background-color: #970505;
    }
  }
  .descript {
    position: absolute;
    bottom: 20px;
    left: 10px;
    background-color: #ffffffd8;
    font-size: 14px;
    font-weight: 700;
    padding: 4px 10px;
    border-radius: 20px;
    display: none;
  }
  .send {
    position: absolute;
    bottom: 18px;
    right: 10px;
    background-color: #ffffffd8;
    padding: 3px 5px;
    border-radius: 50%;
    display: none;
    cursor: pointer;
    &:hover {
      background-color: #fffffff8;
    }
    svg {
      font-size: 20px;
    }
  }
`;
