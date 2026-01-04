import React from "react";

// Importing React Icons
import { HiUsers } from "react-icons/hi";
import { ImTree } from "react-icons/im";

const CourseCard = ({cardData, curresntCard,setCurrestCard }) => {
    
  return (
    <div
      className={`w-90 lg:w-[30%] ${
        curresntCard === cardData?.heading
          ? "bg-white shadow-[12px_12px_0_0] shadow-[#FFD166]"
          : "bg-[#161D29]"
      }  text-[#DBDDEA] h-75 mb-6 box-border cursor-pointer`}
      onClick={() => setCurrestCard(cardData?.heading)}
    >

      <div className="border-b-2 border-[#6E727F] border-dashed h-[80%] p-6 flex flex-col gap-3">
        <div
          className={` ${
            curresntCard === cardData?.heading && "text-[#161D29]"
          } font-semibold text-[20px]`}
        >
          {cardData?.heading}
        </div>

        <div className="text-[#6E727F]">{cardData?.description}</div>
      </div>

      <div
        className={`flex justify-between ${
          curresntCard === cardData?.heading ? "text-blue-400" : "text-[#838894]"
        } px-6 py-3 font-medium`}
      >
        {/* Level */}
        <div className="flex items-center gap-2 text-[16px]">
          <HiUsers />
          <p>{cardData?.level}</p>
        </div>

        {/* Flow Chart */}
        <div className="flex items-center gap-2 text-[16px]">
          <ImTree />
          <p>{cardData?.lessionNumber} Lession</p>
        </div>
      </div>
    </div>

   
  );
};

export default CourseCard;