import React from "react";
import BannerImage1 from "../assets/Images/aboutus1.webp";
import BannerImage2 from "../assets/Images/aboutus2.webp";
import BannerImage3 from "../assets/Images/aboutus3.webp";
import Quote from "../components/cores/AboutPage/Quote";
import FoundingStory from "../assets/Images/FoundingStory.png";
import State from "../components/cores/AboutPage/State";
import LearningGrid from "../components/cores/AboutPage/LearningGrid";
import Footer from "../components/cores/HomePage/Footer";
import ReviewSlider from "../components/cores/HomePage/RivewSlider";

const About = () => {
  return (
    <main className="min-w-0 overflow-hidden">
      <section className="bg-[#2C333F]">
        <div className="mx-auto w-11/12 max-w-315 py-8 text-center text-white sm:py-12 lg:py-16">
          <header className="mx-auto max-w-4xl text-2xl font-semibold leading-tight sm:text-3xl lg:text-4xl">
            Driving Innovation in Online Education for a{" "}
            <span className="block bg-linear-to-b from-[#1FA2FF] via-[#12D8FA] to-[#A6FFCB] bg-clip-text font-bold text-transparent">
              Brighter Future
            </span>
            <p className="mx-auto mt-4 max-w-3xl text-sm font-medium leading-6 text-[#C5C7D4] sm:text-base sm:leading-7">
              Studynotion is at the forefront of driving innovation in online
              education. We're passionate about creating a brighter future by
              offering cutting-edge courses, leveraging emerging technologies,
              and nurturing a vibrant learning community.
            </p>
          </header>

          <div className="mt-7 grid grid-cols-2 gap-3 sm:mt-10 sm:grid-cols-3 sm:gap-4">
            <img
              src={BannerImage1}
              alt="Learner studying online"
              width={300}
              height={300}
              className="col-span-2 aspect-video w-full rounded-xl object-cover shadow-lg shadow-black/20 sm:col-span-1 sm:aspect-4/3"
            />
            <img
              src={BannerImage2}
              alt="Collaborative online learning"
              width={300}
              height={300}
              className="aspect-4/3 w-full rounded-xl object-cover shadow-lg shadow-black/20"
            />
            <img
              src={BannerImage3}
              alt="Building skills through education"
              width={300}
              height={300}
              className="aspect-4/3 w-full rounded-xl object-cover shadow-lg shadow-black/20"
            />
          </div>
        </div>
      </section>

      <section className="border-b border-[#2C333F]">
        <div className="mx-auto w-11/12 max-w-5xl py-8 sm:py-12">
          <Quote />
        </div>
      </section>

      <section>
        <div className="mx-auto flex w-11/12 max-w-310 flex-col px-1 text-[#585D69] sm:px-4 lg:px-8">
          <div className="flex flex-col gap-6 py-10 sm:gap-8 sm:py-14 lg:flex-row lg:items-center lg:py-20">
            <div className="flex min-w-0 flex-col gap-4 lg:w-1/2 lg:gap-5">
              <h2 className="bg-linear-to-br from-[#833AB4] via-[#FD1D1D] to-[#FCB045] bg-clip-text text-3xl font-semibold text-transparent sm:text-4xl lg:max-w-md">
                Our Founding Story
              </h2>
              <p className="text-sm font-medium leading-7 text-[#AFB2BF] sm:text-base lg:max-w-2xl">
                Our e-learning platform was born out of a shared vision and
                passion for transforming education. It all began with a group of
                educators, technologists, and lifelong learners who recognized
                the need for accessible, flexible, and high-quality learning
                opportunities in a rapidly evolving digital world.
              </p>
              <p className="text-sm font-medium leading-7 text-[#AFB2BF] sm:text-base lg:max-w-2xl">
                As experienced educators ourselves, we witnessed firsthand the
                limitations and challenges of traditional education systems. We
                believed that education should not be confined to the walls of a
                classroom or restricted by geographical boundaries. We
                envisioned a platform that could bridge these gaps and empower
                individuals from all walks of life to unlock their full
                potential.
              </p>
            </div>

            <div className="w-full min-w-0 lg:w-1/2">
              <img
                src={FoundingStory}
                alt="The founding story of the learning platform"
                loading="lazy"
                className="aspect-4/3 h-auto w-full rounded-xl object-cover shadow-[0_0_20px_0] shadow-[#FC6767]"
              />
            </div>
          </div>
          <div className="grid gap-8 border-t border-[#2C333F] py-10 sm:gap-10 sm:py-14 lg:grid-cols-2 lg:gap-16 lg:py-20">
            <article className="flex min-w-0 flex-col gap-4 lg:gap-6">
              <h2 className="bg-linear-to-b from-[#FF512F] to-[#F09819] bg-clip-text text-3xl font-semibold text-transparent sm:text-4xl">
                Our Vision
              </h2>
              <p className="text-sm font-medium leading-7 text-[#AFB2BF] sm:text-base">
                With this vision in mind, we set out on a journey to create an
                e-learning platform that would revolutionize the way people
                learn. Our team of dedicated experts worked tirelessly to
                develop a robust and intuitive platform that combines
                cutting-edge technology with engaging content, fostering a
                dynamic and interactive learning experience.
              </p>
            </article>
            <article className="flex min-w-0 flex-col gap-4 lg:gap-6">
              <h2 className="bg-linear-to-b from-[#1FA2FF] via-[#12D8FA] to-[#A6FFCB] bg-clip-text text-3xl font-semibold text-transparent sm:text-4xl">
                Our Mission
              </h2>
              <p className="text-sm font-medium leading-7 text-[#AFB2BF] sm:text-base">
                Our mission goes beyond just delivering courses online. We
                wanted to create a vibrant community of learners, where
                individuals can connect, collaborate, and learn from one
                another. We believe that knowledge thrives in an environment of
                sharing and dialogue, and we foster this spirit of collaboration
                through                 forums, live sessions, and networking opportunities.
              </p>
            </article>
          </div>
        </div>
      </section>

      <State />
      <section className="mx-auto flex w-11/12 max-w-310 flex-col justify-between gap-8 py-10 text-white sm:py-14 lg:py-20">
        <LearningGrid />
      </section>

      <section className="relative mx-auto flex w-11/12 max-w-315 flex-col items-center justify-between gap-6 py-10 text-white sm:gap-8 sm:py-14 lg:py-20">
        <h2 className="text-center text-2xl font-semibold sm:text-3xl lg:text-4xl">
          Reviews from other learners
        </h2>
        <ReviewSlider />
      </section>
      <Footer />
    </main>
  );
};

export default About;
