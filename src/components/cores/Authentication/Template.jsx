import React from "react";
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";
import frameImg from "../../../assets/Images/frame.png"
import { useSelector } from "react-redux";

const Template = ({ title, description1, description2, image, formType }) => {
  const {message} = useSelector((state)=>state.auth)
  console.log("message",message)
  return (
    <div className="mx-auto flex relative  w-11/12 flex-col-reverse justify-between gap-y-12 py-12 md:flex-row md:gap-y-0 md:gap-x-12">
      {/* right side */}
      <div className="mx-auto w-full max-w-112.5 md:mx-0">
        <h1 className="text-3xl font-semibold leading-tight text-white sm:text-4xl">
          {title}
        </h1>

        <p className="mt-4 text-[1.125rem] leading-6.5">
          <span className="text-[#AFB2BF] text-lg">{description1}</span>{" "}
          <br></br>
          <span className="font-mono text-[15px] font-bold italic text-[#47A5C5]">
            {description2}
          </span>
        </p>
        {formType == "login" ? <LoginForm /> : <SignupForm />}
        
      </div>

       {/* left side */}
      <div className="relative mx-auto w-full max-w-112.5 md:mx-0">
        <img
          src={frameImg}
          alt="Pattern"
          width={558}
          height={504}
          loading="lazy"
          className="h-auto w-full"
        />
        <img
          src={image}
          alt="Students"
          width={558}
          height={504}
          loading="lazy"
          className="absolute -top-2 right-2 z-10 h-auto w-[calc(100%_-_1rem)] sm:-top-4 sm:right-4 sm:w-[calc(100%_-_2rem)]"
        />
      </div>
    </div>
  );
};

export default Template;
