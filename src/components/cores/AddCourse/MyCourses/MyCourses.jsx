import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";
import { BookOpen, Plus, Search, Users } from "lucide-react";
import { fetchInstructorCourses } from "../../../../Services/operations/Courseapi";
import CourseTable from "./CourseTable";

const MyCourses = () => {
  const navigate = useNavigate();
  const { token } = useSelector((state) => state.auth);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All courses");

  useEffect(() => {
    let active = true;
    const loadCourses = async () => {
      setLoading(true);
      const result = await fetchInstructorCourses(token);
      if (active) {
        setCourses(result || []);
        setLoading(false);
      }
    };
    loadCourses();
    return () => {
      active = false;
    };
  }, [token]);

  const publishedCount = courses.filter(
    (course) => course.status === "Published",
  ).length;
  const activeLearners = courses.reduce(
    (total, course) => total + (course.studentEnrolled?.length || 0),
    0,
  );
  const filteredCourses = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    return courses.filter((course) => {
      const matchesQuery =
        !normalizedQuery ||
        course.courseName?.toLowerCase().includes(normalizedQuery) ||
        course.courseDescription?.toLowerCase().includes(normalizedQuery);
      const matchesStatus =
        statusFilter === "All courses" ||
        (statusFilter === "Published" && course.status === "Published") ||
        (statusFilter === "Drafts" && course.status !== "Published");
      return matchesQuery && matchesStatus;
    });
  }, [courses, query, statusFilter]);

  return (
    <main className="space-y-6 pb-8 text-white sm:space-y-8">
      <header className="relative overflow-hidden rounded-2xl border border-white/5 bg-gradient-to-br from-[#25204A] via-[#161D29] to-[#111827] p-5 sm:p-8">
        <div className="pointer-events-none absolute -right-10 -top-20 h-56 w-56 rounded-full bg-violet-500/10 blur-3xl" />
        <div className="relative flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-violet-300">
              Instructor studio
            </p>
            <h1 className="mt-2 text-3xl font-bold sm:text-4xl">My courses</h1>
            <p className="mt-2 max-w-xl text-sm leading-6 text-[#C5C7D4]">
              Manage your content, track enrollment, and keep every course
              moving forward.
            </p>
          </div>
          <button
            type="button"
            onClick={() => navigate("/dashboard/addcourse")}
            className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#FFD60A] px-4 py-3 text-sm font-bold text-[#000814] transition hover:bg-yellow-300 sm:w-auto"
          >
            <Plus size={18} />
            Create course
          </button>
        </div>
      </header>

      <section className="grid gap-3 sm:grid-cols-3 sm:gap-4">
        {[
          { label: "Total courses", value: courses.length, icon: BookOpen },
          { label: "Published", value: publishedCount, icon: BookOpen },
          { label: "Active learners", value: activeLearners, icon: Users },
        ].map(({ label, value, icon: Icon }) => (
          <article
            key={label}
            className="flex items-center justify-between rounded-2xl border border-[#2C333F] bg-[#161D29] p-4 sm:p-5"
          >
            <div>
              <p className="text-sm text-[#999DAA]">{label}</p>
              <p className="mt-1 text-2xl font-bold text-white">{value}</p>
            </div>
            <span className="rounded-xl bg-violet-400/10 p-3 text-violet-300">
              {React.createElement(Icon, { size: 20 })}
            </span>
          </article>
        ))}
      </section>

      <section className="space-y-4">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-xl font-bold">Course library</h2>
            <p className="mt-1 text-sm text-[#999DAA]">
              {filteredCourses.length}{" "}
              {filteredCourses.length === 1 ? "course" : "courses"}
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
                placeholder="Search courses"
                className="w-full rounded-xl border border-[#2C333F] bg-[#111827] py-2.5 pl-10 pr-3 text-sm text-white outline-none transition placeholder:text-[#838894] focus:border-violet-400"
              />
            </label>
            <select
              value={statusFilter}
              onChange={(event) => setStatusFilter(event.target.value)}
              aria-label="Filter courses by status"
              className="rounded-xl border border-[#2C333F] bg-[#111827] px-3 py-2.5 text-sm text-white outline-none focus:border-violet-400"
            >
              <option>All courses</option>
              <option>Published</option>
              <option>Drafts</option>
            </select>
          </div>
        </div>

        {loading ? (
          <div className="grid min-h-56 place-items-center rounded-2xl border border-[#2C333F] bg-[#111827]">
            <div className="spinner" />
          </div>
        ) : courses.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-[#3A4352] bg-[#111827] px-6 py-14 text-center">
            <BookOpen className="mx-auto mb-4 text-violet-300" size={38} />
            <h3 className="text-lg font-semibold">Start your course library</h3>
            <p className="mx-auto mt-2 max-w-md text-sm text-[#999DAA]">
              Create your first course and organize your lessons from one place.
            </p>
            <button
              type="button"
              onClick={() => navigate("/dashboard/addcourse")}
              className="mt-5 rounded-xl bg-[#FFD60A] px-4 py-2.5 font-bold text-[#000814]"
            >
              Create your first course
            </button>
          </div>
        ) : (
          <CourseTable courses={filteredCourses} setCourses={setCourses} />
        )}
      </section>
    </main>
  );
};

export default MyCourses;
