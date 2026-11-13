import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { MdNavigateNext } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { addQuestion } from "../../../../Services/operations/QuestionApi";
import { setQuestion, setStep } from "../../../../slices/Question";

const QuestionInfo = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const title = watch("title", "");
  const [loading, setLoading] = useState(false);

  const slug = title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-");

  const onSubmit = async (data) => {
    setLoading(true);
    const questionData = {
      ...data,
      slug,
    };

    console.log(questionData);

    const result = await addQuestion(questionData, token);
    if (result) {
      dispatch(setQuestion(result));
      dispatch(setStep(2));
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-8 rounded-md border border-[#2C333F] bg-[#161D29] p-6"
    >
      {/* PROBLEM TITLE */}
      <div>
        <label className="text-gray-300">
          Problem Title <sup className="text-red-400">*</sup>
        </label>

        <input
          {...register("title", { required: true })}
          placeholder="Enter Problem Title"
          className="w-full rounded-md bg-gray-600 p-2 text-gray-300"
        />

        {errors.title && (
          <span className="text-xs text-red-500">
            Problem title is required
          </span>
        )}
      </div>

      {/* SLUG */}
      <div>
        <label className="text-gray-300">Problem Slug</label>

        <input
          value={slug}
          readOnly
          className="w-full rounded-md bg-gray-700 p-2 text-gray-400 cursor-not-allowed"
          placeholder="Slug will be generated automatically"
        />
      </div>

      {/* DESCRIPTION */}
      <div>
        <label className="text-gray-300">
          Problem Description <sup className="text-red-400">*</sup>
        </label>

        <textarea
          {...register("description", { required: true })}
          className="min-h-40 w-full rounded-md bg-gray-600 p-2 text-gray-300"
          placeholder="Enter Problem Description"
        />

        {errors.description && (
          <span className="text-xs text-red-500">Description is required</span>
        )}
      </div>

      {/* DIFFICULTY */}
      <div>
        <label className="text-gray-300">
          Difficulty <sup className="text-red-400">*</sup>
        </label>

        <select
          {...register("difficulty", { required: true })}
          className="w-full rounded-md bg-gray-600 p-2 text-gray-300"
        >
          <option value="">Select Difficulty</option>
          <option value="Easy">Easy</option>
          <option value="Medium">Medium</option>
          <option value="Hard">Hard</option>
        </select>

        {errors.difficulty && (
          <span className="text-xs text-red-500">Difficulty is required</span>
        )}
      </div>

      {/* TAGS */}
      <div>
        <label className="text-gray-300">
          Tags <sup className="text-red-400">*</sup>
        </label>

        <input
          {...register("tags", { required: true })}
          placeholder="Array, Hash Table, String"
          className="w-full rounded-md bg-gray-600 p-2 text-gray-300"
        />

        {errors.tags && (
          <span className="text-xs text-red-500">Tags are required</span>
        )}
      </div>

      {/* CONSTRAINTS */}
      <div>
        <label className="text-gray-300">
          Constraints <sup className="text-red-400">*</sup>
        </label>

        <textarea
          {...register("constraints", { required: true })}
          placeholder="2 <= nums.length <= 10^4"
          className="min-h-32 w-full rounded-md bg-gray-600 p-2 text-gray-300"
        />

        {errors.constraints && (
          <span className="text-xs text-red-500">Constraints are required</span>
        )}
      </div>

      {/* POINTS */}
      <div>
        <label className="text-gray-300">
          Companies <sup className="text-red-400">*</sup>
        </label>

        <input
          {...register("companies", { required: true })}
          placeholder="Google,Microsoft,Amazon"
          className="w-full rounded-md bg-gray-600 p-2 text-gray-300"
        />

        {errors.companies && (
          <span className="text-xs text-red-500">Companies are required</span>
        )}
      </div>

      {/* BUTTON */}
      <div className="flex justify-end">
        <button
          type="submit"
          className="flex items-center gap-1 rounded-md bg-yellow-400 px-4 py-2 text-black"
        >
          Next <MdNavigateNext size={20} />
        </button>
      </div>
    </form>
  );
};

export default QuestionInfo;
