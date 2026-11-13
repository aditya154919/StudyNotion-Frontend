import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import Section from "../Section";
import { getInstructorCourseForEdit } from "../../../../Services/operations/Courseapi";
import {
  setCourse,
  seteditCourse,
  setStep,
} from "../../../../slices/Courseslice";

const Edit = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { token } = useSelector((state) => state.auth);
  const { course } = useSelector((state) => state.course);
  const { courseId } = useParams();
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState({ courseId: "", message: "" });
  const hasCurrentError =
    loadError.courseId === courseId && Boolean(loadError.message);
  const isLoading =
    loading || (!hasCurrentError && course?._id !== courseId);

  useEffect(() => {
    let active = true;
    dispatch(setCourse(null));
    dispatch(seteditCourse(true));
    dispatch(setStep(1));

    const loadCourse = async () => {
      const result = await getInstructorCourseForEdit(courseId, token);
      if (!active) return;
      if (result?._id === courseId) {
        dispatch(setCourse(result));
        setLoadError({ courseId: "", message: "" });
      } else {
        setLoadError({
          courseId,
          message: "This course could not be found or loaded.",
        });
      }
      setLoading(false);
    };

    loadCourse().catch((error) => {
      console.error("Could not load course for editing:", error);
      if (active) {
        setLoadError({
          courseId,
          message: "Could not load this course. Please try again.",
        });
        setLoading(false);
      }
    });

    return () => {
      active = false;
    };
  }, [courseId, token, dispatch]);

  if (isLoading) {
    return (
      <div className="grid min-h-[50vh] place-items-center px-4 text-gray-300">
        <div className="flex flex-col items-center gap-4">
          <div className="spinner" />
          <p>Loading your course editor...</p>
        </div>
      </div>
    );
  }

  return (
    <main className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <header className="mb-7">
        <button
          type="button"
          onClick={() => navigate("/dashboard/my-courses")}
          className="mb-5 inline-flex items-center gap-2 rounded-lg border border-[#424854] px-3 py-2 text-sm font-medium text-gray-300 transition hover:border-amber-400 hover:text-white"
        >
          <span aria-hidden="true">←</span> Back to my courses
        </button>
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-amber-300">
          Instructor workspace
        </p>
        <h1 className="mt-2 text-3xl font-bold text-white sm:text-4xl">
          Edit course
        </h1>
        <p className="mt-2 text-sm text-gray-400">
          Update course details, lessons, and publishing settings.
        </p>
      </header>
      {hasCurrentError ? (
        <section className="rounded-2xl border border-red-400/30 bg-red-950/20 p-6 text-center">
          <p className="text-red-200">{loadError.message}</p>
          <button
            type="button"
            onClick={() => navigate("/dashboard/my-courses")}
            className="mt-4 rounded-lg bg-amber-300 px-4 py-2 font-semibold text-gray-950"
          >
            Return to my courses
          </button>
        </section>
      ) : course?._id === courseId ? (
        <Section />
      ) : (
        <div className="rounded-2xl border border-[#2C333F] bg-[#161D29] p-6 text-center text-gray-300">
          Course data is not available.
        </div>
      )}
    </main>
  );
};

export default Edit;
