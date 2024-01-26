import React from "react";
import appwriteService from "../appwrite/config";
import { useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { deletePost } from "../store/postSlice";
import { FiEdit, FiTrash } from "react-icons/fi";

function PostCard({ $id, title, featuredImage }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const delPost = (e) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(deletePost($id));
  };

  return (
    <Link to={`/post/${$id}`}>
      <div className="flex bg-gray-100 rounded-xl p-4 mb-2 items-center h-30 sm:h-40">
        
        {featuredImage && (
          <img
            src={appwriteService.getFilePreview(featuredImage)}
            alt={title}
            className="rounded-full mr-4"
            loading="lazy"
            style={{height:'100px', width:'100px' }}
          />
        )}
        
        <div className="flex-grow">
          <h2 className="text-xl font-bold mb-2">{title}</h2>
        </div>
        <div className="flex items-center space-x-2">
          {/* Edit Icon */}
          <div
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              navigate(`/edit-post/${$id}`);
            }}
          >
            <FiEdit className="cursor-pointer w-6 h-6" />
          </div>
          {/* Delete Icon */}
          <FiTrash className="cursor-pointer w-6 h-6" onClick={delPost} />
        </div>
      </div>
    </Link>
  );
}

export default PostCard;
