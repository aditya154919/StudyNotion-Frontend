import React from 'react'
import CTAButton from '../HomePage/CTAButton';

const LearningGridArray = [
  {
    order: -1,
    heading: "World-Class Learning for",
    highlightText: "Anyone, Anywhere",
    description:
      "Studynotion partners with more than 275+ leading universities and companies to bring flexible, affordable, job-relevant online learning to individuals and organizations worldwide.",
    BtnText: "Learn More",
    BtnLink: "/",
  },
  {
    order: 1,
    heading: "Curriculum Based on Industry Needs",
    description:
      "Save time and money! The Belajar curriculum is made to be easier to understand and in line with industry needs.",
  },
  {
    order: 2,
    heading: "Our Learning Methods",
    description:
      "Studynotion partners with more than 275+ leading universities and companies to bring",
  },
  {
    order: 3,
    heading: "Certification",
    description:
      "Studynotion partners with more than 275+ leading universities and companies to bring",
  },
  {
    order: 4,
    heading: `Rating "Auto-grading"`,
    description:
      "Studynotion partners with more than 275+ leading universities and companies to bring",
  },
  {
    order: 5,
    heading: "Ready to Work",
    description:
      "Studynotion partners with more than 275+ leading universities and companies to bring",
  },
];

const LearningGrid = () => {
  return (
    <div className="mx-auto mb-6 grid w-full grid-cols-1 gap-3 sm:mb-10 sm:grid-cols-2 sm:gap-4 xl:w-fit xl:grid-cols-4">
      {LearningGridArray.map((card, i) => {
        return (
          <div
            key={i}
            className={`${i === 0 && "sm:col-span-2 xl:col-span-2"}  ${
              card.order % 2 === 1
                ? "bg-[#2C333F]"
                : card.order % 2 === 0
                ? "bg-[#161D29]"
                : "bg-transparent"
            } ${card.order === 3 && "xl:col-start-2"}  `}
          >
            {card.order < 0 ? (
              <div className="flex flex-col gap-3 px-1 pb-5 sm:pb-3 xl:w-[90%]">
                <div className="text-3xl font-semibold leading-tight sm:text-4xl">
                  {card.heading}
                  {" "}
                  <span className='bg-linear-to-b from-[#1FA2FF] via-[#12D8FA] to-[#A6FFCB] text-transparent bg-clip-text font-bold'>{card.highlightText}</span>
                </div>
                <p className="text-[#838894] font-medium">
                  {card.description}
                </p>

                <div className="w-fit mt-2">
                  <CTAButton active={true} linkto={card.BtnLink}>
                    {card.BtnText}
                  </CTAButton>
                </div>
              </div>
            ) : (
              <div className="flex h-full flex-col gap-4 p-5 sm:p-6 lg:gap-6 lg:p-8">
                <h2 className="text-base font-semibold leading-snug text-gray-100 sm:text-lg">{card.heading}</h2>

                <p className="text-sm font-medium leading-6 text-[#AFB2BF]">
                  {card.description}
                </p>
              </div>
            )}
          </div>
        );
      })}
    </div>
  )
}

export default LearningGrid
