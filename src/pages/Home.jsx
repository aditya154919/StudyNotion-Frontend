import React from "react";
import { FaArrowRight } from "react-icons/fa";
import Img1 from "../assets/Images/Instructor.png";
import { Link } from "react-router";
import CTAButton from "../components/cores/HomePage/CTAButton";
// import Banner from "../assets/Images/banner.mp4";
import Banner from "../assets/Images/banner.mp4"
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
      <div className="relative mx-auto flex flex-col items-center text-white justify-between w-11/12">
        <Link to={"/signup"}>
          <div className="group mx-auto mt-16 w-fit rounded-full bg-[#161D29] p-1 font-bold text-[#999DAA] drop-shadow-[0_1.5px_rgba(255,255,255,0.25)] transition-all duration-200 hover:scale-95 hover:drop-shadow-none ">
            <div className="flex flex-row items-center gap-2 rounded-full px-10 py-1 transition-all duration-200 group-hover:bg-[#000814]">
              <p>Become an Instructor</p>
              <FaArrowRight />
            </div>
          </div>
        </Link>

        <div className="font-semibold text-4xl text-center mt-10">
          Empower Your Future with{" "}
          <span className="bg-linear-to-b from-[#1FA2FF] via-[#12D8FA] to-[#A6FFCB] text-transparent bg-clip-text font-bold">
            Coading skills
          </span>
        </div>
        <div className="mt-3 w-[90%] text-center text-xl md:line-clamp-2 line-clamp-4 font-bold text-[#838894]">
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

        <div className="mx-9  my-15 shadow-[10px_-5px_50px_-5px] shadow-[#118AB2]">
          <video
            autoPlay
            loop
            muted
            className="  shadow-[17px_17px_rgba(255,255,255)]"
          >
            <source src={Banner} type="video/mp4"  />
          </video>
        </div>

        <div>
          {/* code section 1 */}
          {/* <div className="w-full overflow-x-hidden ">
            <CodeBlocks
              position={"lg:flex-row"}
              heading={
                <div className="md:text-4xl  text-3xl md:mr-0 mr-10 font-semibold">
                  Unlock your{" "}
                  <span className="bg-linear-to-b from-[#1FA2FF] via-[#12D8FA] to-[#A6FFCB] text-transparent bg-clip-text font-bold">
                    Coading potential
                  </span>{" "}
                  with our online courses.
                </div>
              }
              subheading={
                "Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you."
              }
              ctabtn1={{
                btnText: "try it yourself",
                linkto: "/signup",
                active: true,
              }}
              ctabtn2={{
                btnText: "learn more",
                linkto: "/login",
                active: false,
              }}
              codeblock={`<!DOCTYPE html>\n<html lang="en>\n<head>\n<title>This is my page</title>\n</head>\n<body>\n<h1><a href="/">Header</a></h1>\n<nav><a href="/one">One</a><a\nhref="/two">Two</a><a href="/three">Three</a>\n</nav>\n</body>`}
              codecolor={"text-[#FFE83D]"}
              codeblockbggradient={<div className="codeblock1 absolute"></div>}
            />
          </div> */}

          <div className="w-full overflow-x-hidden">
  <CodeBlocks
    position={"lg:flex-row"} // Can be changed to lg:flex-row-reverse to flip layout
    heading={
      <div className="md:text-4xl text-3xl font-semibold">
        Unlock your{" "}
        <span className="bg-linear-to-b from-[#1FA2FF] via-[#12D8FA] to-[#A6FFCB] text-transparent bg-clip-text font-bold">
          Coding potential
        </span>{" "}
        with our online courses.
      </div>
    }
    subheading="Our courses are designed and taught by industry experts who have years of experience in coding."
    ctabtn1={{ btnText: "Try it yourself", linkto: "/signup", active: true }}
    ctabtn2={{ btnText: "Learn more", linkto: "/login", active: false }}
    codeblock={`<!DOCTYPE html>\n<html>\n<head>\n<title>Example</title>\n</head>\n<body>\n<h1><a href="/">Header</a></h1>\n<nav>\n<a href="/one">One</a>\n</nav>\n</body>`}
    codecolor={"text-[#FFE83D]"}
    codeblockbggradient={<div className="codeblock1 absolute"></div>}
  />
</div>
          {/* codeblock 2 */}
          <div>
            <CodeBlocks
              position={"lg:flex-row-reverse"}
              heading={
                <div className="text-4xl font-semibold">
                  Start{" "}
                  <span className="bg-linear-to-b from-[#1FA2FF] via-[#12D8FA] to-[#A6FFCB] text-transparent bg-clip-text font-bold">
                    Coading in <br></br> Sec.
                  </span>{" "}
                </div>
              }
              subheading={
                "Go ahead, give it a try. Our hands-on learning environment means you'll be writing real code from your very first lesson."
              }
              ctabtn1={{
                btnText: "Continue Lesson",
                linkto: "/signup",
                active: true,
              }}
              ctabtn2={{
                btnText: "learn more",
                linkto: "/login",
                active: false,
              }}
              codeblock={`import React from "react";\nimport CTAButton from "./CTAButton";\nimport { FaArrowRight } from "react-icons/fa";\nimport { TypeAnimation } from "react-type-animation";\nreturn (\n<div className='w-screen min-h-screen bg-[#000814] flex flex-col font-inter'>
      <Routes>
         <Route path='/' element={<Home/>}/>
      </Routes>
    </div>`}
              codecoler={"text-[#FFE83D]"}
              codeblockbggradient={<div className="codeblock2 absolute"></div>}
            />
          </div>
          <div>
            <Exploremore/>
          </div>
        </div>
      </div>
      {/* section 2 */}
      <div className="bg-[#F9F9F9]  text-[#2C333F]">
        <div className="homepage_bg h-75.5">
          <div className="w-11/12 max-w-315 flex items-center mx-auto gap-5 flex-col justify-between ">
            <div className="h-37.5"></div>
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

        <div className="w-11/12 mx-auto max-w-315 flex flex-col mt-15 items-center justify-between gap-7">
          <div className="flex flex-row gap-7">
            <div className="text-4xl w-[45%] font-semibold">
              Get the skill you need for a{" "}
              <span className="bg-linear-to-b from-[#1FA2FF] via-[#12D8FA] to-[#A6FFCB] text-transparent bg-clip-text font-bold">
                Job thet in demand
              </span>
            </div>
            <div className="flex flex-col w-[40%] gap-10 items-start mb-10">
              <div className="text-[16px]">
                The modern StudyNotion is the dictates its own terms. Today, to
                be a competitive specialist requires more than professional
                skills.
              </div>
              <CTAButton active={true}>Learn more</CTAButton>
            </div>
          </div>

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
        <p className="text-center text-4xl font-semibold mt-1">Reviews from other learners</p>
        <RivewSlider/>
      </div>
      {/* section 4 */}
      <div>
        <Footer></Footer>
      </div>
    </div>
  );
};

export default Home;
