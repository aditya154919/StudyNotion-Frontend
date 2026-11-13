import React, { useEffect, useMemo, useState } from "react";
import ProgressBar from "@ramonak/react-progress-bar";
import { Link, useNavigate } from "react-router";
import { BookOpen, CheckCircle2, Clock3, Play, Search } from "lucide-react";
import { getenrolledCourse } from "../Services/operations/Profileapi";
import { useSelector } from "react-redux";

const EnrolledCourses = () => {
  const { token } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.profile);
  const navigate = useNavigate();
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("All courses");

  useEffect(() => {
    let active = true;
    const loadEnrolledCourses = async () => {
      setLoading(true);
      try {
        const courses = await getenrolledCourse(token);
        if (active) setEnrolledCourses(courses || []);
      } finally {
        if (active) setLoading(false);
      }
    };
    loadEnrolledCourses();
    return () => {
      active = false;
    };
  }, [token]);

  const activeCourses = enrolledCourses.filter(
    (course) => course.enrollmentStatus !== "Cancelled",
  );
  const completedCourses = activeCourses.filter(
    (course) => Number(course.progressPercentage) >= 100,
  ).length;
  const inProgressCourses = activeCourses.filter(
    (course) =>
      Number(course.progressPercentage) > 0 &&
      Number(course.progressPercentage) < 100,
  ).length;

  const filteredCourses = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    return enrolledCourses.filter((course) => {
      const progress = Number(course.progressPercentage) || 0;
      const isCancelled = course.enrollmentStatus === "Cancelled";
      const matchesQuery =
        !normalizedQuery ||
        course.courseName?.toLowerCase().includes(normalizedQuery) ||
        course.courseDescription?.toLowerCase().includes(normalizedQuery);
      const matchesFilter =
        filter === "All courses" ||
        (filter === "In progress" &&
          !isCancelled &&
          progress > 0 &&
          progress < 100) ||
        (filter === "Not started" && !isCancelled && progress === 0) ||
        (filter === "Completed" && !isCancelled && progress >= 100) ||
        (filter === "Access ended" && isCancelled);
      return matchesQuery && matchesFilter;
    });
  }, [enrolledCourses, filter, query]);

  const openCourse = (course) => {
    const firstLesson = course.courseContent?.find(
      (section) => section.subSection?.length,
    );
    const subSection = firstLesson?.subSection?.[0];
    if (firstLesson && subSection) {
      navigate(
        `/viewCourse/${course._id}/section/${firstLesson._id}/subSection/${subSection._id}`,
      );
    }
  };

  return (
    <main className="flex flex-col gap-4 pb-8 text-white sm:gap-6">
      <header className="relative order-1 overflow-hidden rounded-xl border border-white/5 bg-gradient-to from-[#183C4A] via-[#161D29] to-[#111827] p-4 sm:rounded-2xl sm:p-8">
        <div className="pointer-events-none absolute -right-10 -top-20 hidden h-56 w-56 rounded-full bg-cyan-400/10 blur-3xl sm:block" />
        <div className="relative">
          <p className="hidden text-sm font-semibold uppercase tracking-[0.18em] text-cyan-200 sm:block">
            Learning space
          </p>
          <h1 className="text-xl font-bold sm:mt-2 sm:text-4xl">
            Hi, {user?.firstName || "there"}
          </h1>
          <p className="mt-1 text-xs text-cyan-100 sm:hidden">
            Pick up where you left off
          </p>
          <p className="mt-2 hidden max-w-xl text-sm leading-6 text-[#C5C7D4] sm:block">
            Pick up where you left off, track your progress, and revisit your
            completed courses.
          </p>
        </div>
      </header>

      <section className="order-3 grid grid-cols-2 gap-2 sm:order-2 sm:grid-cols-4 sm:gap-4">
        {[
          {
            label: "Enrolled",
            value: activeCourses.length,
            icon: BookOpen,
            color: "text-cyan-300 bg-cyan-300/10",
          },
          {
            label: "In progress",
            value: inProgressCourses,
            icon: Play,
            color: "text-violet-300 bg-violet-300/10",
          },
          {
            label: "Completed",
            value: completedCourses,
            icon: CheckCircle2,
            color: "text-emerald-300 bg-emerald-300/10",
          },
          {
            label: "Access ended",
            value: enrolledCourses.length - activeCourses.length,
            icon: Clock3,
            color: "text-rose-300 bg-rose-300/10",
          },
        ].map(({ label, value, icon: Icon, color }) => (
          <article
            key={label}
            className="rounded-xl border border-[#2C333F] bg-[#161D29] p-3 sm:rounded-2xl sm:p-5"
          >
            <span className={`inline-flex rounded-lg p-2 sm:rounded-xl sm:p-2.5 ${color}`}>
              {React.createElement(Icon, { size: 16 })}
            </span>
            <p className="mt-2 text-xl font-bold sm:mt-3 sm:text-2xl">{value}</p>
            <p className="mt-0.5 text-xs text-[#999DAA] sm:text-sm">{label}</p>
          </article>
        ))}
      </section>

      <section className="order-2 space-y-3 sm:order-3 sm:space-y-4">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="text-lg font-bold sm:text-xl">Continue learning</h2>
            <p className="mt-1 text-sm text-[#999DAA]">
              {filteredCourses.length}{" "}
              {filteredCourses.length === 1 ? "course" : "courses"} shown
            </p>
          </div>
          <div className="flex w-full flex-col gap-2 sm:w-auto sm:flex-row">
            <label className="relative block min-w-0 flex-1 sm:w-64">
              <Search
                size={17}
                className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[#838894]"
              />
              <input
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search your courses"
                className="w-full rounded-xl border border-[#2C333F] bg-[#111827] py-2.5 pl-10 pr-3 text-sm text-white outline-none transition placeholder:text-[#838894] focus:border-cyan-300"
              />
            </label>
            <select
              value={filter}
              onChange={(event) => setFilter(event.target.value)}
              aria-label="Filter enrolled courses"
              className="w-full rounded-xl border border-[#2C333F] bg-[#111827] px-3 py-2.5 text-sm text-white outline-none focus:border-cyan-300 sm:w-auto"
            >
              <option>All courses</option>
              <option>Not started</option>
              <option>In progress</option>
              <option>Completed</option>
              <option>Access ended</option>
            </select>
          </div>
        </div>

        {loading ? (
          <div className="grid min-h-56 place-items-center rounded-2xl border border-[#2C333F] bg-[#111827]">
            <div className="spinner" />
          </div>
        ) : enrolledCourses.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-[#3A4352] bg-[#111827] px-6 py-14 text-center">
            <BookOpen className="mx-auto mb-4 text-cyan-300" size={40} />
            <h3 className="text-lg font-semibold">Your learning journey starts here</h3>
            <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-[#999DAA]">
              Explore the course catalog and enroll in a course to see your
              progress here.
            </p>
            <Link
              to="/"
              className="mt-5 inline-flex rounded-xl bg-cyan-300 px-4 py-2.5 font-bold text-gray-950 transition hover:bg-cyan-200"
            >
              Explore courses
            </Link>
          </div>
        ) : filteredCourses.length === 0 ? (
          <div className="rounded-2xl border border-[#2C333F] bg-[#111827] px-5 py-12 text-center">
            <p className="font-semibold">No courses match your filters</p>
            <p className="mt-1 text-sm text-[#999DAA]">
              Try another search or choose a different progress status.
            </p>
          </div>
        ) : (
          <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
            {filteredCourses.map((course) => {
              const isCancelled = course.enrollmentStatus === "Cancelled";
              const progress = Math.max(
                0,
                Math.min(100, Number(course.progressPercentage) || 0),
              );
              const firstLesson = course.courseContent?.find(
                (section) => section.subSection?.length,
              );
              const canOpen = !isCancelled && Boolean(firstLesson);

              return (
                <article
                  key={course._id}
                  className="overflow-hidden rounded-2xl border border-[#2C333F] bg-[#161D29] transition hover:border-cyan-300/30 hover:shadow-xl hover:shadow-black/20"
                >
                  <div className="relative aspect-[16/6] overflow-hidden bg-[#0b111b]">
                    <img
                      src={course.thumbnail}
                      alt={course.courseName || "Course thumbnail"}
                      loading="lazy"
                      className={`h-full w-full object-cover ${
                        isCancelled ? "grayscale" : ""
                      }`}
                    />
                    <span
                      className={`absolute left-3 top-3 rounded-full border px-3 py-1 text-xs font-semibold backdrop-blur ${
                        isCancelled
                          ? "border-rose-300/20 bg-rose-950/80 text-rose-200"
                          : progress >= 100
                            ? "border-emerald-300/20 bg-emerald-950/80 text-emerald-200"
                            : "border-cyan-300/20 bg-cyan-950/80 text-cyan-100"
                      }`}
                    >
                      {isCancelled
                        ? "Access ended"
                        : progress >= 100
                          ? "Completed"
                          : progress > 0
                            ? "In progress"
                            : "Not started"}
                    </span>
                  </div>

                  <div className="space-y-3 p-3 sm:p-4">
                    <div className="min-w-0">
                      <h3 className="truncate text-base font-bold sm:text-lg">
                        {course.courseName}
                      </h3>
                      <p className="mt-1 line-clamp-2 min-h-9 text-xs leading-[1.125rem] text-[#999DAA] sm:text-sm">
                        {course.courseDescription || "Continue learning at your own pace."}
                      </p>
                    </div>

                    <div className="flex items-center justify-between gap-3 text-xs text-[#AFB2BF]">
                      <span>
                        {course.totalDuration || "Duration unavailable"}
                      </span>
                      {!isCancelled && (
                        <span className="font-semibold text-cyan-100">
                          {progress}% complete
                        </span>
                      )}
                    </div>

                    {!isCancelled ? (
                      <>
                        <ProgressBar
                          completed={progress}
                          height="6px"
                          isLabelVisible={false}
                          bgColor="#67e8f9"
                          baseBgColor="#2C333F"
                          borderRadius="999px"
                        />
                        <button
                          type="button"
                          disabled={!canOpen}
                          onClick={() => openCourse(course)}
                          className="mt-1 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-cyan-300 px-3 py-2.5 text-sm font-bold text-gray-950 transition hover:bg-cyan-200 disabled:cursor-not-allowed disabled:bg-[#424854] disabled:text-gray-400"
                        >
                          <Play size={16} />
                          {progress >= 100 ? "Review course" : "Continue learning"}
                        </button>
                        {!canOpen && (
                          <p className="text-center text-xs text-[#838894]">
                            Lessons are not available yet.
                          </p>
                        )}
                      </>
                    ) : (
                      <div className="rounded-lg border border-rose-300/15 bg-rose-400/5 p-2.5 text-xs text-[#C5C7D4]">
                        <p className="line-clamp-2">
                          Your access ended
                          {course.enrollmentCancelledAt
                            ? ` on ${new Date(course.enrollmentCancelledAt).toLocaleDateString()}`
                            : ""}
                          .
                        </p>
                        {course.enrollmentCancellationReason && (
                          <p className="mt-1 text-xs text-[#999DAA]">
                            {course.enrollmentCancellationReason}
                          </p>
                        )}
                        <Link
                          to="/contact"
                          className="mt-2 inline-flex text-xs font-semibold text-cyan-200 underline underline-offset-2"
                        >
                          Contact support about refund options
                        </Link>
                      </div>
                    )}
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </section>
    </main>
  );
};

export default EnrolledCourses;
