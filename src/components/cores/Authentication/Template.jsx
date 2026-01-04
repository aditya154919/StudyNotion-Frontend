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
      <div className="mx-auto w-11/12 max-w-112.5 md:mx-0">
        <h1 className="text-3xl text-white font-semibold leading-9.5">
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
      <div className="relative mx-auto w-11/12 max-w-112.5 md:mx-0">
        <img
          src={frameImg}
          alt="Pattern"
          width={558}
          height={504}
          loading="lazy"
        />
        <img
          src={image}
          alt="Students"
          width={558}
          height={504}
          loading="lazy"
          className="absolute -top-4 right-4 z-10"
        />
      </div>
    </div>
  );
};

export default Template;
