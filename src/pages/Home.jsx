import React from "react";
import { FaArrowRight } from "react-icons/fa";
import Img1 from "../assets/Images/Instructor.png";
import { Link } from "react-router";
import CTAButton from "../components/cores/HomePage/CTAButton";
// import Banner from "../assets/Images/banner.mp4";
import Banner from "../assets/Images/banner.mp4";
import CodeBlocks from "../components/cores/HomePage/CodeBlocks";
import TimelineSection from "../components/cores/HomePage/TimelineSection";
import LearninglangSection from "../components/cores/HomePage/LearninglangSection";
import Footer from "../components/cores/HomePage/Footer";
import Exploremore from "../components/cores/HomePage/Exploremore";
import RivewSlider from "../components/cores/HomePage/RivewSlider";
// import CourseCard from "../components/cores/HomePage/CourseCard";

const Home = () => {
  return (
    <div>
      {/* section 1 */}
      <div className="relative mx-auto flex flex-col items-center justify-between w-11/12 max-w-7xl text-white">
        <Link to={"/signup"}>
          <div className="group mx-auto mt-16 w-fit rounded-full bg-[#161D29] p-1 font-bold text-[#999DAA] drop-shadow-[0_1.5px_rgba(255,255,255,0.25)] transition-all duration-200 hover:scale-95 hover:drop-shadow-none ">
            <div className="flex flex-row items-center gap-2 rounded-full px-10 py-1 transition-all duration-200 group-hover:bg-[#000814]">
              <p>Become an Instructor</p>
              <FaArrowRight />
            </div>
          </div>
        </Link>

        <div className="mt-10 text-center text-3xl font-semibold leading-tight sm:text-4xl md:text-5xl">
          Empower Your Future with{" "}
          <span className="bg-linear-to-b from-[#1FA2FF] via-[#12D8FA] to-[#A6FFCB] text-transparent bg-clip-text font-bold">
            Coding skills
          </span>
        </div>
        <div className="mt-5 w-full max-w-3xl px-2 text-center text-base font-medium text-[#838894] sm:text-lg md:text-xl">
          With our online coding courses, you can learn at your own pace, from
          anywhere in the world, and get access to a wealth of resources,
          including hands-on projects, quizzes, and personalized feedback from
          instructors.
        </div>

        <div className="flex flex-row gap-5 mt-10">
          <CTAButton active={true} linkto={"/login"}>
            Learn more
          </CTAButton>

          <CTAButton active={false} linkto={"/login"}>
            Book a demo
          </CTAButton>
        </div>

        <div className="my-10 md:my-14 w-full max-w-5xl shadow-[10px_-5px_50px_-5px] shadow-[#118AB2]">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full rounded-lg shadow-[8px_8px_rgba(255,255,255)] md:shadow-[17px_17px_rgba(255,255,255)]"
          >
            <source src={Banner} type="video/mp4" />
          </video>
        </div>
        {/* coding block */}
        <div className="w-full ">
          {/* Code Block 1 */}
          <div className="md:w-full overflow-hidden ">
            <CodeBlocks
              position="lg:flex-row w-full"
              heading={
                <div className="text-[1.4rem] sm:text-4xl font-semibold leading-tight">
                  Unlock your{" "}
                  <span className="bg-linear-to-r from-[#1FA2FF] via-[#12D8FA] to-[#A6FFCB] bg-clip-text text-transparent font-bold">
                    Coding potential
                  </span>
                  <br className="sm:hidden" /> with our online courses.
                </div>
              }
              subheading="Our courses are designed and taught by industry experts who have years of experience in coding."
              ctabtn1={{
                btnText: "Try it yourself",
                linkto: "/signup",
                active: true,
              }}
              ctabtn2={{
                btnText: "Learn more",
                linkto: "/login",
                active: false,
              }}
              codeblock={`<!DOCTYPE html>
<html>
<head>
<title>Example</title>
</head>
<body>
<h1><a href="/">Header</a></h1>
<nav>
<a href="/one">One</a>
</nav>
</body>`}
              codecolor="text-[#FFE83D]"
              codeblockbggradient={<div className="codeblock1 absolute"></div>}
            />
          </div>

          {/* Code Block 2 */}
          <div className="md:w-full hidden md:flex overflow-hidden ">
            <CodeBlocks
              position="lg:flex-row-reverse w-full   "
              heading={
                <div className="text-3xl sm:text-4xl font-semibold leading-tight">
                  Start{" "}
                  <span className="bg-linear-to-r from-[#1FA2FF] via-[#12D8FA] to-[#A6FFCB] bg-clip-text text-transparent font-bold">
                    Coding in <br className="hidden sm:block" />
                    Seconds.
                  </span>
                </div>
              }
              subheading="Go ahead, give it a try. Our hands-on learning environment means you'll be writing real code from your very first lesson."
              ctabtn1={{
                btnText: "Continue Lesson",
                linkto: "/signup",
                active: true,
              }}
              ctabtn2={{
                btnText: "Learn More",
                linkto: "/login",
                active: false,
              }}
              codeblock={`import React from "react";
import CTAButton from "./CTAButton";
import { Routes, Route } from "react-router";

function App() {
  return (
    <div className="w-full min-h-screen bg-[#000814]">
      <Routes>
        <Route path="/" element={<Home />} />
     
}`}
              codecolor="text-[#FFE83D]"
              codeblockbggradient={<div className="codeblock2 absolute"></div>}
            />
          </div>

          {/* Explore More */}
          <div className="mt-8 md:mt-20">
            <Exploremore />
          </div>
        </div>
      </div>
      {/* section 2 */}
      <div className="bg-[#F9F9F9] text-[#2C333F] overflow-hidden hidden md:block">
        <div className="homepage_bg md:h-75.5 h-30">
          <div className="w-11/12 max-w-315 flex items-center mx-auto gap-5 flex-col justify-between ">
            <div className="md:h-37.5 h-10"></div>
            <div className="flex flex-row gap-6 text-white ">
              <CTAButton active={true} linkto={"/signup"}>
                Explore Full Catlog
              </CTAButton>
              <CTAButton active={false} linkto={"/signup"}>
                Learn more
              </CTAButton>
            </div>
          </div>
        </div>

        <div className="w-11/12 mx-auto max-w-315 flex flex-col mt-15 items-center justify-between gap-7 ">
          <TimelineSection />
          <LearninglangSection />
        </div>
      </div>
      {/* section 3 */}
      <div className=" relative mx-auto my-20 flex w-11/12 max-w-maxContent flex-col items-center justify-between gap-8 bg-richblack-900 text-white">
        <div className="flex flex-col lg:flex-row gap-20 items-center">
          <div className="flex flex-col lg:flex-row gap-20 items-center ml-5 ">
            <img
              src={Img1}
              className="object-contain shadow-white shadow-[-20px_-20px_0_0]  "
            />
          </div>
          <div className="flex flex-col gap-6 items-start">
            <div className="flex flex-col gap-2 items-start">
              <p className="text-4xl text-white font-semibold">Become an </p>
              <p className="bg-linear-to-b from-[#1FA2FF] via-[#12D8FA] to-[#A6FFCB] text-transparent bg-clip-text font-bold text-4xl">
                instructor
              </p>
            </div>
            <p className="text-medium text-gray-400  w-[90%] mb-2">
              Instructors from around the world teach millions of students on
              StudyNotion. We provide the tools and skills to teach what you
              love.
            </p>
            <div>
              <CTAButton active={true} linkto={"signup"}>
                Start Teaching Now
              </CTAButton>
            </div>
          </div>
        </div>
        <p className="text-center text-4xl font-semibold mt-1">
          Reviews from other learners
        </p>
        <RivewSlider />
      </div>
      {/* section 4 */}
      <div>
        <Footer></Footer>
      </div>
    </div>
  );
};

export default Home;
