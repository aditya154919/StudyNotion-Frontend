import React from "react";
import Img1 from "../../../assets/Images/Know_your_progress.png"
import Img2 from "../../../assets/Images/Compare_with_others.png"
import Img3 from "../../../assets/Images/Plan_your_lessons.png"
import CTAButton from "./CTAButton";

const LearninglangSection = () => {
  return (
    <div>
      <div className="flex flex-col gap-5 w-11/12 mt-15 items-center">
        <div className="text-4xl font-semibold text-center ml-20">
          Your swiss knife for{" "}
          <span className="bg-linear-to-b from-[#1FA2FF] via-[#12D8FA] to-[#A6FFCB] text-transparent bg-clip-text font-bold text-4xl">
            learning any language
          </span>
        </div>
        <div className="text-center font-medium w-[75%] text-gray-600 mx-auto ">
          Using spin making learning multiple languages easy. with 20+ languages
          realistic voice-over, progress tracking, custom schedule and more.
        </div>
        <div className="flex flex-col lg:flex-row items-center justify-center ml-12 mt-8 lg:mt-0 ">
          <img src={Img1} alt="" className="object-contain lg:-mr-32 h-[38%] w-[38%]  " />
          <img src={Img2} alt="" className="object-contain lg:-mb-1  -mt-12 h-[42%] w-[40%]" />
          <img src={Img3} alt="" className="object-contain lg:-ml-36 lg:-mt-9 -mt-16 h-[43%] w-[45%]" />
        </div>

        <div className="flex items-center ml-5 mb-9">
            <CTAButton active={true} linkto={"/signup"}>Learn more</CTAButton>
        </div>
      </div>
    </div>
  );
};

export default LearninglangSection;
