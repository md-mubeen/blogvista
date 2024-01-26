import React, { useEffect } from "react";
import { Container, PostCard } from "../components";
import { useSelector, useDispatch } from "react-redux";
import { fetchPosts } from "../store/postSlice";
import Loading from "../components/Loading";
import { nanoid } from "@reduxjs/toolkit";
import { Link } from "react-router-dom";
import { MdAddCircleOutline } from "react-icons/md";

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
            <div className="p-2 w-full flex items-center justify-center flex-col text-2xl font-semibold">
              {authStatus ? (
                <>
                  <p>
                    Welcome, Buddy! Your blogging adventure starts now. Share
                    your first story by clicking 'Create New Post'!
                  </p>
                  <Link to="/add-post">
                    <button className="my-5 bg-red-600 text-white p-3 rounded-md flex items-center gap-2 transition-all duration-300 hover:p-2">
                      Create New Post
                      <span>
                        <MdAddCircleOutline size={35} />
                      </span>
                    </button>
                  </Link>
                </>
              ) : (
                <>
                  <p>
                    Explore fascinating stories on 'BlogVista'. Log in to enjoy
                    personalized content, or sign up to start your own blogging
                    journey! 🌟💻
                  </p>
                  <div className="flex gap-8 mt-8"><Link to="/login"><button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-xl transition-all duration-300 ">Login</button></Link>
                  <Link to="/signup"><button className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-xl transition-all duration-300 ">Sign Up</button></Link>
               </div></>
              )}
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
