import React, { useState } from "react";
import { Container, Logo, LogoutBtn } from "../index";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

function Header() {
  const authStatus = useSelector((state) => state.auth.status);
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    {
      name: "Home",
      slug: "/",
      active: true,
    },
    {
      name: "Login",
      slug: "/login",
      active: !authStatus,
    },
    {
      name: "Signup",
      slug: "/signup",
      active: !authStatus,
    },
    {
      name: "All Posts",
      slug: "/all-posts",
      active: authStatus,
    },
    {
      name: "Add Post",
      slug: "/add-post",
      active: authStatus,
    },
  ];

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  return (
    <header className="py-3 shadow text-white bg-gray-800">
      <Container>
        <nav className="flex items-center justify-between">
          <div className="ml-0 mr-3 mt-0">
            <Link to="/">
              <Logo width="70px" height="20px" />
            </Link>
          </div>
          <div className="lg:hidden ">
            <button
              className="text-white focus:outline-none p-3 "
              onClick={toggleMobileMenu}
            >
              <svg
                className="w-8 h-8"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16m-7 6h7"
                ></path>
              </svg>
            </button>
          </div>
          {mobileMenuOpen && (
            <div className="lg:hidden fixed inset-0 bg-gray-800 bg-opacity-75 z-50">
              <div className="text-white text-center mt-20">
                <button
                  className="text-white text-xl focus:outline-none absolute top-8 right-1/2"
                  onClick={closeMobileMenu}
                >
                  {/* Close button icon */}
                  ✕
                </button>
                <ul>
                  {navItems.map(
                    (item) =>
                      item.active && (
                        <li
                          key={item.name}
                          className={`py-2 text-xl ${
                            location.pathname === item.slug
                              ? "bg-white text-black"
                              : "hover:bg-gray-600"
                          }`}
                        >
                          <Link
                            to={item.slug}
                            onClick={() => setMobileMenuOpen(false)}
                          >
                            {item.name}
                          </Link>
                        </li>
                      )
                  )}
                  {authStatus && (
                    <li
                      className="py-2"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <LogoutBtn />
                    </li>
                  )}
                </ul>
              </div>
            </div>
          )}
          <ul
            className={`hidden lg:flex ml-auto justify-center items-center
            }`}
          >
            {navItems.map(
              (item) =>
                item.active && (
                  <li key={item.name}>
                    <Link
                      to={item.slug}
                      className={`inline-block px-4 py-2 mx-1 text-sm duration-200 rounded-full lg:text-lg ${
                        location.pathname === item.slug
                          ? "bg-white  text-lg rounded-full text-black"
                          : "text-white hover:bg-gray-600"
                      }`}
                    >
                      {item.name}
                    </Link>
                  </li>
                )
            )}
            {authStatus && (
              <li className="py-2" onClick={() => setMobileMenuOpen(false)}>
                <LogoutBtn />
              </li>
            )}
          </ul>
        </nav>
      </Container>
    </header>
  );
}

export default Header;
