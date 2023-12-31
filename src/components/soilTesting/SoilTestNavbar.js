import React, { useState } from "react";
import { close, logo, menu } from "../../assets";
import { Link, useNavigate } from "react-router-dom";
import { Buttons } from "../homeSection/Buttons";
import { auth } from "../../firebase";
import { signOut } from "firebase/auth";

const SoilTestNavbar = () => {
  const [toggle, setToggle] = useState(false);
  const navigate = useNavigate();

  const logOut = async () => {
    await signOut(auth);
    navigate("/");
  };

  return (
    <nav className="w-full flex justify-between items-center bg-secondary navbar px-5">
      <Link to="/">
        <img
          src={logo}
          alt="bank"
          className="nav-logo px-2 py-2 rounded-full cursor-pointer w-[55px] h-[55px] sm:w-20 sm:h-20 sm:px-3 sm:py-3"
        />
      </Link>
      <ul className="list-none sm:flex hidden justify-end items-center flex-1">
        <Link to="/SoilTestMainPage">
          <li
            className={`font-poppins font-semibold cursor-pointer text-xl  mr-3 py-2 px-5 text-primary nav-links nav-link`}
          >
            Home
          </li>
        </Link>
        <Link to="/SoilTestAboutUs">
          <li
            className={`font-poppins font-semibold cursor-pointer text-xl  mr-3 py-2 px-5 text-primary nav-links nav-link`}
          >
            About-Us
          </li>
        </Link>
        <Link to="/SoilLawnGardenTest">
          <li
            className={`font-poppins font-semibold cursor-pointer text-xl  mr-3 py-2 px-5 text-primary nav-links nav-link`}
          >
            Services
          </li>
        </Link>
        <Link to="/SoilTestReport">
          <li
            className={`font-poppins font-semibold cursor-pointer text-xl  mr-3 py-2 px-5 text-primary nav-links nav-link`}
          >
            Report
          </li>
        </Link>
        <Link to="/SoilTestContactUs">
          <li
            className={`font-poppins font-semibold cursor-pointer text-xl  mr-3 py-2 px-5 text-primary nav-links nav-link`}
          >
            Contact-Us
          </li>
        </Link>
        <li className="ml-2">
          {auth.currentUser ? (
            <Buttons buttonStyle="btn--outline">SIGN OUT</Buttons>
          ) : (
            <Buttons buttonStyle="btn--outline">SIGN IN</Buttons>
          )}
        </li>
      </ul>
      <div className="sm:hidden flex flex-1 justify-end items-center">
        <img
          src={toggle ? close : menu}
          alt="menu"
          className="w-[28px] h-[28px] object-contain"
          onClick={() => setToggle((prev) => !prev)}
        />
        <div
          className={`${
            toggle ? "flex" : "hidden"
          } p-6 bg-primary absolute top-10 right-0 mx-4 my-2 min-w-[140px] rounded-xl sidebar `}
        >
          <ul className="list-none flex flex-col justify-end items-center flex-1">
            <Link to="/SoilTestMainPage">
              <li
                className={`font-poppins font-normal cursor-pointer text-[16px] mb-0 text-secondary px-2 py-2  nav-link`}
              >
                Home
              </li>
            </Link>
            <Link to="/SoilTestAboutUs">
              <li
                className={`font-poppins font-normal cursor-pointer text-[16px] mb-0 text-secondary px-2 py-2  nav-link`}
              >
                About-Us
              </li>
            </Link>
            <Link to="/LawnGarden">
              <li
                className={`font-poppins font-normal cursor-pointer text-[16px] mb-0 text-secondary px-2 py-2  nav-link`}
              >
                Services
              </li>
            </Link>
            <Link to="/ReportDisplay">
              <li
                className={`font-poppins font-normal cursor-pointer text-[16px] mb-0 text-secondary px-2 py-2  nav-link`}
              >
                Report
              </li>
            </Link>
            <Link to="/SoilTestContactUs">
              <li
                className={`font-poppins font-normal cursor-pointer text-[16px] mb-0 text-secondary px-2 py-2  nav-link`}
              >
                contact-Us
              </li>
            </Link>
            {auth.currentUser ? (
              <button type="button" onClick={logOut}>
                <li
                  className={`font-poppins font-normal cursor-pointer text-[16px] text-secondary px-2 py-2  nav-link`}
                >
                  SignOut
                </li>
              </button>
            ) : (
              <Link to="/Login">
                <li
                  className={`font-poppins font-normal cursor-pointer text-[16px] text-secondary px-2 py-2 nav-link`}
                >
                  SignIn
                </li>
              </Link>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default SoilTestNavbar;
