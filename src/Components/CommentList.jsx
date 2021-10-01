import React, { useState } from "react";
import "antd/dist/antd.css";
import { Comment, Avatar, Form, Button, List } from "antd";
import moment from "moment";
import avt from "../img/avatar.png";
import styled from "styled-components";

export const CommentList = () => {
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

  const handleSubmit = () => {
    if (!value) {
      return;
    }

    setSubmitting(true);

    setTimeout(() => {
      setSubmitting(false);
      setValue("");
      setComments([
        ...comments,
        {
          author: "Subham Abhishek",
          avatar: avt,
          content: <p>{value}</p>,
          datetime: moment().fromNow(),
        },
      ]);
    }, 1000);
  };

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  return (
    <>
      {comments.length > 0 && <CommentLists comments={comments} />}
      <Comment
        avatar={<Avatar src={avt} alt="Subham Abhishek" />}
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
  }
`;
