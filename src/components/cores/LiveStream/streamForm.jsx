import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import {
  createSection,
  fetchInstructorCourses,
} from "../../../Services/operations/Courseapi";
import { createStreamRoom } from "../../../Services/operations/Streamapi";

const StreamForm = () => {
  const { token } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState("");
  const [sections, setSections] = useState([]);
  const [showSectionModal, setShowSectionModal] = useState(false);
  const [newSectionName, setNewSectionName] = useState("");
  const [loadingCourses, setLoadingCourses] = useState(true);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    sectionId: "",
    notification: false,
    scheduledFor: "",
  });

  useEffect(() => {
    let active = true;
    const loadCourses = async () => {
      try {
        const data = await fetchInstructorCourses(token);
        if (active) setCourses(data || []);
      } catch (error) {
        console.error("Could not load instructor courses:", error);
      } finally {
        if (active) setLoadingCourses(false);
      }
    };
    if (token) loadCourses();
    return () => {
      active = false;
    };
  }, [token]);

  const handleCourseChange = (event) => {
    const courseId = event.target.value;
    const selected = courses.find((course) => course._id === courseId);
    setSelectedCourse(courseId);
    setSections(selected?.courseContent || []);
    setFormData((previous) => ({ ...previous, sectionId: "" }));
  };

  const handleChange = (event) => {
    const { name, value, checked, type } = event.target;
    setFormData((previous) => ({
      ...previous,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleCreateSection = async () => {
    const sectionName = newSectionName.trim();
    if (!sectionName || !selectedCourse) return;

    try {
      const updatedCourse = await createSection(
        { sectionName, courseId: selectedCourse },
        token,
      );
      const createdSection = updatedCourse?.createdSection;
      if (!createdSection?._id) {
        throw new Error("The new course section was not returned by the server");
      }
      setSections((previous) => [...previous, createdSection]);
      setFormData((previous) => ({
        ...previous,
        sectionId: createdSection._id,
      }));
      setNewSectionName("");
      setShowSectionModal(false);
    } catch (error) {
      console.error("Could not create course section:", error);
      toast.error(error.message || "Could not create course section.");
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSaving(true);
    try {
      const response = await createStreamRoom(
        {
          ...formData,
          courseId: selectedCourse,
          scheduledFor: formData.scheduledFor
            ? new Date(formData.scheduledFor).toISOString()
            : "",
        },
        token,
      );
      navigate(`/dashboard/live-dashboard/${response.data._id}`);
    } catch (error) {
      console.error("Could not schedule live class:", error);
    } finally {
      setSaving(false);
    }
  };

  const inputClass =
    "w-full rounded-xl border border-[#424854] bg-[#0f1724] px-4 py-3 text-[#F1F2FF] outline-none transition focus:border-[#FFD60A]";

  return (
    <>
      <div className="mx-auto max-w-4xl rounded-2xl border border-[#2C333F] bg-[#161D29] p-6 text-[#F1F2FF] shadow-xl sm:p-8">
        <div className="mb-8">
          <p className="mb-2 text-sm font-semibold uppercase tracking-[0.18em] text-[#FFD60A]">
            Instructor studio
          </p>
          <h1 className="text-3xl font-bold">Plan a live class</h1>
          <p className="mt-2 max-w-2xl text-[#AFB2BF]">
            Choose the course section where the replay will appear. You can go
            live now or schedule a future session.
          </p>
        </div>

        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="grid gap-6 md:grid-cols-2">
            <label className="space-y-2 text-sm font-medium">
              Class title <span className="text-[#EF476F]">*</span>
              <input
                required
                maxLength={120}
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="e.g. Introduction to React hooks"
                className={inputClass}
              />
            </label>

            <label className="space-y-2 text-sm font-medium">
              Course <span className="text-[#EF476F]">*</span>
              <select
                required
                value={selectedCourse}
                onChange={handleCourseChange}
                className={inputClass}
                disabled={loadingCourses}
              >
                <option value="">
                  {loadingCourses ? "Loading courses..." : "Select a course"}
                </option>
                {courses.map((course) => (
                  <option key={course._id} value={course._id}>
                    {course.courseName}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <label className="block space-y-2 text-sm font-medium">
            Description <span className="text-[#EF476F]">*</span>
            <textarea
              required
              maxLength={2000}
              rows={4}
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="What will students learn in this session?"
              className={inputClass}
            />
          </label>

          <div className="grid gap-6 md:grid-cols-2">
            <label className="space-y-2 text-sm font-medium">
              Course section <span className="text-[#EF476F]">*</span>
              <select
                required
                value={formData.sectionId}
                onChange={(event) => {
                  if (event.target.value === "create-new-section") {
                    setShowSectionModal(true);
                    return;
                  }
                  setFormData((previous) => ({
                    ...previous,
                    sectionId: event.target.value,
                  }));
                }}
                className={inputClass}
                disabled={!selectedCourse}
              >
                <option value="">Select a section</option>
                {sections.map((section) => (
                  <option key={section._id} value={section._id}>
                    {section.sectionName}
                  </option>
                ))}
                <option value="create-new-section">+ Create a section</option>
              </select>
            </label>

            <label className="space-y-2 text-sm font-medium">
              Schedule for
              <input
                type="datetime-local"
                name="scheduledFor"
                value={formData.scheduledFor}
                onChange={handleChange}
                className={inputClass}
              />
              <span className="block text-xs font-normal text-[#838894]">
                Leave blank to start as soon as you press Go live.
              </span>
            </label>
          </div>

          <div className="grid gap-3 md:grid-cols-2">
            <div className="rounded-xl border border-[#2C333F] bg-[#0f1724] p-4">
              <span className="block font-semibold">Automatic class recording</span>
              <span className="mt-1 block text-sm text-[#AFB2BF]">
                Recording starts when you enter the live room. The replay is
                uploaded to Cloudinary and saved to the selected section when
                you end class.
              </span>
            </div>
            <label className="flex cursor-pointer gap-3 rounded-xl border border-[#2C333F] bg-[#0f1724] p-4">
              <input
                type="checkbox"
                name="notification"
                checked={formData.notification}
                onChange={handleChange}
                className="mt-1 accent-[#FFD60A]"
              />
              <span>
                <span className="block font-semibold">Email enrolled students</span>
                <span className="mt-1 block text-sm text-[#AFB2BF]">
                  Send the live-class link when you start. Students whose
                  enrollment was canceled will not receive it.
                </span>
              </span>
            </label>
          </div>

          <div className="flex flex-col-reverse justify-end gap-3 border-t border-[#2C333F] pt-6 sm:flex-row">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="rounded-xl border border-[#424854] px-5 py-3 font-semibold text-[#F1F2FF] hover:bg-[#2C333F]"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving || loadingCourses || courses.length === 0}
              className="rounded-xl bg-[#FFD60A] px-6 py-3 font-bold text-[#161D29] hover:bg-yellow-300 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {saving ? "Saving..." : "Save class details"}
            </button>
          </div>
        </form>
      </div>

      {showSectionModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
          <div className="w-full max-w-md rounded-2xl border border-[#2C333F] bg-[#161D29] p-6 text-[#F1F2FF] shadow-2xl">
            <h2 className="text-xl font-bold">Create course section</h2>
            <p className="mb-5 mt-2 text-sm text-[#AFB2BF]">
              Your class replay will be added to this section.
            </p>
            <input
              autoFocus
              maxLength={100}
              value={newSectionName}
              onChange={(event) => setNewSectionName(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  event.preventDefault();
                  handleCreateSection();
                }
              }}
              placeholder="Section name"
              className={inputClass}
            />
            <div className="mt-6 flex justify-end gap-3">
              <button
                type="button"
                onClick={() => {
                  setShowSectionModal(false);
                  setNewSectionName("");
                }}
                className="rounded-xl border border-[#424854] px-4 py-2 hover:bg-[#2C333F]"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleCreateSection}
                disabled={!newSectionName.trim()}
                className="rounded-xl bg-[#FFD60A] px-4 py-2 font-semibold text-[#161D29] disabled:opacity-60"
              >
                Create section
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default StreamForm;
