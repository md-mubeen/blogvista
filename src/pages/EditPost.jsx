import React, { useEffect } from "react";
import { Container, PostForm } from "../components";
import { useSelector, useDispatch } from "react-redux";
import { fetchPost } from "../store/postSlice";
import { useNavigate, useParams } from "react-router-dom";

function EditPost() {
  const dispatch = useDispatch();
  const { slug } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (slug) {
      dispatch(fetchPost(slug));
    } else {
      navigate("/");
    }
  }, [slug, navigate, dispatch]);

  const post = useSelector((state) => state.posts.fetchedPost);

  return post ? (
    <div className="py-8">
      <Container>
        <PostForm post={post} />
      </Container>
    </div>
  ) : null;
}

export default EditPost;
