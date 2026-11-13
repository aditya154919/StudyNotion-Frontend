import React, { useState } from "react";
import { BookOpen, Check, Clock3, Edit3, Trash2, Users } from "lucide-react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { formatDate } from "../../../../utils/formateData";
import { COURSE_STATUS } from "../../../../utils/constant";
import {
  deleteCourse,
  fetchInstructorCourses,
} from "../../../../Services/operations/Courseapi";
import ConfirmationModal from "../../../../Common/ConfirmationModal";

const CourseTable = ({ courses, setCourses }) => {
  const navigate = useNavigate();
  const { token } = useSelector((state) => state.auth);
  const [loadingCourseId, setLoadingCourseId] = useState(null);
  const [confirmationModal, setConfirmationModal] = useState(null);

  const handleDeleteCourse = async (courseId) => {
    setConfirmationModal(null);
    setLoadingCourseId(courseId);
    try {
      const deleted = await deleteCourse({ courseId }, token);
      if (deleted) {
        const updatedCourses = await fetchInstructorCourses(token);
        setCourses(updatedCourses || []);
      }
    } finally {
      setConfirmationModal(null);
      setLoadingCourseId(null);
    }
  };

  if (!courses?.length) {
    return (
      <div className="rounded-2xl border border-[#2C333F] bg-[#111827] px-5 py-12 text-center">
        <p className="font-semibold text-white">No courses match your filters</p>
        <p className="mt-1 text-sm text-[#999DAA]">
          Try another search or choose a different course status.
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
        {courses.map((course) => {
          const sectionCount = course.courseContent?.length || 0;
          const lessonCount =
            course.courseContent?.reduce(
              (total, section) => total + (section.subSection?.length || 0),
              0,
            ) || 0;
          const learnerCount = course.studentEnrolled?.length || 0;
          const isPublished = course.status === COURSE_STATUS.PUBLISHED;
          const isLoading = loadingCourseId === course._id;

          return (
            <article
              key={course._id}
              className="group min-w-0 overflow-hidden rounded-2xl border border-[#2C333F] bg-[#161D29] transition duration-200 hover:-translate-y-0.5 hover:border-violet-400/40 hover:shadow-xl hover:shadow-black/20"
            >
              <div className="relative aspect-[16/6] overflow-hidden bg-[#0b111b]">
                <img
                  src={course.thumbnail}
                  alt={course.courseName || "Course thumbnail"}
                  loading="lazy"
                  className="h-full w-full object-cover transition duration-300 group-hover:scale-[1.03]"
                />
                <span
                  className={`absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-semibold backdrop-blur ${
                    isPublished
                      ? "border-emerald-300/20 bg-emerald-950/75 text-emerald-200"
                      : "border-amber-300/20 bg-amber-950/75 text-amber-200"
                  }`}
                >
                  {isPublished ? <Check size={13} /> : <Clock3 size={13} />}
                  {isPublished ? "Published" : "Draft"}
                </span>
              </div>

              <div className="space-y-3 p-3 sm:p-4">
                <div className="min-w-0">
                  <h3 className="truncate text-base font-bold text-white sm:text-lg">
                    {course.courseName || "Untitled course"}
                  </h3>
                  <p className="mt-1 line-clamp-2 min-h-9 text-xs leading-[1.125rem] text-[#999DAA] sm:text-sm">
                    {course.courseDescription || "No course description yet."}
                  </p>
                </div>

                <div className="flex flex-wrap gap-x-3 gap-y-1.5 border-y border-[#2C333F] py-2.5 text-[11px] text-[#C5C7D4] sm:text-xs">
                  <span className="inline-flex items-center gap-1.5">
                    <BookOpen size={15} className="text-violet-300" />
                    {sectionCount} {sectionCount === 1 ? "section" : "sections"}
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <Clock3 size={15} className="text-sky-300" />
                    {lessonCount} {lessonCount === 1 ? "lesson" : "lessons"}
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <Users size={15} className="text-emerald-300" />
                    {learnerCount} {learnerCount === 1 ? "learner" : "learners"}
                  </span>
                </div>

                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <p className="text-xs text-[#838894]">
                    Updated{" "}
                    {course.updatedAt || course.createdAt
                      ? formatDate(course.updatedAt || course.createdAt)
                      : "recently"}
                  </p>
                  <p className="text-sm font-bold text-white">
                    {Number(course.price) === 0
                      ? "Free"
                      : `₹${Number(course.price).toLocaleString("en-IN")}`}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    disabled={Boolean(loadingCourseId)}
                    onClick={() =>
                      navigate(`/dashboard/edit-course/${course._id}`)
                    }
                    className="inline-flex items-center justify-center gap-1.5 rounded-lg border border-[#424854] px-2.5 py-2 text-xs font-semibold text-gray-200 transition hover:border-violet-300/60 hover:bg-violet-400/10 disabled:opacity-50 sm:gap-2 sm:text-sm"
                  >
                    <Edit3 size={16} />
                    Edit course
                  </button>
                  <button
                    type="button"
                    disabled={Boolean(loadingCourseId)}
                    onClick={() =>
                      setConfirmationModal({
                        text1: "Delete this course?",
                        text2:
                          `This permanently deletes the course, sections, and lessons. All ${learnerCount} enrolled learner(s) will immediately lose access, and the course will be removed from their dashboards. This cannot be undone.`,
                        btn1Text: isLoading ? "Deleting..." : "Delete course",
                        btn2Text: "Keep course",
                        btn1Handler: () => handleDeleteCourse(course._id),
                        btn2Handler: () => setConfirmationModal(null),
                      })
                    }
                    title="Permanently delete course and remove learner access"
                    className="inline-flex items-center justify-center gap-1.5 rounded-lg border border-rose-400/20 px-2.5 py-2 text-xs font-semibold text-rose-200 transition hover:border-rose-300/50 hover:bg-rose-400/10 disabled:cursor-not-allowed disabled:opacity-40 sm:gap-2 sm:text-sm"
                  >
                    <Trash2 size={16} />
                    Delete
                  </button>
                </div>
              </div>
            </article>
          );
        })}
      </div>
      {confirmationModal && (
        <ConfirmationModal modelData={confirmationModal} />
      )}
    </>
  );
};

export default CourseTable;
