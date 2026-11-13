import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import IconBtn from "../../../Common/IconBtn";
import { courseProgress } from "../../../Services/operations/Courseapi";
import { FaArrowLeft } from "react-icons/fa6";

const VideoDetails = () => {
  const { courseId, sectionId, subSectionId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { token } = useSelector((state) => state.auth);
  const { courseSectionData, completedLectures } = useSelector(
    (state) => state.viewCourse,
  );

  const [videoData, setVideoData] = useState(null);
  const [videoEnd, setVideoEnd] = useState(false);
  const [loading, setLoading] = useState(false);

  const vedioref = useRef(null);

  useEffect(() => {
    if (!courseId || !sectionId || !subSectionId) {
      navigate("/dashboard/enrolled-courses");
      return;
    }

    if (!courseSectionData?.length) return;

    const section = courseSectionData.find((sec) => sec._id === sectionId);

    const subSection = section?.subSection?.find(
      (sub) => sub._id === subSectionId,
    );

    setVideoData(subSection || null);
    setVideoEnd(false);
  }, [courseId, sectionId, subSectionId, courseSectionData, navigate]);

  const currentSectionIndex = (courseSectionData || []).findIndex(
    (sec) => sec._id === sectionId,
  );

  const currentSection = courseSectionData?.[currentSectionIndex];

  const currentSubSectionIndex =
    currentSection?.subSection?.findIndex((sub) => sub._id === subSectionId) ??
    -1;

  // FIRST / LAST VIDEO CHECK
  const isFirstVideo = () => {
  return (
    currentSectionIndex === 0 &&
    currentSubSectionIndex === 0
  );
};

const isLastVideo = () => {
  if (!currentSection || currentSubSectionIndex === -1) {
    return false;
  }

  const lastSectionIndex = courseSectionData.length - 1;

  const lastSubSectionIndex =
    currentSection.subSection.length - 1;

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
        `/viewCourse/${courseId}/section/${sectionId}/subSection/${nextSubId}`,
      );
    }
    // next section
    else {
      const nextSection = courseSectionData[currentSectionIndex + 1];
      navigate(
        `/viewCourse/${courseId}/section/${nextSection._id}/subSection/${nextSection.subSection[0]._id}`,
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
        `/viewCourse/${courseId}/section/${sectionId}/subSection/${prevSubId}`,
      );
    }
    // previous section
    else {
      const prevSection = courseSectionData[currentSectionIndex - 1];
      const lastSubIndex = prevSection.subSection.length - 1;

      navigate(
        `/viewCourse/${courseId}/section/${prevSection._id}/subSection/${prevSection.subSection[lastSubIndex]._id}`,
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

  const handleLectureCompletion = async () => {
    try {
      setLoading(true);
      await courseProgress(
        { courseId, subSectionId },
        token,
        dispatch,
      );
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };


  if (!videoData) {
  return (
    <div className="flex h-screen items-center justify-center text-3xl font-semibold text-white">
      <FaArrowLeft className="mr-3" />
      Select Video.
    </div>
  );
}

  return (
    <div className="relative flex flex-col gap-5 text-white">
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
          className="absolute inset-0 z-10 flex h-full flex-col items-center justify-center gap-2 rounded-md place-content-center font-inter"
        >
          {/* MARK COMPLETE */}
          {!(completedLectures || []).includes(subSectionId) && (
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
