import React, { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router";
import { ArrowLeft, BookOpen, Sparkles } from "lucide-react";
import { tag } from "../Services/api";
import { apiConnector } from "../Services/apiconnector";
import { getTagCourses } from "../Services/operations/Courseapi";
import CourseSlider from "../components/cores/Catlog/CourseSlider";
import Footer from "../components/cores/HomePage/Footer";

const slugify = (value = "") => value.trim().toLowerCase().replace(/\s+/g, "-");

const Catalog = () => {
  const { catlogName = "" } = useParams();
  const [active, setActive] = useState("popular");
  const [catalogData, setCatalogData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let activeRequest = true;
    const loadCatalog = async () => {
      setLoading(true);
      setError("");
      setCatalogData(null);
      try {
        const tagResponse = await apiConnector({
          method: "GET",
          url: tag.TAG_API,
        });
        const tags = tagResponse.data?.data;
        if (!Array.isArray(tags)) {
          throw new Error("Course categories could not be loaded.");
        }

        const category = tags.find((item) => slugify(item.name) === catlogName);
        if (!category?._id) {
          throw new Error("We couldn't find this course category.");
        }

        const result = await getTagCourses(category._id);
        if (!result?.success || !result?.data?.selectedTagCourse) {
          throw new Error(result?.message || "Courses could not be loaded.");
        }
        if (activeRequest) setCatalogData(result.data);
      } catch (requestError) {
        console.error("Could not load catalog page:", requestError);
        if (activeRequest) {
          setError(
            requestError.response?.data?.message ||
              requestError.message ||
              "Something went wrong while loading this category.",
          );
        }
      } finally {
        if (activeRequest) setLoading(false);
      }
    };

    loadCatalog();
    return () => {
      activeRequest = false;
    };
  }, [catlogName]);

  const selectedCategory = catalogData?.selectedTagCourse;
  const featuredCourses = useMemo(() => {
    const courses = [...(selectedCategory?.course || [])];
    if (active === "new") {
      return courses.sort(
        (a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0),
      );
    }
    return courses.sort((a, b) => {
      const aStudents = a.studentEnrolled?.length || 0;
      const bStudents = b.studentEnrolled?.length || 0;
      if (aStudents !== bStudents) return bStudents - aStudents;
      const aRating = Number(a.ratingAndReview?.length || 0);
      const bRating = Number(b.ratingAndReview?.length || 0);
      return bRating - aRating;
    });
  }, [active, selectedCategory?.course]);

  if (loading) {
    return (
      <div className="grid min-h-[65vh] place-items-center">
        <div className="flex flex-col items-center gap-4 text-[#AFB2BF]">
          <div className="spinner" />
          <p>Finding courses for you...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <main className="grid min-h-[65vh] place-items-center px-4 py-12">
        <div className="w-full max-w-lg rounded-2xl border border-[#2C333F] bg-[#161D29] p-7 text-center">
          <BookOpen className="mx-auto mb-4 text-amber-200" size={34} />
          <h1 className="text-xl font-bold text-white">Category unavailable</h1>
          <p className="mt-2 text-sm leading-6 text-[#AFB2BF]">{error}</p>
          <Link
            to="/"
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-amber-300 px-4 py-2.5 font-bold text-[#000814] transition hover:bg-amber-200"
          >
            <ArrowLeft size={16} />
            Back to home
          </Link>
        </div>
      </main>
    );
  }

  const relatedCategory = catalogData?.differentCourses;

  return (
    <>
      <main className="min-h-screen text-white">
        <header className="relative overflow-hidden border-b border-white/5 bg-gradient-to-br from-[#25204A] via-[#161D29] to-[#000814]">
          <div className="pointer-events-none absolute -right-20 -top-32 h-96 w-96 rounded-full bg-violet-500/10 blur-3xl" />
          <div className="relative mx-auto max-w-7xl px-4 py-6 sm:px-6 sm:py-8 lg:px-8 lg:py-9">
            <nav
              aria-label="Breadcrumb"
              className="mb-4 flex flex-wrap items-center gap-2 text-xs text-[#AFB2BF] sm:text-sm"
            >
              <Link to="/" className="transition hover:text-white">
                Home
              </Link>
              <span aria-hidden="true">/</span>
              <span>Catalog</span>
              <span aria-hidden="true">/</span>
              <span className="font-medium text-amber-200">
                {selectedCategory?.name}
              </span>
            </nav>
            <div className="max-w-3xl">
              <span className="inline-flex items-center gap-2 rounded-full border border-violet-300/20 bg-violet-300/10 px-3 py-1.5 text-xs font-semibold text-violet-200">
                <Sparkles size={14} />
                Explore the catalog
              </span>
              <h1 className="mt-3 text-2xl font-bold tracking-tight sm:text-3xl lg:text-4xl">
                {selectedCategory?.name}
              </h1>
              <p className="mt-2 line-clamp-2 max-w-2xl text-sm leading-6 text-[#C5C7D4] sm:text-base">
                {selectedCategory?.description ||
                  "Explore expert-led courses and find the next skill you want to master."}
              </p>
              <p className="mt-3 text-sm font-medium text-[#AFB2BF]">
                {selectedCategory?.course?.length || 0}{" "}
                {(selectedCategory?.course?.length || 0) === 1
                  ? "course"
                  : "courses"}{" "}
                available
              </p>
            </div>
          </div>
        </header>

        <section className="mx-auto max-w-7xl px-4 py-9 sm:px-6 sm:py-12 lg:px-8">
          <div className="mb-5 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-violet-300">
                Curated for you
              </p>
              <h2 className="mt-1 text-2xl font-bold sm:text-3xl">
                Courses to get you started
              </h2>
            </div>
            <div
              className="inline-flex w-fit rounded-xl border border-[#2C333F] bg-[#161D29] p-1"
              role="tablist"
              aria-label="Sort courses"
            >
              {[
                { id: "popular", label: "Most popular" },
                { id: "new", label: "Newest" },
              ].map((tabItem) => (
                <button
                  key={tabItem.id}
                  type="button"
                  role="tab"
                  aria-selected={active === tabItem.id}
                  onClick={() => setActive(tabItem.id)}
                  className={`rounded-lg px-3 py-2 text-xs font-semibold transition sm:px-4 sm:text-sm ${
                    active === tabItem.id
                      ? "bg-amber-300 text-[#000814]"
                      : "text-[#AFB2BF] hover:text-white"
                  }`}
                >
                  {tabItem.label}
                </button>
              ))}
            </div>
          </div>
          <CourseSlider Courses={featuredCourses} />
        </section>

        {relatedCategory?.course?.length > 0 && (
          <section className="border-t border-[#2C333F] bg-[#0b111b]/60">
            <div className="mx-auto max-w-7xl px-4 py-9 sm:px-6 sm:py-12 lg:px-8">
              <div className="mb-5">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-cyan-200">
                  Keep exploring
                </p>
                <h2 className="mt-1 text-2xl font-bold sm:text-3xl">
                  More from {relatedCategory.name}
                </h2>
              </div>
              <CourseSlider Courses={relatedCategory.course} />
            </div>
          </section>
        )}
      </main>
      <Footer />
    </>
  );
};

export default Catalog;
