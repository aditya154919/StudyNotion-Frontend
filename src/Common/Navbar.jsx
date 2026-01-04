import React, { useEffect, useState } from "react";
import studyNotion from "../assets/Logo/Logo-Full-Light.png";
import { Link, matchPath, useLocation } from "react-router";
import { NavbarLinks } from "../data/navbar-links";
import { useSelector } from "react-redux";
import { IoCartOutline } from "react-icons/io5";
import ProfileDropdown from "../components/cores/Authentication/ProfileDropdown";
import { apiConnector } from "../Services/apiconnector";
import { tag } from "../Services/api";

import { BsChevronDown } from "react-icons/bs";
import { AiOutlineMenu } from "react-icons/ai";

const Navbar = () => {
  const { token } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.profile);
  const { totalItems } = useSelector((state) => state.cart);

  const location = useLocation();
  const [subLinks, setSubLinks] = useState([]);
  const [isCatalogOpen, setIsCatalogOpen] = useState(false);

  // Fetch catalog tags
  useEffect(() => {
    (async () => {
      try {
        const result = await apiConnector({
          method: "GET",
          url: tag.TAG_API,
        });
        setSubLinks(result.data.data);
      } catch (error) {
        console.log("Could not fetch Tag list", error);
      }
    })();
  }, []);

  const matchRoute = (route) => {
    return matchPath({ path: route }, location.pathname);
  };

  return (
    <div className="flex h-12 items-center justify-center border-b border-[#2C333F] px-20">
      <div className="flex w-11/12 items-center justify-between">
        {/* Logo */}
        <Link to="/">
          <img src={studyNotion} width={160} height={128} alt="StudyNotion" />
        </Link>

        {/* Nav Links */}
        <nav>
          <ul className="flex gap-6 items-center">
            {NavbarLinks.map((nav, index) => (
              <li key={index}>
                {nav.title === "Catalog" ? (
                  <div
                    className="relative flex items-center gap-1 cursor-pointer"
                    onMouseEnter={() => setIsCatalogOpen(true)}
                    onMouseLeave={() => setIsCatalogOpen(false)}
                  >
                    <p className="text-white">{nav.title}</p>
                    <BsChevronDown className="text-white mt-1" />

                    {/* Dropdown */}
                    <div
                      className={`absolute left-1/2 top-full mt-3 z-1000 flex flex-col rounded-md bg-[#F1F2FF] py-4 px-5 text-[#000814] transition-all duration-200 w-56 -translate-x-1/2 ${isCatalogOpen ? "visible opacity-100" : "invisible opacity-0"}`}
                    >
                      {/* Arrow */}
                      <div
                        className="absolute left-1/2 -top-2 h-4 w-4 bg-[rgb(241,242,255)]
                      -translate-x-1/2 rotate-45"
                      ></div>

                      {subLinks.length > 0 ? (
                        subLinks.map((link, i) => (
                          <Link
                            key={i}
                            to={`/catalog/${link.name
                              .split(" ")
                              .join("-")
                              .toLowerCase()}`}
                            onClick={() => setIsCatalogOpen(false)}
                          >
                            <p className="py-1 hover:text-blue-600">
                              {link.name}
                            </p>
                          </Link>
                        ))
                      ) : (
                        <p>Loading...</p>
                      )}
                    </div>
                  </div>
                ) : (
                  <Link to={nav.path}>
                    <p
                      className={`${
                        matchRoute(nav.path)
                          ? "text-[#FFE83D]"
                          : "text-[#E2E6ED]"
                      }`}
                    >
                      {nav.title}
                    </p>
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </nav>

        {/* Right Section */}
        <div className="flex items-center gap-x-4">
          {/* Cart */}
          {user && user.accountType !== "Instructor" && (
            <Link to="/dashboard/cart" className="relative">
              <IoCartOutline className="text-white text-2xl" />
              {totalItems > 0 && (
                <span
                  className="absolute -top-2 -right-2 flex h-5 w-5 items-center
                justify-center rounded-full bg-[#FFD60A] text-xs font-bold text-black"
                >
                  {totalItems}
                </span>
              )}
            </Link>
          )}

          {/* Auth Buttons */}
          {token === null && (
            <Link to="/login">
              <button
                className="border border-[#2C333F] bg-[#161D29]
              px-3 py-1 text-[#AFB2BF] rounded-md"
              >
                Login
              </button>
            </Link>
          )}

          {token === null && (
            <Link to="/signup">
              <button
                className="border border-[#2C333F] bg-[#161D29]
              px-3 py-1 text-[#AFB2BF] rounded-md"
              >
                Signup
              </button>
            </Link>
          )}

          {token !== null && <ProfileDropdown />}
        </div>

        {/* Mobile Menu */}
        <button className="md:hidden">
          <AiOutlineMenu fontSize={24} fill="#AFB2BF" />
        </button>
      </div>
    </div>
  );
};

export default Navbar;
