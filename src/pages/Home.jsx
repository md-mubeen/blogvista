import React, { useEffect } from "react";
import { Container, PostCard } from "../components";
import { useSelector, useDispatch } from "react-redux";
import { fetchPosts } from "../store/postSlice";
import Loading from "../components/Loading";
import { nanoid } from "@reduxjs/toolkit";

function Home() {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts.posts);
  const authStatus = useSelector((state) => state.auth.status);
  const status = useSelector((state) => state.posts.status);
  const deleteStatus = useSelector((state) => state.posts.deleteStatus);

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch, deleteStatus]);

  if (status === "loading" || deleteStatus === "loading") {
    return <Loading />;
  }

  if (posts.length === 0) {
    return (
      <div className="w-full py-8 mt-4 text-center">
        <Container>
          <div className="flex flex-wrap">
            <div className="p-2 w-full flex items-center justify-center">
              <h1 className="text-4xl font-bold hover:text-gray-500 font-mono">
                {authStatus ? "No Blogs yet" : "Login to read posts"}
              </h1>
            </div>
          </div>
        </Container>
      </div>
    );
  }

  return (
    <div className="w-full py-8">
      <Container>
        <div className="flex flex-col">
          {posts.map((post) => (
            <div key={nanoid()} className="mb-4">
              <PostCard {...post} />
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
}

export default Home;
