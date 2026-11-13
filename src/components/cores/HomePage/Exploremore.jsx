import React, { useState } from "react";
import HomeExploremore from "../../../data/homepage-explore";
import CourseCard from "./CourseCard";

const tabsName = [
  "Free",
  "New to coding",
  "Most popular",
  "Skills paths",
  "Career paths",
];

const Exploremore = () => {
  const [currentTab, setCurrentTab] = useState(tabsName[0]);
  const [courses, setCourses] = useState(HomeExploremore[0].courses);
  const [curresntCard, setCurrestCard] = useState(
    HomeExploremore[0].courses[0].heading,
  );

  const setMyCards = (value) => {
    setCurrentTab(value);
    const result = HomeExploremore.filter((item) => item.tag === value);
    setCourses(result[0].courses);
    setCurrestCard(result[0].courses[0].heading);
  };

  return (
    <div className="w-full py-10">
      {/* Heading */}
      <div className="text-center">
        <h2 className="text-3xl sm:text-4xl font-semibold leading-tight">
          Unlock the{" "}
          <span className="bg-linear-to-r from-[#1FA2FF] via-[#12D8FA] to-[#A6FFCB] bg-clip-text text-transparent font-bold">
            power of course
          </span>
        </h2>

        <p className="hidden sm:block text-[#838894] mt-3 font-medium">
          Learn to Build Anything You Can Imagine
        </p>
      </div>

      {/* Tabs */}
      <div className="mt-8 overflow-x-auto scrollbar-hide">
        <div className="flex w-max mx-auto rounded-full bg-[#161D29] border-b border-richblack-800 p-2 gap-2">
          {tabsName.map((tab, index) => (
            <button
              key={index}
              onClick={() => setMyCards(tab)}
              className={`
               ${index >= 3 ? "hidden md:block" : ""}
               whitespace-nowrap rounded-full px-5 py-2 text-sm transition-all duration-200
               ${
                 currentTab === tab
                 ? "bg-[#000814] text-white"
                 : "text-richblack-300 hover:bg-[#000814] hover:text-white"
               }
    `}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Space for Desktop */}
      <div className="hidden lg:block h-36"></div>

      {/* Course Cards */}
      <div className="mt-8 flex w-full flex-col flex-wrap items-center justify-center gap-4 px-2 sm:mt-10 sm:gap-6 lg:absolute lg:bottom-0 lg:left-1/2 lg:mt-0 lg:w-full lg:-translate-x-1/2 lg:translate-y-1/2 lg:flex-row">
        {courses.map((element, index) => (
          <CourseCard
            key={index}
            cardData={element}
            curresntCard={curresntCard}
            setCurrestCard={setCurrestCard}
          />
        ))}
      </div>
    </div>
  );
};
export default Exploremore;
