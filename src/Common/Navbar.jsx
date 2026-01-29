
import React, { useEffect, useState } from "react";
import studyNotion from "../assets/Logo/Logo-Full-Light.png";
import { Link, matchPath, useLocation } from "react-router";
import { NavbarLinks } from "../data/navbar-links";
import { useSelector } from "react-redux";
import { IoCartOutline } from "react-icons/io5";
import ProfileDropdown from "../components/cores/Authentication/ProfileDropdown";
import { apiConnector } from "../Services/apiconnector";
import { tag } from "../Services/api";

import { BsChevronDown, BsChevronUp } from "react-icons/bs";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";

const Navbar = () => {
  const { token } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.profile);
  const { totalItems } = useSelector((state) => state.cart);

  const location = useLocation();
  const [subLinks, setSubLinks] = useState([]);
  const [isCatalogOpen, setIsCatalogOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [mobileCatalogOpen, setMobileCatalogOpen] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const result = await apiConnector({ method: "GET", url: tag.TAG_API });
        setSubLinks(result.data.data);
      } catch (error) {
        console.log("Could not fetch Tag list", error);
      }
    })();
  }, []);

  const matchRoute = (route) => {
    if (!route) return false;
    return matchPath({ path: route }, location.pathname);
  };

  return (
    <div className="flex h-14 items-center justify-center border-b border-[#2C333F] bg-[#000814] relative z-50">
      <div className="flex w-11/12 items-center justify-between">
        
        {/* Logo */}
        <Link to="/">
          <img src={studyNotion} width={160} height={42} alt="StudyNotion" className="w-30 md:w-40" />
        </Link>

        <nav className="hidden md:block">
          <ul className="flex gap-6 items-center">
            {NavbarLinks.map((nav, index) => (
              <li key={index}>
                {nav.title === "Catalog" ? (
                  <div
                    className="relative flex items-center gap-1 cursor-pointer group"
                    onMouseEnter={() => setIsCatalogOpen(true)}
                    onMouseLeave={() => setIsCatalogOpen(false)}
                  >
                    <p className="text-[#DBDDEA]">{nav.title}</p>
                    <BsChevronDown className="text-[#DBDDEA] mt-1" />
                    <div className={`absolute left-1/2 top-full mt-3 z-1000 flex flex-col rounded-md bg-[#F1F2FF] py-4 px-5 text-[#000814] transition-all duration-200 w-56 -translate-x-1/2 ${isCatalogOpen ? "visible opacity-100" : "invisible opacity-0"}`}>
                      <div className="absolute left-1/2 -top-2 h-4 w-4 bg-[#F1F2FF] -translate-x-1/2 rotate-45"></div>
                      {subLinks?.map((link, i) => (
                        <Link key={i} to={`/catalog/${link.name.split(" ").join("-").toLowerCase()}`}>
                          <p className="py-2 hover:text-[#47A5C5] border-b border-[#E2E8F0] last:border-0">{link.name}</p>
                        </Link>
                      ))}
                    </div>
                  </div>
                ) : (
                  <Link to={nav.path}>
                    <p className={`${matchRoute(nav.path) ? "text-[#FFE83D]" : "text-[#DBDDEA]"}`}>{nav.title}</p>
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-x-3 md:gap-x-4">
          
          <div className="hidden md:block">
            {user && user?.accountType !== "Instructor" && (
              <Link to="/dashboard/cart" className="relative">
                <IoCartOutline className="text-[#AFB2BF] text-2xl" />
                {totalItems > 0 && (
                  <span className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-[#FFD60A] text-xs font-bold text-[#000814]">
                    {totalItems}
                  </span>
                )}
              </Link>
            )}
          </div>

          {token === null ? (
            <div className="hidden md:flex items-center gap-x-4">
              <Link to="/login"><button className="border border-[#2C333F] bg-[#161D29] px-3 py-2 text-[#AFB2BF] rounded-md">Login</button></Link>
              <Link to="/signup"><button className="border border-[#2C333F] bg-[#161D29] px-3 py-2 text-[#AFB2BF] rounded-md">Signup</button></Link>
            </div>
          ) : (
            <ProfileDropdown />
          )}

          <button className="md:hidden block" onClick={() => setIsMobileMenuOpen(true)}>
            <AiOutlineMenu fontSize={28} fill="#AFB2BF" />
          </button>
        </div>
      </div>

      {/* MOBILE SIDEBAR */}
      <div className={`fixed inset-0 z-1500 md:hidden transition-all duration-300 ${isMobileMenuOpen ? "visible" : "invisible"}`}>
        {/* Overlay */}
        <div className={`absolute inset-0 bg-[#000814] bg-opacity-70 transition-opacity duration-300 ${isMobileMenuOpen ? "opacity-100" : "opacity-0"}`} onClick={() => setIsMobileMenuOpen(false)}></div>
        
        {/* Sidebar Panel */}
        <div className={`absolute right-0 top-0 h-full w-68 bg-[#161D29] p-6 shadow-2xl transition-transform duration-300 transform ${isMobileMenuOpen ? "translate-x-0" : "translate-x-full"}`}>
          <div className="flex justify-end mb-8">
            <button onClick={() => setIsMobileMenuOpen(false)}>
              <AiOutlineClose fontSize={28} fill="#AFB2BF" />
            </button>
          </div>

          <div className="flex flex-col gap-y-5">
            {user && user?.accountType !== "Instructor" && (
              <Link to="/dashboard/cart" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center gap-3 text-[#DBDDEA] text-lg border-b border-[#2C333F] pb-4">
                <div className="relative">
                  <IoCartOutline className="text-2xl" />
                  {totalItems > 0 && <span className="absolute -top-2 -right-2 flex h-4 w-4 items-center justify-center rounded-full bg-[#FFD60A] text-[10px] font-bold text-[#000814]">{totalItems}</span>}
                </div>
                <span>My Cart</span>
              </Link>
            )}

            {/* Nav Links */}
            {NavbarLinks.map((nav, index) => (
              <div key={index}>
                {nav.title === "Catalog" ? (
                  <div className="flex flex-col">
                    <button 
                      onClick={() => setMobileCatalogOpen(!mobileCatalogOpen)}
                      className="flex items-center justify-between w-full text-[#DBDDEA] text-lg"
                    >
                      <span>{nav.title}</span>
                      {mobileCatalogOpen ? <BsChevronUp /> : <BsChevronDown />}
                    </button>
                    {mobileCatalogOpen && (
                      <div className="mt-2 ml-4 flex flex-col gap-y-3 bg-[#000814] rounded-md p-3">
                        {subLinks?.map((link, i) => (
                          <Link 
                            key={i} 
                            to={`/catalog/${link.name.split(" ").join("-").toLowerCase()}`}
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="text-[#AFB2BF] text-sm border-b border-[#2C333F] last:border-0 pb-1"
                          >
                            {link.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <Link to={nav.path || "#"} onClick={() => setIsMobileMenuOpen(false)}>
                    <p className={`text-lg ${matchRoute(nav.path) ? "text-[#FFE83D]" : "text-[#DBDDEA]"}`}>{nav.title}</p>
                  </Link>
                )}
              </div>
            ))}

            {/* Login/Signup for Mobile  */}
            {token === null && (
              <div className="flex flex-col gap-y-3 pt-4 border-t border-[#2C333F]">
                <Link to="/login" onClick={() => setIsMobileMenuOpen(false)}>
                  <button className="w-full border border-[#2C333F] py-2 text-[#AFB2BF] rounded-md">Login</button>
                </Link>
                <Link to="/signup" onClick={() => setIsMobileMenuOpen(false)}>
                  <button className="w-full bg-[#FFE83D] py-2 text-[#000814] font-bold rounded-md">Signup</button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;