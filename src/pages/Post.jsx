import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Container } from "../components";
import appwriteService from "../appwrite/config";
import parse from "html-react-parser";
import { fetchPost } from "../store/postSlice";
import Loading from "../components/Loading";

export default function Post() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const post = useSelector((state) => state.posts.fetchedPost);
  const status = useSelector((state) => state.posts.status);

  useEffect(() => {
    if (slug) {
      dispatch(fetchPost(slug));
    } else {
      navigate("/");
    }
    return () => dispatch(fetchPost(null));
  }, [slug, navigate, dispatch]);

  if (status === "loading") {
    return <Loading />;
  }

  return post ? (
    <div className="py-8 px-4 text-black">
      <Container>
        <div className="mx-auto p-2 lg:w-2/3  lg:mx-auto">
          <div className="w-full mb-6">
            <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
            <p className="text-gray-800 text-sm">
              Published on {post.$createdAt}
            </p>
          </div>
          {post.featuredImage && (
            <img
              src={appwriteService.getFilePreview(post.featuredImage)}
              alt={post.title}
              className="rounded-xl mb-6 w-full h-[250px] object-fit lg:w-2/3 lg:h-[427px] lg:cover"
              loading="lazy"
            />
          )}
          <div className="text-lg max-w-full mx-auto break-words">
            {parse(post.content)}
          </div>
        </div>
      </Container>
    </div>
  ) : null;
}
