/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useContext } from "react";
import "antd/dist/antd.css";
import { Comment, Avatar, Form, Button, List } from "antd";
// import moment from "moment";
// import avt from "../img/avatar.png";
import styled from "styled-components";
import axios from "axios";
import { TokenContext } from "../context/TokenProvider";
import { useEffect } from "react";

export const CommentList = ({ _id }) => {
  const { token, gUser } = useContext(TokenContext);
  const [comments, setComments] = useState([]);
  const [submitting, setSubmitting] = useState(false);
  const [value, setValue] = useState("");

  const CommentLists = ({ comments }) => (
    <List
      dataSource={comments}
      header={`${comments.length} ${comments.length > 1 ? "replies" : "reply"}`}
      itemLayout="horizontal"
      renderItem={(props) => <Comment {...props} />}
    />
  );

  const handleSubmit = async () => {
    if (!value) {
      return;
    }

    const payload = {
      parentType: "post",
      body: value,
      post_id: _id,
    };

    await axios.post(
      "https://pinterest-backend-server.herokuapp.com/comments",
      payload,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    setSubmitting(true);

    setTimeout(() => {
      setSubmitting(false);
      setValue("");
      // setComments([
      //   ...comments,
      //   {
      //     author: "Subham Abhishek",
      //     avatar: avt,
      //     content: <p>{value}</p>,
      //     datetime: moment().fromNow(),
      //   },
      // ]);
      getData();
    }, 1500);
  };

  const getData = async () => {
    let { data } = await axios.get(
      `https://pinterest-backend-server.herokuapp.com/comments?post_id=${_id}`
    );
    console.log(data);
    data = data?.data?.map((item) => {
      const payload = {
        author: item?.user_id?.name,
        avatar: item?.user_id?.profile_photo_url,
        content: <p>{item.body}</p>,
      };
      return payload;
    });

    setComments(data);
  };

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      {comments.length > 0 && <CommentLists comments={comments} />}
      <Comment
        avatar={<Avatar src={gUser?.profile_photo_url} alt={gUser?.name} />}
        content={
          <Div>
            <Form.Item>
              <input
                type="text"
                placeholder="Add a comment"
                className="textarea"
                rows={1}
                onChange={handleChange}
                value={value}
              />
            </Form.Item>
            <Form.Item>
              <Button
                htmlType="submit"
                loading={submitting}
                onClick={handleSubmit}
                type="primary"
                className="addcomment"
                style={{ display: value.length ? "block" : "none" }}
              >
                Done
              </Button>
            </Form.Item>
          </Div>
        }
      />
    </>
  );
};

const Div = styled.div`
  input {
    width: 100%;
    padding: 10px 15px;
    border: 1px solid rgb(230, 230, 230);
    background-color: #fff;
    border-radius: 20px;
  }
  button {
    border-radius: 20px;
    border: none;
    background-color: #eee;
    position: absolute;
    right: 0;
    top: 0;
    font-weight: 700;
    color: black;
    transition: all 300ms;
    &:hover {
      background-color: #e60023;
      box-shadow: 0 4px 10px grey;
      transition: all 300ms;
    }
  }
`;
