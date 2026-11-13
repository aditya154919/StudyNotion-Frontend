import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router";
import {
  ArrowLeft,
  BookOpen,
  CalendarDays,
  Globe2,
  GraduationCap,
  Star,
  UsersRound,
} from "lucide-react";
import { buyCourse } from "../Services/operations/paymentApi";
import { getFullCourseDetailse } from "../Services/operations/Courseapi";
import getAvgRating from "../utils/getRatingAvg";
import Rating from "../Common/Rating";
import { formatDate } from "../utils/formateData";
import CourseDetailsCard from "../Common/CourseDetailsCard";
import Footer from "../components/cores/HomePage/Footer";
import ConfirmationModal from "../Common/ConfirmationModal";

const CourseDetils = () => {
  const { courseId } = useParams();
  const { token } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.profile);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [confirmationModal, setConfirmationModal] = useState(null);
  const [courseData, setCourseData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;
    const loadCourse = async () => {
      setLoading(true);
      setError("");
      setCourseData(null);
      try {
        const details = await getFullCourseDetailse(courseId, token, dispatch);
        if (!details) {
          throw new Error("Course details are unavailable right now.");
        }
        if (active) setCourseData(details);
      } catch (requestError) {
        console.error("Could not load course details:", requestError);
        if (active) {
          setError(
            requestError.response?.data?.message ||
              requestError.message ||
              "Could not load this course.",
          );
        }
      } finally {
        if (active) setLoading(false);
      }
    };

    loadCourse();
    return () => {
      active = false;
    };
  }, [courseId, token, dispatch]);

  const reviews = courseData?.ratingAndReview || [];
  const averageRating = Number(getAvgRating(reviews)) || 0;
  const instructor = courseData?.instructor || {};
  const instructorName =
    [instructor.firstName, instructor.lastName].filter(Boolean).join(" ") ||
    "eTech Instructor";
  const studentCount = courseData?.studentEnrolled?.length || 0;
  const learningPoints = useMemo(
    () =>
      (courseData?.whatYouWillLearn || "")
        .split(/\r?\n/)
        .map((point) => point.trim())
        .filter(Boolean),
    [courseData?.whatYouWillLearn],
  );

  const handleBuyCourse = () => {
    if (!token) {
      setConfirmationModal({
        text1: "Sign in to enroll",
        text2: "Log in or create an account to continue to secure checkout.",
        btn1Text: "Login",
        btn2Text: "Cancel",
        btn1Handler: () => navigate("/login"),
        btn2Handler: () => setConfirmationModal(null),
      });
      return;
    }
    if (!user) {
      setConfirmationModal({
        text1: "Account details unavailable",
        text2: "Please sign in again before continuing to checkout.",
        btn1Text: "Login",
        btn2Text: "Cancel",
        btn1Handler: () => navigate("/login"),
        btn2Handler: () => setConfirmationModal(null),
      });
      return;
    }
    if (user.accountType === "Instructor") return;
    buyCourse(token, [courseId], user, navigate, dispatch);
  };

  if (loading) {
    return (
      <main className="grid min-h-[65vh] place-items-center px-4">
        <div className="flex flex-col items-center gap-4 text-[#AFB2BF]">
          <div className="spinner" />
          <p>Loading course details...</p>
        </div>
      </main>
    );
  }

  if (error || !courseData) {
    return (
      <>
        <main className="grid min-h-[65vh] place-items-center px-4 py-12">
          <div className="w-full max-w-lg rounded-2xl border border-[#2C333F] bg-[#161D29] p-7 text-center">
            <BookOpen className="mx-auto mb-4 text-amber-200" size={34} />
            <h1 className="text-xl font-bold text-white">Course unavailable</h1>
            <p className="mt-2 text-sm leading-6 text-[#AFB2BF]">
              {error || "This course could not be found."}
            </p>
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="mt-6 inline-flex items-center gap-2 rounded-xl bg-amber-300 px-4 py-2.5 font-bold text-[#000814] transition hover:bg-amber-200"
            >
              <ArrowLeft size={16} />
              Go back
            </button>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <main className="min-h-screen bg-[#000814] text-white">
        <header className="relative overflow-hidden border-b border-white/5 bg-gradient-to-br from-[#25204A] via-[#161D29] to-[#000814]">
          <div className="pointer-events-none absolute -right-20 -top-32 h-96 w-96 rounded-full bg-violet-500/10 blur-3xl" />
          <div className="relative mx-auto max-w-7xl px-4 py-5 sm:px-6 sm:py-7 lg:px-8 lg:py-8">
            <nav
              aria-label="Breadcrumb"
              className="mb-4 flex items-center gap-2 text-xs text-[#AFB2BF] sm:text-sm"
            >
              <Link to="/" className="transition hover:text-white">
                Home
              </Link>
              <span aria-hidden="true">/</span>
              <span className="truncate text-white">Course details</span>
            </nav>
            <div className="max-w-4xl">
              <span className="inline-flex items-center gap-2 rounded-full border border-violet-300/20 bg-violet-300/10 px-3 py-1 text-xs font-semibold text-violet-200">
                <GraduationCap size={15} />
                Learn with eTech
              </span>
              <h1 className="mt-3 text-2xl font-bold tracking-tight sm:text-3xl lg:text-4xl">
                {courseData.courseName}
              </h1>
              <p className="mt-2 line-clamp-2 max-w-3xl text-sm leading-6 text-[#C5C7D4] sm:text-base">
                {courseData.courseDescription}
              </p>
              <div className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm">
                <span className="inline-flex items-center gap-2">
                  <Star size={16} className="fill-amber-300 text-amber-300" />
                  <strong className="text-amber-200">
                    {averageRating.toFixed(1)}
                  </strong>
                  <Rating Review_Count={averageRating} Star_Size={15} />
                  <span className="text-[#AFB2BF]">
                    ({reviews.length} {reviews.length === 1 ? "review" : "reviews"})
                  </span>
                </span>
                <span className="inline-flex items-center gap-2 text-[#C5C7D4]">
                  <UsersRound size={16} className="text-violet-200" />
                  {studentCount.toLocaleString("en-IN")} enrolled
                </span>
              </div>
              <div className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-[#AFB2BF] sm:text-sm">
                <p className="text-[#C5C7D4]">
                Created by{" "}
                <span className="font-semibold text-white">{instructorName}</span>
                </p>
                {courseData.createdAt && (
                  <span className="inline-flex items-center gap-2">
                    <CalendarDays size={15} />
                    Published {formatDate(courseData.createdAt)}
                  </span>
                )}
                <span className="inline-flex items-center gap-2">
                  <Globe2 size={15} />
                  English
                </span>
              </div>
            </div>
          </div>
        </header>

        <section className="mx-auto grid max-w-7xl grid-cols-1 items-start gap-7 px-4 py-8 sm:px-6 lg:grid-cols-[minmax(0,1fr)_360px] lg:gap-10 lg:px-8 lg:py-12">
          <aside className="order-1 lg:sticky lg:top-6 lg:order-2">
            <CourseDetailsCard
              course={courseData}
              setConfirmationModal={setConfirmationModal}
              handleBuyCourse={handleBuyCourse}
            />
          </aside>

          <article className="order-2 min-w-0 lg:order-1">
            <section className="rounded-2xl border border-[#2C333F] bg-[#161D29] p-5 sm:p-7">
              <h2 className="text-2xl font-bold">What you’ll learn</h2>
              {learningPoints.length > 1 ? (
                <ul className="mt-5 grid gap-3 sm:grid-cols-2">
                  {learningPoints.map((point, index) => (
                    <li
                      key={`${index}-${point}`}
                      className="flex items-start gap-3 text-sm leading-6 text-[#C5C7D4]"
                    >
                      <span className="mt-0.5 text-emerald-300">✓</span>
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="mt-4 whitespace-pre-line text-sm leading-7 text-[#C5C7D4]">
                  {courseData.whatYouWillLearn ||
                    "Explore the lessons and build practical skills at your own pace."}
                </p>
              )}
            </section>

            <section className="mt-6 rounded-2xl border border-[#2C333F] bg-[#161D29] p-5 sm:p-7">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-violet-300">
                Your instructor
              </p>
              <div className="mt-4 flex items-center gap-4">
                <img
                  src={
                    instructor.image ||
                    `https://api.dicebear.com/5.x/initials/svg?seed=${encodeURIComponent(instructorName)}`
                  }
                  alt={instructorName}
                  loading="lazy"
                  className="h-14 w-14 rounded-full border border-[#424854] object-cover"
                />
                <div>
                  <h2 className="font-bold text-white">{instructorName}</h2>
                  <p className="mt-1 text-sm text-[#AFB2BF]">Course instructor</p>
                </div>
              </div>
              {instructor.about && (
                <p className="mt-4 whitespace-pre-line text-sm leading-7 text-[#C5C7D4]">
                  {instructor.about}
                </p>
              )}
            </section>
          </article>
        </section>
      </main>
      <Footer />
      {confirmationModal && (
        <ConfirmationModal modelData={confirmationModal} />
      )}
    </>
  );
};

export default CourseDetils;
