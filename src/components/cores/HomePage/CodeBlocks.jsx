import React from "react";
import CTAButton from "./CTAButton";
import { FaArrowRight } from "react-icons/fa";
import { TypeAnimation } from "react-type-animation";

const CodeBlocks = ({
  position,
  heading,
  subheading,
  ctabtn1,
  ctabtn2,
  codeblockbggradient,
  codecolor,
  codeblock,
}) => {
  return (
    <div className={`flex md:flex-row flex-col ${position} my-20 md:w-full w-[80%] md:p-0  md:justify-between  gap-12`}>
      
      {/* Section 1 */}
      <div className="flex flex-col    lg:w-[50%] gap-7 px-4">
        {heading}

        <div className="text-[#999DAA] md:text-[17px] text-[13px]  font-semibold md:w-[85%]  -mt-3">
          {subheading}
        </div>

        <div className="flex gap-3">
          <CTAButton active={ctabtn1.active} linkto={ctabtn1.linkto}>
            <div className="flex items-center gap-2">
              {ctabtn1.btnText}
              <FaArrowRight />
            </div>
          </CTAButton>

          <CTAButton active={ctabtn2.active} linkto={ctabtn2.linkto}>
            {ctabtn2.btnText}
          </CTAButton>
        </div>
      </div>

      {/* Section 2 */}
      <div className="relative code-border flex w-full lg:w-125 rounded-lg  sm:text-sm leading-4.5">
        {codeblockbggradient}
        {/* Line Numbers */}
        <div className="w-[10%] text-[#6E727F] font-mono text-sm leading-6 p-4">
          {Array.from({ length: 11 }, (_, i) => (
            <p key={i}>{i + 1}</p>
          ))}
        </div>

        {/* Code */}
        <div className={`w-[90%] font-mono text-sm leading-6 p-4 ${codecolor} pr-1`}>
          <TypeAnimation
            sequence={[codeblock,1000,""]}
            repeat={Infinity}
            cursor={true}
            style={{
              whiteSpace: "pre-line",
              display: "block",
            }}
            omitDeletionAnimation={true}
          />
        </div>
      </div>

    </div>
  );
};

export default CodeBlocks;




