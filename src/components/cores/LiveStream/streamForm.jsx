import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { createSection, fetchInstructorCourses } from "../../../Services/operations/Courseapi";
import { createStreamRoom } from "../../../Services/operations/Streamapi";

const StreamForm = () => {
  const { token } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState("");
  const [sections, setSections] = useState([]);

  const [showSectionModal, setShowSectionModal] = useState(false);
  const [newSectionName, setNewSectionName] = useState("");

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    sectionId: "",
    recording: false,
    notification: false,
    scheduledFor: "",
  });

  useEffect(() => {
    const getInstructorCourse = async () => {
      try {
        const data = await fetchInstructorCourses(token);
        setCourses(data || []);
      } catch (error) {
        console.log(error);
      }
    };

    if (token) {
      getInstructorCourse();
    }
  }, [token]);

  const handleCourseChange = (e) => {
    const courseId = e.target.value;

    setSelectedCourse(courseId);

    const selectedCourseData = courses.find(
      (course) => course._id === courseId,
    );

    setSections(selectedCourseData?.courseContent || []);

    setFormData((prev) => ({
      ...prev,
      sectionId: "",
    }));
  };

  const handleChange = (e) => {
    const { name, value, checked, type } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

 const handleCreateSection = async () => {
  if (!newSectionName.trim()) return;

  try {
    const response = await createSection(
      {
        sectionName: newSectionName,
        courseId: selectedCourse,
      },
      token
    );

    if (response) {
      const createdSection = response;
      console.log("Response ",response)
      setSections((prev) => [...prev, createdSection.courseContent.at(-1).sectionName]);

      setFormData((prev) => ({
        ...prev,
        sectionId: createdSection._id,
      }));
    }

    setNewSectionName("");
    setShowSectionModal(false);
  } catch (error) {
    console.log(error);
  }
};

  const handleSubmit = async (status) => {
    try {
      const payload = {
        ...formData,
        courseId: selectedCourse,
        status,
      };

      const response = await createStreamRoom(payload, token);

      navigate(`/dashboard/live-dashboard/${response.data._id}`);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="rounded-xl border border-[#2C333F] bg-[#161D29] p-6">
        <h2 className="mb-6 text-2xl font-semibold text-[#F1F2FF]">
          Start Live Stream
        </h2>

        <form className="space-y-6">
          {/* Stream Title */}
          <div>
            <label className="mb-2 block text-sm text-[#F1F2FF]">
              Stream Title <sup className="text-[#EF476F]">*</sup>
            </label>

            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Enter Stream Title"
              className="w-full rounded-lg border-b border-[#585D69] bg-[#2C333F] p-3 text-[#F1F2FF] outline-none"
            />
          </div>

          {/* Description */}
          <div>
            <label className="mb-2 block text-sm text-[#F1F2FF]">
              Stream Description <sup className="text-[#EF476F]">*</sup>
            </label>

            <textarea
              rows={5}
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Enter Stream Description"
              className="w-full rounded-lg border-b border-[#585D69] bg-[#2C333F] p-3 text-[#F1F2FF] outline-none"
            />
          </div>

          {/* Course */}
          <div>
            <label className="mb-2 block text-sm text-[#F1F2FF]">
              Select Course <sup className="text-[#EF476F]">*</sup>
            </label>

            <select
              value={selectedCourse}
              onChange={handleCourseChange}
              className="w-full rounded-lg border-b border-[#585D69] bg-[#2C333F] p-3 text-[#F1F2FF] outline-none"
            >
              <option value="">Select Course</option>

              {courses.map((course) => (
                <option key={course._id} value={course._id}>
                  {course.courseName}
                </option>
              ))}
            </select>
          </div>

          {/* Section */}
          <select
            value={formData.sectionId}
            onChange={(e) => {
              const value = e.target.value;

              if (value === "create-new-section") {
                setShowSectionModal(true);

                setFormData((prev) => ({
                  ...prev,
                  sectionId: "",
                }));

                return;
              }

              setFormData((prev) => ({
                ...prev,
                sectionId: value,
              }));
            }}
            className="w-full rounded-lg border-b border-[#585D69] bg-[#2C333F] p-3 text-[#F1F2FF] outline-none"
          >
            <option value="">Select Section</option>

            {sections.map((section) => (
              <option key={section._id} value={section._id}>
                {section.sectionName}
              </option>
            ))}

            <option value="create-new-section">➕ Create New Section</option>
          </select>

          {/* Buttons */}
          <div className="flex justify-end gap-4 pt-4">
            <button
              type="button"
              className="rounded-lg bg-[#2C333F] px-5 py-2 text-[#F1F2FF]"
            >
              Cancel
            </button>

            <button
              type="button"
              onClick={() => handleSubmit("live")}
              className="rounded-lg bg-[#FFD60A] px-5 py-2 font-semibold text-black"
            >
              Next
            </button>
          </div>
        </form>
      </div>

      {/* Create Section Modal */}
      {showSectionModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
          <div className="w-125 rounded-xl border border-[#2C333F] bg-[#161D29] p-6">
            <h2 className="mb-4 text-xl font-semibold text-[#F1F2FF]">
              Create New Section
            </h2>

            <input
              type="text"
              value={newSectionName}
              onChange={(e) => setNewSectionName(e.target.value)}
              placeholder="Enter Section Name"
              className="w-full rounded-lg border-b border-[#585D69] bg-[#2C333F] p-3 text-[#F1F2FF] outline-none"
            />

            <div className="mt-6 flex justify-end gap-3">
              <button
                type="button"
                onClick={() => {
                  setShowSectionModal(false);
                  setNewSectionName("");
                }}
                className="rounded-lg bg-[#2C333F] px-5 py-2 text-[#F1F2FF]"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={handleCreateSection}
                className="rounded-lg bg-[#FFD60A] px-5 py-2 font-semibold text-black"
              >
                Create Section
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default StreamForm;
