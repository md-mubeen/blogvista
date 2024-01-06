import React from "react";
import { useDispatch } from "react-redux";
import authService from "../../appwrite/auth";
import { logout } from "../../store/authSlice";
import { useNavigate } from "react-router-dom";

function LogoutBtn() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const logoutHandler = () => {
    authService.logout().then(() => {
      dispatch(logout());
      navigate("/login");
    });
  };
  return (
    <button
      className="inline-block px-4 py-2 duration-200 bg-red-500 text-sm text-white hover:bg-red-600 rounded-full lg:text-lg"
      onClick={logoutHandler}
    >
      Logout
    </button>
  );
}

export default LogoutBtn;
