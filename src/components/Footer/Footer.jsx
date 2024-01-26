import React from "react";
import { Link } from "react-router-dom";
import Logo from "../Logo";

function Footer() {
  return (
    <section className="px-4 py-6 w-full bg-gray-800 border-t border-gray-800">
      <div className="container mx-auto flex flex-col items-center justify-center">
        <Link to="/">
          <div className="mb-4 text-white">
            <Logo />
          </div>
        </Link>
        <div className="text-base text-gray-400 text-center">
          <p>
            &copy; 2023 BlogVista. <span>Made with &#x2665; by Mubeen</span>
          </p>
        </div>
      </div>
    </section>
  );
}

export default Footer;
