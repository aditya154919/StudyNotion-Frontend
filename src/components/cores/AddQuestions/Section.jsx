import React from "react";
import { useSelector } from "react-redux";
import { FaCheck } from "react-icons/fa";
import QuestionInfo from "./QuestionInfo/QuestionInfo";
import ProblemContent from "./QuestionInfo/ProblemContent";
import ProblemSolution from "./PublishQuestion/problemSolution";


const Section = () => {
  const { step } = useSelector((state) => state.question);

  const steps = [
    {
      id: 1,
      title: "Problem information",
    },
    {
      id: 2,
      title: "Test case",
    },
    {
      id: 3,
      title: "Publish Problem",
    },
  ];
  return (
    <>
    <div className=" relative w-[90%] mb-2 flex items-center justify-around">
      {
        steps.map((item,index)=>{
          return(
            <>
            <div className="flex  items-center " key={index}>
              <button className={`grid cursor-default aspect-square w-8.5 place-items-center rounded-full border ${step == item.id ? "bg-amber-900 text-yellow-300 border-y-amber-500":"bg-gray-700 text-white border-gray-400"} ${step > item.id ? "text-yellow-300 bg-amber-900":""}`}>
                  {
                    step > item.id ?
                    (<FaCheck/>):(item.id)
                  }
              </button>
            </div>
            {item.id !== steps.length && (
              <>
                <div
                  className={`h-4.25 w-[33%]   border-dashed border-b-2 ${
                  step > item.id  ? "border-yellow-500" : "border-[#585D69]"
                } `}
                ></div>
              </>
            )}
            </>  
             
          )
        })
      }

    </div>

    <div className="relative mb-16 flex w-full select-none justify-between">
        {steps.map((item) => (
          <>
            <div
              className="flex w-full  flex-col items-center gap-y-2"
              key={item.id}
            >
              
              <p
                className={`text-sm ${
                  step >= item.id ? "text-[#F1F2FF]" : "text-[#6a7690]"
                }`}
              >
                {item.title}
              </p>
            </div>
            
          </>
        ))}
      </div>
      {/* rener component */}
      {step == 1 && <QuestionInfo/>}
      {step == 2 && <ProblemContent/>}
      {step == 3 && <ProblemSolution/>}
    </>
  )
};

export default Section;
