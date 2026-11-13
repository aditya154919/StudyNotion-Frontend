import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import {
  ArrowUpRight,
  BadgeCheck,
  CalendarDays,
  GraduationCap,
  Mail,
  Pencil,
  Phone,
  ShieldCheck,
  Sparkles,
  UserRound,
} from "lucide-react";
import { ACCOUNT_TYPE } from "../../../utils/constant";

const formatDate = (date) => {
  if (!date) return null;
  const parsedDate = new Date(date);
  return Number.isNaN(parsedDate.getTime())
    ? date
    : parsedDate.toLocaleDateString(undefined, {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
};

const Myprofile = () => {
  const { user } = useSelector((state) => state.profile);
  const navigate = useNavigate();

  if (!user) {
    return (
      <div className="grid min-h-64 place-items-center rounded-2xl border border-[#2C333F] bg-[#111827] text-sm text-[#999DAA]">
        Profile details are unavailable. Please sign in again.
      </div>
    );
  }

  const isInstructor = user.accountType === ACCOUNT_TYPE.INSTRUCTOR;
  const fullName = [user.firstName, user.lastName].filter(Boolean).join(" ");
  const initials = [user.firstName, user.lastName]
    .filter(Boolean)
    .map((name) => name[0])
    .join("")
    .toUpperCase();
  const profileFields = [
    { label: "First name", value: user.firstName, icon: <UserRound size={17} /> },
    { label: "Last name", value: user.lastName, icon: <UserRound size={17} /> },
    { label: "Email address", value: user.email, icon: <Mail size={17} /> },
    {
      label: "Phone number",
      value: user.contactNumber,
      placeholder: "Add a phone number",
      icon: <Phone size={17} />,
    },
    {
      label: "Date of birth",
      value: formatDate(user.dateOfBirth),
      placeholder: "Add your date of birth",
      icon: <CalendarDays size={17} />,
    },
    {
      label: "Gender",
      value: user.gender,
      placeholder: "Add your gender",
      icon: <UserRound size={17} />,
    },
  ];
  const completedFields = [
    user.firstName,
    user.lastName,
    user.email,
    user.contactNumber,
    user.dateOfBirth,
    user.gender,
    user.about,
    user.image,
  ].filter(Boolean).length;
  const profileCompletion = Math.round((completedFields / 8) * 100);

  return (
    <main className="space-y-6 pb-8 text-white">
      <header className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-sm font-medium text-violet-300">Your account</p>
          <h1 className="mt-1 text-3xl font-bold tracking-tight text-[#F1F2FF]">
            My profile
          </h1>
          <p className="mt-2 text-sm text-[#999DAA]">
            Your personal details and eTech account at a glance.
          </p>
        </div>
        <button
          type="button"
          onClick={() => navigate("/dashboard/settings")}
          className="inline-flex items-center gap-2 rounded-lg bg-[#FFD60A] px-4 py-2.5 text-sm font-bold text-[#000814] transition hover:bg-yellow-300"
        >
          <Pencil size={16} />
          Edit profile
        </button>
      </header>

      <section className="relative overflow-hidden rounded-2xl border border-white/5 bg-gradient-to-br from-[#25204A] via-[#161D29] to-[#111827] p-6 sm:p-8">
        <div className="pointer-events-none absolute -right-12 -top-20 h-64 w-64 rounded-full bg-violet-500/10 blur-3xl" />
        <div className="relative flex flex-col gap-6 sm:flex-row sm:items-center">
          <div className="relative mx-auto shrink-0 sm:mx-0">
            {user.image ? (
              <img
                src={user.image}
                alt={`${fullName}'s profile`}
                className="h-28 w-28 rounded-full border-4 border-white/10 object-cover shadow-xl sm:h-32 sm:w-32"
              />
            ) : (
              <div
                className="grid h-28 w-28 place-items-center rounded-full border-4 border-white/10 bg-gradient-to-br from-violet-500 to-indigo-600 text-3xl font-bold text-white shadow-xl sm:h-32 sm:w-32"
                aria-label={`${fullName} profile initials`}
              >
                {initials || "ET"}
              </div>
            )}
            <span className="absolute bottom-1 right-1 grid h-8 w-8 place-items-center rounded-full border-4 border-[#19182E] bg-emerald-400 text-[#071B14]">
              <BadgeCheck size={17} />
            </span>
          </div>

          <div className="min-w-0 flex-1 text-center sm:text-left">
            <div className="flex flex-wrap items-center justify-center gap-2 sm:justify-start">
              <span className="rounded-full border border-violet-300/20 bg-violet-300/10 px-3 py-1 text-xs font-semibold text-violet-200">
                {user.accountType || "Member"}
              </span>
              {user.isAccountVerified && (
                <span className="inline-flex items-center gap-1 rounded-full border border-emerald-300/20 bg-emerald-300/10 px-3 py-1 text-xs font-semibold text-emerald-200">
                  <ShieldCheck size={13} />
                  Verified account
                </span>
              )}
            </div>
            <h2 className="mt-3 break-words text-2xl font-bold text-white sm:text-3xl">
              {fullName || "eTech member"}
            </h2>
            <p className="mt-1 break-all text-sm text-[#C5C7D4]">
              {user.email}
            </p>
            <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-[#AEB4C2] sm:mx-0">
              {isInstructor
                ? "Your instructor profile is where learners get to know the person behind the lessons. Keep your details and introduction up to date."
                : "Your learning profile keeps your account details together, so you can focus on building skills and making progress."}
            </p>
          </div>

          <button
            type="button"
            onClick={() => navigate("/dashboard/settings")}
            className="inline-flex shrink-0 items-center justify-center gap-2 self-center rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-white/10 sm:self-auto"
          >
            Update details
            <ArrowUpRight size={16} />
          </button>
        </div>
      </section>

      <section className="grid gap-4 lg:grid-cols-[minmax(0,1.5fr)_minmax(260px,0.8fr)]">
        <article className="rounded-2xl border border-white/5 bg-[#111827] p-5 sm:p-6">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h2 className="text-lg font-semibold text-[#F1F2FF]">
                About me
              </h2>
              <p className="mt-1 text-sm text-[#838894]">
                {isInstructor
                  ? "A short introduction for your learning community."
                  : "A little context about you and your learning goals."}
              </p>
            </div>
            <Sparkles className="shrink-0 text-violet-300" size={20} />
          </div>
          <p className="mt-5 whitespace-pre-wrap text-sm leading-7 text-[#C5C7D4]">
            {user.about?.trim() ||
              (isInstructor
                ? "Add an introduction to tell learners about your expertise and teaching approach."
                : "Add a short introduction to personalize your learning profile.")}
          </p>
          {!user.about?.trim() && (
            <button
              type="button"
              onClick={() => navigate("/dashboard/settings")}
              className="mt-4 text-sm font-semibold text-violet-300 hover:text-violet-200"
            >
              Add your introduction
            </button>
          )}
        </article>

        <article className="rounded-2xl border border-white/5 bg-[#111827] p-5 sm:p-6">
          <div className="flex items-center justify-between gap-3">
            <div>
              <h2 className="text-lg font-semibold text-[#F1F2FF]">
                Profile strength
              </h2>
              <p className="mt-1 text-sm text-[#838894]">
                A complete profile helps you get more from eTech.
              </p>
            </div>
            <span className="text-xl font-bold text-violet-300">
              {profileCompletion}%
            </span>
          </div>
          <div
            className="mt-5 h-2 overflow-hidden rounded-full bg-[#2C333F]"
            role="progressbar"
            aria-label="Profile completeness"
            aria-valuenow={profileCompletion}
            aria-valuemin={0}
            aria-valuemax={100}
          >
            <div
              className="h-full rounded-full bg-gradient-to-r from-violet-500 to-indigo-400 transition-all"
              style={{ width: `${profileCompletion}%` }}
            />
          </div>
          <p className="mt-3 text-xs text-[#999DAA]">
            {completedFields} of 8 profile details completed
          </p>
          {profileCompletion < 100 && (
            <button
              type="button"
              onClick={() => navigate("/dashboard/settings")}
              className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-violet-300 hover:text-violet-200"
            >
              Complete your profile
              <ArrowUpRight size={15} />
            </button>
          )}
        </article>
      </section>

      <section className="rounded-2xl border border-white/5 bg-[#111827] p-5 sm:p-6">
        <div className="mb-5">
          <h2 className="text-lg font-semibold text-[#F1F2FF]">
            Personal details
          </h2>
          <p className="mt-1 text-sm text-[#838894]">
            Your account information is only used to personalize your eTech
            experience.
          </p>
        </div>
        <dl className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
          {profileFields.map(({ label, value, placeholder, icon }) => (
            <div
              className="flex min-w-0 items-start gap-3 rounded-xl border border-white/5 bg-[#0B1220] p-4"
              key={label}
            >
              <span className="rounded-lg bg-white/5 p-2 text-violet-300">
                {icon}
              </span>
              <div className="min-w-0">
                <dt className="text-xs font-medium text-[#838894]">{label}</dt>
                <dd className="mt-1 break-words text-sm font-medium text-[#E4E6ED]">
                  {value || (
                    <span className="font-normal text-[#687080]">
                      {placeholder || "Not provided"}
                    </span>
                  )}
                </dd>
              </div>
            </div>
          ))}
        </dl>
      </section>

      <section className="flex flex-col gap-4 rounded-2xl border border-white/5 bg-[#111827] p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
        <div className="flex items-start gap-3">
          <span className="rounded-xl bg-indigo-400/10 p-3 text-indigo-300">
            <GraduationCap size={21} />
          </span>
          <div>
            <h2 className="font-semibold text-[#F1F2FF]">
              {isInstructor ? "Instructor account" : "Student account"}
            </h2>
            <p className="mt-1 text-sm text-[#999DAA]">
              {isInstructor
                ? "Manage your teaching profile, courses, and learner community."
                : "Keep your details current and get the most from your learning journey."}
            </p>
          </div>
        </div>
        <button
          type="button"
          onClick={() => navigate("/dashboard/settings")}
          className="inline-flex w-fit shrink-0 items-center gap-2 rounded-lg border border-[#3A4352] px-4 py-2 text-sm font-semibold text-[#E4E6ED] transition hover:border-violet-300/50 hover:bg-white/5"
        >
          Account settings
          <ArrowUpRight size={15} />
        </button>
      </section>
    </main>
  );
};

export default Myprofile;
