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
    <div className={`mx-auto flex w-full flex-col gap-8 py-8 md:my-20 md:w-full md:flex-row md:justify-between md:gap-12 md:py-0 ${position}`}>
      
      {/* Section 1 */}
      <div className="flex min-w-0 flex-col gap-5 px-4 sm:gap-7 lg:w-[50%]">
        {heading}

        <div className="text-[#999DAA] md:text-[17px] text-[13px] hidden md:flex font-semibold md:w-[85%]  -mt-3">
          {subheading}
        </div>

        <div className="flex flex-wrap gap-3">
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
      <div className="relative flex w-full min-w-0 rounded-lg leading-4.5 code-border sm:text-sm lg:w-125">
        {codeblockbggradient}
        {/* Line Numbers */}
        <div className="w-10 shrink-0 p-3 font-mono text-xs leading-6 text-[#6E727F] sm:w-[10%] sm:p-4 sm:text-sm">
          {Array.from({ length: 11 }, (_, i) => (
            <p key={i}>{i + 1}</p>
          ))}
        </div>

        {/* Code */}
        <div className={`min-w-0 flex-1 overflow-hidden p-3 pr-1 font-mono text-xs leading-6 sm:p-4 sm:text-sm ${codecolor}`}>
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



