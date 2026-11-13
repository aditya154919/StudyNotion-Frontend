import React from "react";
import Section from "./Section";

const AddCourse = () => {
  return (
    <div className="flex items-start gap-x-2 w-full justify-between ">
      <div className="felx flex-col gap-5 w-[55%]">
        <div className="p-5">
          <h1 className="text-gray-100 font-mono text-3xl">Add Question</h1>
        </div>
        <div className="">
          <Section />
        </div>
      </div>
      {/* INformation */}
      <div className="sticky top-10 hidden max-w-100 flex-1 rounded-md border border-[#2C333F] bg-[#161D29] p-6 xl:block">
        <p className="mb-8 text-lg text-[#F1F2FF]">⚡ Question Upload Tips</p>
        <ul className="ml-5 list-item list-disc space-y-4 text-xs text-[#F1F2FF]">
          <li>Provide a clear and descriptive problem title.</li>
          <li>
            Write a detailed problem statement explaining the objective of the
            problem.
          </li>
          <li>Specify the input format and expected output format clearly.</li>
          <li>Include all constraints and edge-case limitations.</li>
          <li>Add at least one sample test case with explanation.</li>
          <li>
            Choose the appropriate difficulty level (Easy, Medium, or Hard).
          </li>
          <li>
            Add relevant tags such as Arrays, Strings, Dynamic Programming,
            Graphs, etc.
          </li>
          <li>
            Provide starter code templates for all supported programming
            languages.
          </li>
          <li>Include both visible and hidden test cases for evaluation.</li>
          <li>Verify that all test cases produce the expected output.</li>
          <li>Ensure the function signature and return type are correct.</li>
          <li>Add hints or an editorial solution if required.</li>
          <li>
            Review the problem statement for clarity, correctness, and grammar
            before publishing.
          </li>
        </ul>
      </div>
    </div>
  );
};

export default AddCourse;
