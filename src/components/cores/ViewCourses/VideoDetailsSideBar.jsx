import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { BsChevronDown } from "react-icons/bs";
import { useLocation, useNavigate, useParams } from "react-router";
import { IoIosArrowBack } from "react-icons/io";
import IconBtn from "../../../Common/IconBtn";

const VideoDetailsSideBar = ({ setreview }) => {
  const [activeSec, setActiveSec] = useState("");
  const [vedioActive, setVedioActive] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const { sectionId, subSectionId } = useParams();
  const {
    courseSectionData,
    courseEntireData,
    completedLectures,
    totalNoOfLectures,
  } = useSelector((state) => state.viewCourse);

  useEffect(() => {
    (() => {
      if (!courseSectionData.length) return;
      const currentSectionIndex = courseSectionData.findIndex(
        (data) => data._id === sectionId
      );
      const currentSubSectionIndex = courseSectionData?.[
        currentSectionIndex
      ]?.subSection.findIndex((data) => data._id == subSectionId);

      const activeSubsectionId =
        courseSectionData?.[currentSectionIndex]?.subSection?.[
          currentSubSectionIndex
        ];

      setActiveSec(courseSectionData?.[currentSectionIndex]?._id);
      setVedioActive(activeSubsectionId);
    })();
  }, [courseSectionData, courseEntireData, location.pathname]);

  console.log("active",activeSec)
  return (
    <>
      <div className="flex h-[calc(100vh-3.5rem)] w-70 max-w-87.5 flex-col border-r border-r-[#2C333F] bg-[#161D29]">
        {/* for btn and heading */}
        <div className="mx-5 flex flex-col items-start justify-between gap-2 gap-y-4 border-b border-[#424854] py-5 text-lg font-bold text-[#DBDDEA]">
          {/* for btn */}
          <div className="flex flex-col gap-0.5 w-full ">
            <div className="flex  flex-row w-full items-center justify-between">
              <div
                onClick={() => navigate("/dashboard/enrolled-courses")}
                className="flex h-8.6 w-8.6 items-center justify-center rounded-full bg-[#AFB2BF] p-1 text-[#2C333F] hover:scale-90"
                title="back"
              >
                <IoIosArrowBack size={30} />
              </div>

              <div onClick={()=>setreview(true)}>
                <IconBtn
                  text="Add Review"
                  onClick={() => setreview(true)}
                  // active={true}
                />
              </div>
            </div>

            <div className="flex flex-col">
              <p>{courseEntireData?.courseName}</p>
              <p className="text-sm font-semibold text-[#585D69]">
                {completedLectures?.length} / {totalNoOfLectures}
              </p>
            </div>
          </div>
        </div>

        <div className="h-[calc(100vh - 5rem)] overflow-y-auto">
          {courseSectionData?.map((section, index) => (
            <div
              onClick={() => setActiveSec(section?._id)}
              key={index}
              className="mt-2 cursor-pointer text-sm text-gray-200"
            >
              {/* section */}
              <div className="flex flex-row justify-between bg-[#424854] px-5 py-4">
                <div className="w-[70%] font-semibold">
                  {section?.sectionName}
                </div>
                <div className="flex items-center gap-3">
                  <span
                    className={`${
                      activeSec === section?.sectionName
                        ? "rotate-0"
                        : "rotate-180"
                    } transition-all duration-500`}
                  >
                    <BsChevronDown />
                  </span>
                </div>
              </div>

              {/* subsetction */}
              {
                activeSec === section?._id && (
                  <div className="transition-[height] duration-500 ease-in-out">
                    {section?.subSection?.map((topic,i)=>(
                      <div
                      className={`flex gap-3  px-5 py-2 ${
                        vedioActive === topic._id
                          ? "bg-[#CFAB08] font-semibold text-[#161D29]"
                          : "hover:bg-[#000814]"
                      } `}
                      key={i}
                      onClick={() => {
                        navigate(
                          `/viewCourse/${courseEntireData?._id}/section/${section?._id}/subSection/${topic?._id}`
                        )
                        setVedioActive(topic._id)
                      }}
                    >
                      <input
                        type="checkbox"
                        checked={completedLectures.includes(topic?._id)}
                        onChange={() => {}}
                      />
                      {topic.title}
                    </div>
                    ))}
                  </div>
                )
              }
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default VideoDetailsSideBar;
