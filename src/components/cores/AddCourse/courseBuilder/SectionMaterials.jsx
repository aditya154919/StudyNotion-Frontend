import React, { useState } from "react";
import { FileText, UploadCloud } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import { setCourse } from "../../../../slices/Courseslice";
import { updateSectionMaterials } from "../../../../Services/operations/Courseapi";

const materialFields = [
  { key: "notes", label: "Section notes" },
  { key: "assignment", label: "Assignment" },
];

const SectionMaterials = ({ section }) => {
  const { course } = useSelector((state) => state.course);
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [files, setFiles] = useState({ notes: null, assignment: null });
  const [fileInputVersion, setFileInputVersion] = useState(0);
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    if (!files.notes && !files.assignment) {
      toast.error("Choose notes or an assignment to upload");
      return;
    }

    const formData = new FormData();
    formData.append("courseId", course._id);
    formData.append("sectionId", section._id);
    if (files.notes) formData.append("notes", files.notes);
    if (files.assignment) formData.append("assignment", files.assignment);

    setSaving(true);
    try {
      const result = await updateSectionMaterials(formData, token);
      if (!result) return;

      dispatch(
        setCourse({
          ...course,
          courseContent: course.courseContent.map((item) =>
            item._id === section._id
              ? { ...item, materials: result.materials }
              : item,
          ),
        }),
      );
      setFiles({ notes: null, assignment: null });
      setFileInputVersion((version) => version + 1);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="mt-5 rounded-xl border border-[#424854] bg-[#111827] p-4">
      <div className="mb-3">
        <h3 className="text-sm font-semibold text-white">Section resources</h3>
        <p className="mt-1 text-xs text-[#999DAA]">
          Students can access these after completing every lesson in this
          section. PDF, DOC, DOCX, PPT, and PPTX files up to 25 MB.
        </p>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        {materialFields.map(({ key, label }) => {
          const resource = section.materials?.[key];
          const selectedFile = files[key];

          return (
            <label
              key={key}
              className="min-w-0 rounded-lg border border-[#2C333F] bg-[#161D29] p-3"
            >
              <span className="block text-xs font-semibold text-[#C5C7D4]">
                {label}
              </span>
              {resource?.url ? (
                <a
                  href={resource.url}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-2 inline-flex max-w-full items-center gap-2 text-sm text-cyan-200 hover:text-cyan-100"
                >
                  <FileText size={16} className="shrink-0" />
                  <span className="truncate">
                    {resource.name || `View current ${label.toLowerCase()}`}
                  </span>
                </a>
              ) : (
                <span className="mt-2 block text-xs text-[#838894]">
                  Nothing uploaded yet
                </span>
              )}
              <input
                key={`${key}-${fileInputVersion}`}
                type="file"
                accept=".pdf,.doc,.docx,.ppt,.pptx"
                disabled={saving}
                onChange={(event) =>
                  setFiles((current) => ({
                    ...current,
                    [key]: event.target.files?.[0] || null,
                  }))
                }
                className="mt-3 block w-full min-w-0 text-xs text-[#AFB2BF] file:mr-3 file:rounded-md file:border-0 file:bg-[#2C333F] file:px-3 file:py-2 file:text-xs file:font-semibold file:text-white hover:file:bg-[#424854]"
              />
              {selectedFile && (
                <span className="mt-2 block truncate text-xs text-amber-200">
                  Selected: {selectedFile.name}
                </span>
              )}
            </label>
          );
        })}
      </div>

      <button
        type="button"
        onClick={handleSave}
        disabled={saving || (!files.notes && !files.assignment)}
        className="mt-4 inline-flex items-center gap-2 rounded-lg bg-amber-300 px-4 py-2 text-sm font-bold text-[#111827] transition hover:bg-amber-200 disabled:cursor-not-allowed disabled:opacity-50"
      >
        <UploadCloud size={16} />
        {saving ? "Uploading..." : "Save section resources"}
      </button>
    </div>
  );
};

export default SectionMaterials;
