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
    HomeExploremore[0].courses[0].heading
  );

  const setMyCards = (value) => {
    setCurrentTab(value);
    const result = HomeExploremore.filter((courses) => courses.tag === value);
    setCourses(result[0].courses);
    setCurrestCard(result[0].courses[0].heading);
  };
  return (
    <div>
      <div className="text-4xl font-semibold text-center">
        Unlock the{" "}
        <span className="bg-linear-to-b from-[#1FA2FF] via-[#12D8FA] to-[#A6FFCB] text-transparent bg-clip-text font-bold text-4xl">
          power of course
        </span>
      </div>
      <p className="text-lg text-center text-[#838894] mt-2 font-semibold">
        Learn to Build Anything You Can Imagine
      </p>
      <div className="flex flex-row gap-10 items-center text-center mt-3 rounded-full bg-[#161D29] mx-auto w-fit px-3 border-b border-[#DBDDEA] mb-3">
        {
            tabsName.map((tab,index)=>{
                return(
                    <div className={`text-[16px]  flex flex-row items-center gap-2
                    ${currentTab === tab ? "bg-[#000814] px-2 text-[#F1F2FF] font-medium":"text-gray-500"}
                    rounded-full transition-all px-6 py-2 m-1 duration-200 cursor-pointer hover:text-[#F1F2FF]  hover:bg-[#000814]`}
                    key={index}
                    onClick={() =>setMyCards(tab)}
                    >
                       {tab}
                    </div>
                )
            })
        }
      </div>

      <div className="h-37.5 mb-8"></div>

      {/* course card group */}

        <div className="lg:absolute gap-10 justify-center lg:gap-0 flex lg:justify-between flex-wrap w-full lg:bottom-0 lg:left-[50%] lg:translate-x-[-50%] lg:translate-y-[50%] text-black lg:mb-0  lg:px-0 px-3">
            {
                courses.map((element,index)=>{
                    return(
                    <CourseCard
                    key={index}
                    cardData = {element}
                    curresntCard={curresntCard}
                    setCurrestCard = {setCurrestCard}
                    />
                    )
                })
            }
        </div>

    </div>
  ); 
};

export default Exploremore;
