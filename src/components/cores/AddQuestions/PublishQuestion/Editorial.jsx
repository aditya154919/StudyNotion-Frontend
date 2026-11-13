import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import Upload from "../../AddCourse/CourseInformation/Upload";

const EditorialSection = ({
  editorial,
  setEditorial,
}) => {
  const {
    register,
    setValue,
    formState: { errors },
    watch,
  } = useForm();

  const video = watch("video");

  useEffect(() => {
    if (video) {
      setEditorial((prev) => ({
        ...prev,
        video,
      }));
    }
  }, [video, setEditorial]);

  return (
    <div className="space-y-8 rounded-md border border-[#2C333F] bg-[#161D29] p-6">
      <h3 className="text-lg font-semibold text-[#F1F2FF]">
        Editorial
      </h3>

      {/* Video Upload */}
      <Upload
        name="video"
        label="Editorial Video"
        register={register}
        setValue={setValue}
        errors={errors}
        type="video"
      />

      {/* Description */}
      <div>
        <label className="text-sm text-[#F1F2FF]">
          Editorial Description
        </label>

        <textarea
          rows={10}
          value={editorial.description}
          onChange={(e) =>
            setEditorial((prev) => ({
              ...prev,
              description:
                e.target.value,
            }))
          }
          placeholder="Explain intuition, approach, dry run, and complexity analysis..."
          className="mt-2 w-full rounded-md bg-gray-600 p-4 text-gray-300"
        />
      </div>
    </div>
  );
};

export default EditorialSection;