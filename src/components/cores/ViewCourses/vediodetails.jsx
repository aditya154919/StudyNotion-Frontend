
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router";
import { updateCompletedLectures } from "../../../slices/ViewCourseSlice";
import IconBtn from "../../../Common/IconBtn";
import { courseProgress } from "../../../Services/operations/Courseapi";
import { FaArrowLeft } from "react-icons/fa6";


const VideoDetails = () => {
  const { courseId, sectionId, subSectionId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const { token } = useSelector((state) => state.auth);
  const { courseSectionData, completedLectures } = useSelector(
    (state) => state.viewCourse
  );

 
  const [videoData, setVideoData] = useState([]);
  const [videoEnd, setVideoEnd] = useState(false);
  const [loading, setLoading] = useState(false);

  const vedioref = useRef(null);


  useEffect(() => {
    if (!courseSectionData?.length) return;

    if (!courseId && !sectionId && !subSectionId) {
      navigate("/dashboard/enrolled-courses");
      return;
    }

    const section = courseSectionData.find((sec) => sec._id === sectionId);

    const subSection = section?.subSection.find(
      (sub) => sub._id === subSectionId
    );

    setVideoData(subSection || null);
    setVideoEnd(false);
  }, [courseSectionData, location.pathname]);

  
  const currentSectionIndex = courseSectionData.findIndex(
    (sec) => sec._id === sectionId
  );

  const currentSubSectionIndex = courseSectionData[
    currentSectionIndex
  ]?.subSection.findIndex((sub) => sub._id === subSectionId);

  
  // FIRST / LAST VIDEO CHECK
  const isFirstVideo = () => {
    return currentSectionIndex === 0 && currentSubSectionIndex === 0
  };

  const isLastVideo = () => {
    const lastSectionIndex = courseSectionData.length - 1;
    const lastSubSectionIndex =
      courseSectionData[currentSectionIndex].subSection.length - 1;

    return (
      currentSectionIndex === lastSectionIndex &&
      currentSubSectionIndex === lastSubSectionIndex
    );
  };

  // NAVIGATION
  const goToNextVideo = () => {
    const currentSection = courseSectionData[currentSectionIndex];

    // same section
    if (currentSubSectionIndex < currentSection.subSection.length - 1) {
      const nextSubId =
        currentSection.subSection[currentSubSectionIndex + 1]._id;

      navigate(
        `/viewCourse/${courseId}/section/${sectionId}/subSection/${nextSubId}`
      );
    }
    // next section
    else {
      const nextSection = courseSectionData[currentSectionIndex + 1];
      navigate(
        `/viewCourse/${courseId}/section/${nextSection._id}/subSection/${nextSection.subSection[0]._id}`
      );
    }
  };

  const goToPrevVideo = () => {
    const currentSection = courseSectionData[currentSectionIndex];

    // same section
    if (currentSubSectionIndex > 0) {
      const prevSubId =
        currentSection.subSection[currentSubSectionIndex - 1]._id;

      navigate(
        `/viewCourse/${courseId}/section/${sectionId}/subSection/${prevSubId}`
      );
    }
    // previous section
    else {
      const prevSection = courseSectionData[currentSectionIndex - 1];
      const lastSubIndex = prevSection.subSection.length - 1;

      navigate(
        `/viewCourse/${courseId}/section/${prevSection._id}/subSection/${prevSection.subSection[lastSubIndex]._id}`
      );
    }
  };

  // rewatch

  const handleRewatch = () => {
    if (!vedioref.current) return;

    vedioref.current.currentTime = 0; 
    vedioref.current.play(); 
    setVideoEnd(false); 
  };


  // ----------------------------------------
  // MARK LECTURE COMPLETE
  // ----------------------------------------
  const handleLectureCompletion = async () => {
    try {
      setLoading(true);
      const res = await courseProgress(
        {courseId,subSectionId },
        token,dispatch
      );

      if (res) {
      dispatch(updateCompletedLectures(subSectionId));
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // ----------------------------------------
  // UI
  // ----------------------------------------
  if (!videoData) {
    return <div className="text-white font-semibold text-3xl flex items-center justify-center h-screen"><FaArrowLeft className="items-center text-center mr-3"/>Select Vedio.</div>;
  }

  return (
    <div className="flex flex-col gap-5 text-white">
      {/* VIDEO */}
      <video
        ref={vedioref}
        src={videoData.vedioUrl}
        controls
        onEnded={() => setVideoEnd(true)}
        className="w-full rounded-md"
      />

      {/* CONTROLS */}
      {videoEnd && (
        <div
          style={{
            backgroundImage:
              "linear-gradient(to top, rgb(0, 0, 0), rgba(0,0,0,0.7), rgba(0,0,0,0.5), rgba(0,0,0,0.1)",
          }}
          className="full flex flex-col items-center justify-center gap-2 absolute inset-0 z-100  h-full place-content-center font-inter"
        >
          {/* MARK COMPLETE */}
          {!completedLectures.includes(subSectionId) && (
            <IconBtn
              disabled={loading}
              onclick={handleLectureCompletion}
              text={loading ? "Loading..." : "Mark As Completed"}
              className="text-xl max-w-max px-4 mx-auto"
            />
          )}

          <IconBtn
            disabled={loading}
            onclick={handleRewatch}
            text={loading ? "Loading..." : "Rewatch"}
            customClasses="text-xl max-w-max px-4 mx-auto mt-2"
          />

          {/* NAVIGATION */}
          <div className="flex gap-4">
            {!isFirstVideo() && (
              <button
                disabled={loading}
                onClick={goToPrevVideo}
                className="rounded-md bg-[#161D29] px-5 py-2 font-semibold text-[#F1F2FF]"
              >
                Prev
              </button>
            )}

            {!isLastVideo() && (
              <button
                disabled={loading}
                onClick={goToNextVideo}
                className="rounded-md bg-[#FFD60A] px-5  py-2 font-semibold text-[#000814]"
              >
                Next
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default VideoDetails;
