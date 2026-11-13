import React, { useEffect, useState } from "react";
import { Link } from "react-router";
import { useSelector } from "react-redux";
import {
  BookOpen,
  GraduationCap,
  RotateCcw,
  UserRoundCheck,
  UserRoundX,
} from "lucide-react";
import { getInstructorData } from "../../../Services/operations/Profileapi";
import {
  cancelStudentEnrollment,
  fetchInstructorCourses,
  restoreStudentEnrollment,
} from "../../../Services/operations/Courseapi";
import InstructorChart from "./InstructorChart";

const Instructor = () => {
  const { token } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.profile);
  const [loading, setLoading] = useState(true);
  const [instructorData, setInstructorData] = useState([]);
  const [courses, setCourses] = useState([]);
  const [enrollmentToCancel, setEnrollmentToCancel] = useState(null);
  const [cancellationReason, setCancellationReason] = useState("");
  const [cancelling, setCancelling] = useState(false);
  const [restoringEnrollmentId, setRestoringEnrollmentId] = useState(null);

  useEffect(() => {
    let active = true;
    const loadDashboard = async () => {
      const [stats, instructorCourses] = await Promise.all([
        getInstructorData(token),
        fetchInstructorCourses(token),
      ]);
      if (active) {
        setInstructorData(stats || []);
        setCourses(instructorCourses || []);
        setLoading(false);
      }
    };
    loadDashboard();
    return () => {
      active = false;
    };
  }, [token]);

  const activeLearners = courses.reduce(
    (total, course) => total + (course.studentEnrolled?.length || 0),
    0,
  );
  const revokedEnrollments = courses.reduce(
    (total, course) =>
      total +
      (course.cancelledEnrollments?.filter((entry) => !entry.reinstatedAt)
        .length || 0),
    0,
  );
  const publishedCourses = courses.filter(
    (course) => course.status === "Published",
  ).length;

  const handleCancelEnrollment = async (event) => {
    event.preventDefault();
    if (!enrollmentToCancel || !cancellationReason.trim() || cancelling) return;

    setCancelling(true);
    const { course, student } = enrollmentToCancel;
    const cancelled = await cancelStudentEnrollment(
      {
        courseId: course._id,
        studentId: student._id,
        reason: cancellationReason.trim(),
      },
      token,
    );

    if (cancelled) {
      const [updatedCourses, updatedStats] = await Promise.all([
        fetchInstructorCourses(token),
        getInstructorData(token),
      ]);
      if (updatedCourses?.length) {
        setCourses(updatedCourses);
      } else {
        setCourses((currentCourses) =>
          currentCourses.map((currentCourse) =>
            currentCourse._id === course._id
              ? {
                  ...currentCourse,
                  studentEnrolled: currentCourse.studentEnrolled.filter(
                    (learner) => learner._id !== student._id,
                  ),
                  cancelledEnrollments: [
                    ...(currentCourse.cancelledEnrollments || []),
                    {
                      student,
                      cancelledAt: new Date().toISOString(),
                      reason: cancellationReason.trim(),
                    },
                  ],
                }
              : currentCourse,
          ),
        );
      }
      setInstructorData(updatedStats || []);
      setEnrollmentToCancel(null);
      setCancellationReason("");
    }
    setCancelling(false);
  };

  const closeCancellationDialog = () => {
    if (!cancelling) {
      setEnrollmentToCancel(null);
      setCancellationReason("");
    }
  };

  const handleRestoreEnrollment = async (course, entry) => {
    const student = entry.student;
    if (
      !student?._id ||
      restoringEnrollmentId ||
      !window.confirm(
        `Restore ${student.firstName}'s access to ${course.courseName}? Their saved progress will be kept.`,
      )
    ) {
      return;
    }

    const enrollmentId = entry._id || `${course._id}-${student._id}`;
    setRestoringEnrollmentId(enrollmentId);
    try {
      const restored = await restoreStudentEnrollment(
        { courseId: course._id, studentId: student._id },
        token,
      );
      if (!restored) return;

      const [updatedCourses, updatedStats] = await Promise.all([
        fetchInstructorCourses(token),
        getInstructorData(token),
      ]);
      setCourses(updatedCourses || []);
      setInstructorData(updatedStats || []);
    } finally {
      setRestoringEnrollmentId(null);
    }
  };

  const statCards = [
    {
      label: "Courses",
      value: courses.length,
      detail: `${publishedCourses} published`,
      icon: <BookOpen size={21} />,
      tone: "from-violet-500/20 to-violet-500/5 text-violet-300",
    },
    {
      label: "Active learners",
      value: activeLearners,
      detail: "Currently have course access",
      icon: <UserRoundCheck size={21} />,
      tone: "from-emerald-500/20 to-emerald-500/5 text-emerald-300",
    },
    {
      label: "Cancelled enrollments",
      value: revokedEnrollments,
      detail: "Enrollment history retained",
      icon: <UserRoundX size={21} />,
      tone: "from-rose-500/20 to-rose-500/5 text-rose-300",
    },
  ];

  return (
    <main className="space-y-5 pb-8 text-white sm:space-y-8">
      <header className="relative overflow-hidden rounded-xl border border-white/5 bg-gradient-to-br from-[#25204A] via-[#161D29] to-[#111827] p-4 sm:rounded-2xl sm:p-8">
        <div className="pointer-events-none absolute -right-10 -top-20 hidden h-56 w-56 rounded-full bg-violet-500/10 blur-3xl sm:block" />
        <div className="relative flex items-center justify-between gap-3 sm:items-end">
          <div>
            <p className="mb-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-violet-300 sm:mb-2 sm:text-sm sm:tracking-[0.2em]">
              Instructor studio
            </p>
            <h1 className="text-lg font-bold leading-tight text-white sm:text-3xl lg:text-4xl">
              Hi, {user?.firstName || "Instructor"}
            </h1>
            <p className="mt-2 hidden max-w-xl text-sm text-[#C5C7D4] sm:block sm:text-base">
              Track course activity and manage learner access, one enrollment
              at a time.
            </p>
          </div>
          <Link
            to="/dashboard/addcourse"
            aria-label="Create a course"
            className="inline-flex shrink-0 items-center gap-1.5 rounded-lg bg-[#FFD60A] px-3 py-2.5 text-xs font-bold text-[#000814] transition hover:bg-yellow-300 sm:gap-2 sm:px-4 sm:text-sm"
          >
            <BookOpen size={15} />
            <span className="sm:hidden">Create</span>
            <span className="hidden sm:inline">Create a course</span>
          </Link>
        </div>
      </header>

      {loading ? (
        <div className="grid min-h-60 place-items-center">
          <div className="spinner" />
        </div>
      ) : courses.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-[#3A4352] bg-[#111827] px-6 py-14 text-center">
          <GraduationCap className="mx-auto mb-4 text-violet-300" size={40} />
          <h2 className="text-xl font-semibold">Your instructor dashboard</h2>
          <p className="mx-auto mt-2 max-w-md text-sm text-[#999DAA]">
            Create your first course to see learner activity and course
            analytics here.
          </p>
          <Link
            to="/dashboard/addcourse"
            className="mt-6 inline-flex rounded-lg bg-[#FFD60A] px-4 py-2 font-semibold text-[#000814]"
          >
            Get started
          </Link>
        </div>
      ) : (
        <>
          <section className="grid grid-cols-3 gap-2 sm:grid-cols-2 sm:gap-4 xl:grid-cols-3">
            {statCards.map(({ label, value, detail, icon, tone }) => (
              <article
                key={label}
                className="min-w-0 rounded-xl border border-white/5 bg-[#111827] p-3 transition hover:-translate-y-0.5 hover:border-white/10 sm:rounded-2xl sm:p-5"
              >
                <div className="flex min-h-16 flex-col-reverse items-start justify-between gap-1 sm:min-h-0 sm:flex-row">
                  <div>
                    <p className="text-[10px] font-medium leading-tight text-[#999DAA] sm:text-sm">{label}</p>
                    <p className="mt-1 text-xl font-bold text-[#F1F2FF] sm:mt-2 sm:text-3xl">
                      {value}
                    </p>
                  </div>
                  <span className={`rounded-lg bg-gradient-to-br p-2 sm:rounded-xl sm:p-3 ${tone}`}>
                    {React.cloneElement(icon, { size: 17 })}
                  </span>
                </div>
                <p className="mt-2 hidden text-xs text-[#838894] sm:block sm:mt-4">{detail}</p>
              </article>
            ))}
          </section>

          <InstructorChart course={instructorData} />

          <section className="space-y-4">
            <div className="flex flex-wrap items-end justify-between gap-3">
              <div>
                <h2 className="text-xl font-bold text-[#F1F2FF]">
                  Learners by course
                </h2>
                <p className="mt-1 hidden text-sm text-[#999DAA] sm:block">
                  Revoke access for an individual learner without affecting
                  anyone else.
                </p>
              </div>
              <Link
                to="/dashboard/my-courses"
                className="text-sm font-semibold text-[#FFD60A] hover:text-yellow-200"
              >
                Manage courses
              </Link>
            </div>

            {courses.map((course) => {
              const cancelledEnrollments =
                course.cancelledEnrollments?.filter(
                  (entry) => entry.student,
                ) || [];
              const currentlyCancelled = cancelledEnrollments.filter(
                (entry) => !entry.reinstatedAt,
              );
              return (
                <article
                  key={course._id}
                  className="overflow-hidden rounded-2xl border border-white/5 bg-[#111827]"
                >
                  <div className="flex flex-row items-center gap-3 border-b border-[#2C333F] p-3 sm:gap-4 sm:p-5">
                    <img
                      src={course.thumbnail}
                      alt=""
                      className="h-12 w-18 shrink-0 rounded-lg object-cover sm:h-16 sm:w-24"
                    />
                    <div className="min-w-0 flex-1">
                      <h3 className="truncate font-semibold text-[#F1F2FF]">
                        {course.courseName}
                      </h3>
                      <div className="mt-2 flex flex-wrap items-center gap-2 text-xs">
                        <span className="rounded-full bg-emerald-400/10 px-2.5 py-1 font-medium text-emerald-300">
                          {course.studentEnrolled?.length || 0} active
                        </span>
                        <span className="rounded-full bg-rose-400/10 px-2.5 py-1 font-medium text-rose-300">
                          {currentlyCancelled.length} cancelled
                        </span>
                        <span className="rounded-full bg-[#2C333F] px-2.5 py-1 text-[#C5C7D4]">
                          {course.status}
                        </span>
                      </div>
                    </div>
                  </div>

                  {course.studentEnrolled?.length ? (
                    <>
                      <div className="hidden overflow-x-auto md:block">
                        <table className="w-full min-w-[680px] text-left text-sm">
                          <thead className="bg-white/[0.02] text-xs uppercase tracking-wide text-[#838894]">
                            <tr>
                              <th className="px-5 py-3 font-medium">Learner</th>
                              <th className="px-5 py-3 font-medium">Email</th>
                              <th className="px-5 py-3 text-right font-medium">
                                Access
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            {course.studentEnrolled
                              .filter(Boolean)
                              .map((student) => (
                                <tr
                                  className="border-t border-[#2C333F] transition hover:bg-white/[0.02]"
                                  key={student._id}
                                >
                                  <td className="px-5 py-3.5">
                                    <div className="flex items-center gap-3">
                                      <img
                                        src={
                                          student.image ||
                                          `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(
                                            `${student.firstName} ${student.lastName}`,
                                          )}`
                                        }
                                        alt=""
                                        className="h-9 w-9 rounded-full object-cover"
                                      />
                                      <span className="font-medium text-[#F1F2FF]">
                                        {student.firstName} {student.lastName}
                                      </span>
                                    </div>
                                  </td>
                                  <td className="px-5 py-3.5 text-[#C5C7D4]">
                                    {student.email}
                                  </td>
                                  <td className="px-5 py-3.5 text-right">
                                    <button
                                      type="button"
                                      onClick={() =>
                                        setEnrollmentToCancel({ course, student })
                                      }
                                      className="rounded-lg border border-rose-400/30 px-3 py-1.5 text-xs font-semibold text-rose-300 transition hover:border-rose-300 hover:bg-rose-400/10"
                                    >
                                      Cancel enrollment
                                    </button>
                                  </td>
                                </tr>
                              ))}
                          </tbody>
                        </table>
                      </div>
                      <div className="divide-y divide-[#2C333F] md:hidden">
                        {course.studentEnrolled
                          .filter(Boolean)
                          .map((student) => (
                            <div
                              key={student._id}
                              className="flex min-w-0 items-center gap-3 p-3"
                            >
                              <img
                                src={
                                  student.image ||
                                  `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(
                                    `${student.firstName} ${student.lastName}`,
                                  )}`
                                }
                                alt=""
                                className="h-10 w-10 shrink-0 rounded-full object-cover"
                              />
                              <div className="min-w-0 flex-1">
                                <p className="truncate text-sm font-medium text-[#F1F2FF]">
                                  {student.firstName} {student.lastName}
                                </p>
                                <p className="truncate text-xs text-[#999DAA]">
                                  {student.email}
                                </p>
                              </div>
                              <button
                                type="button"
                                onClick={() =>
                                  setEnrollmentToCancel({ course, student })
                                }
                                className="shrink-0 rounded-lg border border-rose-400/30 px-2 py-2 text-[11px] font-semibold text-rose-300 transition hover:border-rose-300 hover:bg-rose-400/10"
                              >
                                Revoke
                              </button>
                            </div>
                          ))}
                      </div>
                    </>
                  ) : (
                    <p className="px-5 py-6 text-sm text-[#999DAA]">
                      No active learners in this course.
                    </p>
                  )}

                  {cancelledEnrollments.length > 0 && (
                    <details className="border-t border-[#2C333F]">
                      <summary className="cursor-pointer px-5 py-4 text-sm font-medium text-[#C5C7D4] hover:text-white">
                        Enrollment history ({cancelledEnrollments.length})
                      </summary>
                      <div className="space-y-3 px-5 pb-5">
                        {cancelledEnrollments.map((entry) => (
                          <div
                            className="flex flex-col gap-2 rounded-xl bg-[#0B1220] p-4 text-sm sm:flex-row sm:items-start sm:justify-between"
                            key={entry._id || `${course._id}-${entry.student._id}`}
                          >
                            <div>
                              <p className="font-medium text-[#F1F2FF]">
                                {entry.student.firstName}{" "}
                                {entry.student.lastName}
                                <span className="ml-2 text-xs font-normal text-[#999DAA]">
                                  {entry.student.email}
                                </span>
                              </p>
                              <p className="mt-1 text-xs text-[#999DAA]">
                                {entry.reason}
                              </p>
                            </div>
                            <div className="shrink-0 text-xs text-[#838894]">
                              {!entry.reinstatedAt ? (
                                <span className="mb-2 block font-semibold text-rose-300">
                                  Access cancelled
                                </span>
                              ) : (
                                <span className="mb-2 block font-semibold text-emerald-300">
                                  Access restored
                                </span>
                              )}
                              <time>
                                {entry.cancelledAt
                                  ? new Date(entry.cancelledAt).toLocaleDateString()
                                  : ""}
                              </time>
                              {!entry.reinstatedAt && course.status === "Published" && (
                                <button
                                  type="button"
                                  disabled={Boolean(restoringEnrollmentId)}
                                  onClick={() =>
                                    handleRestoreEnrollment(course, entry)
                                  }
                                  className="mt-2 inline-flex items-center gap-1.5 rounded-lg border border-emerald-400/30 px-3 py-1.5 font-semibold text-emerald-200 transition hover:bg-emerald-400/10 disabled:opacity-50"
                                >
                                  <RotateCcw size={14} />
                                  {restoringEnrollmentId ===
                                  (entry._id ||
                                    `${course._id}-${entry.student._id}`)
                                    ? "Restoring..."
                                    : "Restore access"}
                                </button>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </details>
                  )}
                </article>
              );
            })}
          </section>
        </>
      )}

      {enrollmentToCancel && (
        <div
          className="fixed inset-0 z-[1000] grid place-items-center bg-black/70 p-4 backdrop-blur-sm"
          role="presentation"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) closeCancellationDialog();
          }}
        >
          <form
            onSubmit={handleCancelEnrollment}
            className="w-full max-w-lg rounded-2xl border border-[#3A4352] bg-[#161D29] p-6 shadow-2xl"
            role="dialog"
            aria-modal="true"
            aria-labelledby="revoke-access-heading"
          >
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-rose-300">
              Learner subscription
            </p>
            <h2
              id="revoke-access-heading"
              className="mt-2 text-xl font-semibold text-[#F1F2FF]"
            >
              Cancel enrollment for {enrollmentToCancel.student.firstName}?
            </h2>
            <p className="mt-3 text-sm leading-6 text-[#C5C7D4]">
              This only affects{" "}
              <span className="font-semibold text-white">
                {enrollmentToCancel.student.email}
              </span>{" "}
              in <span className="font-semibold text-white">{enrollmentToCancel.course.courseName}</span>.
              Other learners keep access, and this action is recorded in both
              dashboards. Any refund must be handled separately through eTech
              support.
            </p>
            <label
              htmlFor="cancellation-reason"
              className="mt-5 block text-sm font-medium text-[#F1F2FF]"
            >
              Reason for cancellation
            </label>
            <textarea
              id="cancellation-reason"
              value={cancellationReason}
              onChange={(event) => setCancellationReason(event.target.value)}
              maxLength={500}
              required
              rows={3}
              placeholder="Explain why this learner's enrollment is being cancelled"
              className="mt-2 w-full resize-y rounded-lg border border-[#3A4352] bg-[#0B1220] p-3 text-sm text-white outline-none transition placeholder:text-[#687080] focus:border-violet-400"
            />
            <p className="mt-1 text-right text-xs text-[#838894]">
              {cancellationReason.length}/500
            </p>
            <div className="mt-5 flex justify-end gap-3">
              <button
                type="button"
                disabled={cancelling}
                onClick={closeCancellationDialog}
                className="rounded-lg bg-[#2C333F] px-4 py-2 text-sm font-semibold text-[#F1F2FF] disabled:opacity-50"
              >
                Keep access
              </button>
              <button
                type="submit"
                disabled={cancelling || !cancellationReason.trim()}
                className="rounded-lg bg-[#A83D52] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#C34D63] disabled:cursor-not-allowed disabled:opacity-50"
              >
                {cancelling ? "Cancelling..." : "Confirm cancellation"}
              </button>
            </div>
          </form>
        </div>
      )}
    </main>
  );
};

export default Instructor;
