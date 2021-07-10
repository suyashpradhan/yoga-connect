import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Post } from "./Post";

export const AllPosts = ({ userPosts }) => {
  let postData = useSelector((state) => state.posts.posts);
  postData = userPosts ? userPosts : postData;
  return (
    <>
      {postData.map((post) => (
        <Post post={post} key={post._id} />
      ))}
      {postData.length === 0 && (
        <>
          <p>No posts to view.</p>
          <Link to="/search">Discover Users</Link>
        </>
      )}
    </>
  );
};
