import React from "react";
import { useSelector } from "react-redux";
import { FaCheck } from "react-icons/fa";
import CourseInfo from "./CourseInformation/CourseInfo";
import CourseBuilder from "./courseBuilder/CourseBuilder";
import Publish from "./PublishCOurse/Publish";

const Section = () => {
  const { step } = useSelector((state) => state.course);

  const steps = [
    {
      id: 1,
      title: "Course Information",
    },
    {
      id: 2,
      title: "Course Builder",
    },
    {
      id: 3,
      title: "Publish Course",
    },
  ];
  return (
    <div className="min-w-0">
      <nav
        aria-label="Course setup progress"
        className="mb-6 rounded-2xl border border-[#2C333F] bg-[#161D29] p-4 sm:p-5"
      >
        <ol className="grid grid-cols-3 gap-2 sm:gap-4">
          {steps.map((item, index) => (
            <li key={item.id} className="min-w-0">
              <div className="flex items-center">
                <span
                  aria-current={step === item.id ? "step" : undefined}
                  className={`grid h-9 w-9 shrink-0 place-items-center rounded-full border text-sm font-bold transition ${
                    step === item.id
                      ? "border-amber-300 bg-amber-300 text-gray-950"
                      : step > item.id
                        ? "border-emerald-400 bg-emerald-400/15 text-emerald-300"
                        : "border-[#424854] bg-[#0b111b] text-gray-500"
                  }`}
                >
                  {step > item.id ? <FaCheck aria-hidden="true" /> : item.id}
                </span>
                {index < steps.length - 1 && (
                  <span
                    className={`ml-2 h-px flex-1 sm:ml-4 ${
                      step > item.id ? "bg-emerald-400" : "bg-[#424854]"
                    }`}
                  />
                )}
              </div>
              <p
                className={`mt-2 text-xs font-medium leading-5 sm:text-sm ${
                  step >= item.id ? "text-gray-100" : "text-gray-500"
                }`}
              >
                {item.title}
              </p>
            </li>
          ))}
        </ol>
      </nav>
      {step === 1 && <CourseInfo />}
      {step === 2 && <CourseBuilder />}
      {step === 3 && <Publish />}
    </div>
  );
};

export default Section;
