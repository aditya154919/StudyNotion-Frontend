import React, { useState } from "react";
import { useSelector } from "react-redux";
import { BsChevronDown } from "react-icons/bs";
import { useNavigate, useParams } from "react-router";
import { IoIosArrowBack } from "react-icons/io";
import { BookOpen, Check, ChevronDown, X } from "lucide-react";
import IconBtn from "../../../Common/IconBtn";

const VideoDetailsSideBar = ({
  setreview,
  mobile = false,
  sectionMaterials = [],
  materialsUnavailable = false,
  materialsLoading = false,
}) => {
  const [sectionOverride, setSectionOverride] = useState(null);
  const [curriculumOpen, setCurriculumOpen] = useState(false);
  const navigate = useNavigate();
  const { sectionId, subSectionId } = useParams();
  const {
    courseSectionData,
    courseEntireData,
    completedLectures,
    totalNoOfLectures,
  } = useSelector((state) => state.viewCourse);

  const activeSec =
    sectionOverride?.route === sectionId
      ? sectionOverride.value
      : sectionId || "";

  const currentLesson = courseSectionData
    ?.find((section) => section._id === sectionId)
    ?.subSection?.find((lesson) => lesson._id === subSectionId);
  const completedCount = completedLectures?.length || 0;
  const completion =
    totalNoOfLectures > 0
      ? Math.round((completedCount / totalNoOfLectures) * 100)
      : 0;

  const renderSections = (compact = false) =>
    courseSectionData?.map((section, index) => {
      const isExpanded = activeSec === section?._id;
      const completedInSection = section.subSection?.filter((lesson) =>
        (completedLectures || []).includes(lesson._id),
      ).length;

      return (
        <section
          key={section._id || index}
          className={compact ? "border-b border-[#2C333F]" : "mt-2"}
        >
          <button
            type="button"
            aria-expanded={isExpanded}
            onClick={() =>
              setSectionOverride({
                route: sectionId,
                value: activeSec === section?._id ? "" : section?._id,
              })
            }
            className={`flex w-full items-center justify-between gap-3 text-left text-sm text-gray-100 transition ${
              compact
                ? "px-4 py-4 hover:bg-white/[0.03]"
                : "bg-[#424854] px-4 py-3 hover:bg-[#4b5360] sm:px-5 sm:py-4"
            }`}
          >
            <span className="min-w-0 flex-1">
              <span className="block truncate font-semibold">
                {section?.sectionName}
              </span>
              {compact && (
                <span className="mt-1 block text-xs font-normal text-[#AFB2BF]">
                  {completedInSection || 0} / {section.subSection?.length || 0}{" "}
                  lessons complete
                </span>
              )}
            </span>
            <span
              className={`shrink-0 transition-transform ${
                isExpanded ? "rotate-180" : ""
              }`}
            >
              {compact ? <ChevronDown size={18} /> : <BsChevronDown />}
            </span>
          </button>

          {isExpanded && (
            <div className="bg-[#111827] py-1">
              {section?.subSection?.map((topic, topicIndex) => {
                const isCurrent = subSectionId === topic._id;
                const isComplete = (completedLectures || []).includes(
                  topic._id,
                );
                return (
                  <button
                    type="button"
                    key={topic._id || topicIndex}
                    onClick={() => {
                      navigate(
                        `/viewCourse/${courseEntireData?._id}/section/${section?._id}/subSection/${topic?._id}`,
                      );
                      setCurriculumOpen(false);
                    }}
                    className={`flex w-full min-w-0 items-center gap-3 px-4 py-3 text-left text-sm transition sm:px-5 ${
                      isCurrent
                        ? "bg-[#CFAB08] font-semibold text-[#161D29]"
                        : "text-[#C5C7D4] hover:bg-[#000814]"
                    }`}
                  >
                    <span
                      className={`grid h-5 w-5 shrink-0 place-items-center rounded-full border ${
                        isComplete
                          ? "border-emerald-400 bg-emerald-400 text-[#071B14]"
                          : isCurrent
                            ? "border-[#161D29]"
                            : "border-[#687080]"
                      }`}
                    >
                      {isComplete && <Check size={12} strokeWidth={3} />}
                    </span>
                    <span className="min-w-0 flex-1 break-words">
                      {topic.title}
                    </span>
                    {isCurrent && (
                      <span className="shrink-0 text-[10px] font-bold uppercase tracking-wide">
                        Now playing
                      </span>
                    )}
                  </button>
                );
              })}
              {(() => {
                const material = sectionMaterials.find(
                  (item) => item.sectionId === section._id,
                );
                const sectionComplete =
                  (section.subSection?.length || 0) > 0 &&
                  completedInSection === section.subSection.length;

                if (!sectionComplete) return null;

                return (
                  <div className="space-y-2 border-t border-[#2C333F] px-4 py-4 sm:px-5">
                    <p className="text-xs font-bold uppercase tracking-wide text-amber-200">
                      Section resources
                    </p>
                    {material?.notes && (
                      <a
                        href={material.notes.url}
                        target="_blank"
                        rel="noreferrer"
                        className="block break-all text-sm text-cyan-200 underline-offset-2 hover:underline"
                      >
                        Notes: {material.notes.name || "Open notes"}
                      </a>
                    )}
                    {material?.assignment && (
                      <a
                        href={material.assignment.url}
                        target="_blank"
                        rel="noreferrer"
                        className="block break-all text-sm text-cyan-200 underline-offset-2 hover:underline"
                      >
                        Assignment:{" "}
                        {material.assignment.name || "Open assignment"}
                      </a>
                    )}
                    {!material &&
                      (materialsLoading ? (
                        <p className="text-xs text-[#AFB2BF]">
                          Loading section resources...
                        </p>
                      ) : materialsUnavailable ? (
                        <p className="text-xs text-rose-200">
                          Section resources could not be loaded. Please try
                          reopening the course.
                        </p>
                      ) : (
                        <p className="text-xs text-[#AFB2BF]">
                          No notes or assignment are available for this section.
                        </p>
                      ))}
                  </div>
                );
              })()}
            </div>
          )}
        </section>
      );
    });

  if (mobile) {
    return (
      <>
        <div className="border-b border-[#2C333F] bg-[#111827] px-3 py-3 text-[#F1F2FF]">
          <div className="flex min-w-0 items-center gap-3">
            <button
              type="button"
              onClick={() => navigate("/dashboard/enrolled-courses")}
              aria-label="Back to enrolled courses"
              className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-[#2C333F] text-white transition hover:bg-[#424854]"
            >
              <IoIosArrowBack size={22} />
            </button>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-bold">
                {courseEntireData?.courseName || "Your course"}
              </p>
              <p className="mt-0.5 truncate text-xs text-[#AFB2BF]">
                {currentLesson?.title || "Choose a lesson"}
              </p>
            </div>
            <button
              type="button"
              onClick={() => setCurriculumOpen(true)}
              className="inline-flex shrink-0 items-center gap-1.5 rounded-lg bg-amber-300 px-3 py-2.5 text-xs font-bold text-[#000814] transition hover:bg-amber-200"
            >
              <BookOpen size={15} />
              Lessons
            </button>
          </div>
          <div className="mt-3 flex items-center gap-3">
            <div
              className="h-1.5 flex-1 overflow-hidden rounded-full bg-[#2C333F]"
              role="progressbar"
              aria-label="Course progress"
              aria-valuenow={completion}
              aria-valuemin={0}
              aria-valuemax={100}
            >
              <div
                className="h-full rounded-full bg-emerald-400 transition-all"
                style={{ width: `${completion}%` }}
              />
            </div>
            <span className="shrink-0 text-[11px] font-medium text-[#AFB2BF]">
              {completedCount}/{totalNoOfLectures || 0} complete
            </span>
          </div>
        </div>

        {curriculumOpen && (
          <div
            className="fixed inset-0 z-[80] flex items-end bg-black/65 backdrop-blur-sm"
            role="presentation"
            onMouseDown={(event) => {
              if (event.target === event.currentTarget) {
                setCurriculumOpen(false);
              }
            }}
          >
            <section
              aria-label="Course lessons"
              className="max-h-[82dvh] w-full overflow-hidden rounded-t-3xl border border-[#2C333F] bg-[#161D29] shadow-2xl"
            >
              <div className="flex items-center justify-between border-b border-[#2C333F] px-4 pb-4 pt-3">
                <div className="min-w-0">
                  <p className="text-xs font-medium text-cyan-200">
                    COURSE CONTENT
                  </p>
                  <h2 className="mt-1 truncate text-base font-bold text-white">
                    {courseEntireData?.courseName}
                  </h2>
                  <p className="mt-1 text-xs text-[#AFB2BF]">
                    {completedCount} of {totalNoOfLectures || 0} lessons
                    complete
                  </p>
                </div>
                <div className="flex shrink-0 items-center gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      setCurriculumOpen(false);
                      setreview(true);
                    }}
                    className="rounded-lg border border-[#424854] px-3 py-2 text-xs font-semibold text-[#F1F2FF] transition hover:bg-white/5"
                  >
                    Add review
                  </button>
                  <button
                    type="button"
                    onClick={() => setCurriculumOpen(false)}
                    aria-label="Close course lessons"
                    className="grid h-9 w-9 place-items-center rounded-full bg-[#2C333F] text-white"
                  >
                    <X size={18} />
                  </button>
                </div>
              </div>
              <div className="max-h-[calc(82dvh-6.5rem)] overflow-y-auto pb-[env(safe-area-inset-bottom)]">
                {renderSections(true)}
              </div>
            </section>
          </div>
        )}
      </>
    );
  }

  return (
    <aside className="flex h-[calc(100vh_-_3.5rem)] w-70 shrink-0 flex-col border-r border-[#2C333F] bg-[#161D29]">
      <div className="mx-5 flex flex-col gap-3 border-b border-[#424854] py-5 text-lg font-bold text-[#DBDDEA]">
        <div className="flex w-full items-center justify-between">
          <button
            type="button"
            onClick={() => navigate("/dashboard/enrolled-courses")}
            aria-label="Back to enrolled courses"
            className="grid h-9 w-9 place-items-center rounded-full bg-[#AFB2BF] text-[#2C333F] transition hover:scale-95"
          >
            <IoIosArrowBack size={26} />
          </button>
          <IconBtn
            text="Add Review"
            onclick={() => setreview(true)}
            customClasses="px-4"
          />
        </div>
        <div className="min-w-0">
          <p className="line-clamp-2">{courseEntireData?.courseName}</p>
          <p className="mt-1 text-sm font-semibold text-[#AFB2BF]">
            {completedCount} / {totalNoOfLectures || 0} lessons · {completion}%
          </p>
          <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-[#2C333F]">
            <div
              className="h-full rounded-full bg-emerald-400"
              style={{ width: `${completion}%` }}
            />
          </div>
        </div>
      </div>
      <div className="min-h-0 flex-1 overflow-y-auto">{renderSections()}</div>
    </aside>
  );
};

export default VideoDetailsSideBar;
