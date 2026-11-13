import React from "react";

const ExampleSection = ({
  examples,
  setExamples,
}) => {
  const handleChange = (
    index,
    field,
    value
  ) => {
    const updatedExamples = [...examples];
    updatedExamples[index][field] = value;
    setExamples(updatedExamples);
  };

  const addExample = () => {
    setExamples([
      ...examples,
      {
        input: "",
        output: "",
        explanation: "",
      },
    ]);
  };

  const deleteExample = (index) => {
    const updatedExamples = examples.filter(
      (_, i) => i !== index
    );
    setExamples(updatedExamples);
  };

  const saveExample = (index) => {
    console.log(
      "Saved Example:",
      examples[index]
    );
  };

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-[#F1F2FF]">
        Examples
      </h3>

      {examples.map((example, index) => (
        <div
          key={index}
          className="rounded-md border border-[#2C333F] bg-[#161D29] p-5"
        >
          <h4 className="mb-4 text-lg text-[#F1F2FF]">
            Example {index + 1}
          </h4>

          {/* Input */}
          <div className="mb-4">
            <label className="text-gray-300">
              Input
            </label>

            <textarea
              value={example.input}
              onChange={(e) =>
                handleChange(
                  index,
                  "input",
                  e.target.value
                )
              }
              placeholder="nums = [2,7,11,15], target = 9"
              className="mt-2 w-full rounded-md bg-gray-600 p-3 text-gray-300"
            />
          </div>

          {/* Output */}
          <div className="mb-4">
            <label className="text-gray-300">
              Output
            </label>

            <textarea
              value={example.output}
              onChange={(e) =>
                handleChange(
                  index,
                  "output",
                  e.target.value
                )
              }
              placeholder="[0,1]"
              className="mt-2 w-full rounded-md bg-gray-600 p-3 text-gray-300"
            />
          </div>

          {/* Explanation */}
          <div>
            <label className="text-gray-300">
              Explanation
            </label>

            <textarea
              value={example.explanation}
              onChange={(e) =>
                handleChange(
                  index,
                  "explanation",
                  e.target.value
                )
              }
              placeholder="nums[0] + nums[1] = 9"
              className="mt-2 w-full rounded-md bg-gray-600 p-3 text-gray-300"
            />
          </div>

          {/* Buttons */}
          <div className="mt-5 flex justify-end gap-3">
            <button
              type="button"
              onClick={() =>
                saveExample(index)
              }
              className="rounded-md bg-yellow-400 px-4 py-2 text-black"
            >
              Save
            </button>

            {examples.length > 1 && (
              <button
                type="button"
                onClick={() =>
                  deleteExample(index)
                }
                className="rounded-md bg-red-500 px-4 py-2 text-white"
              >
                Delete
              </button>
            )}
          </div>
        </div>
      ))}

      <button
        type="button"
        onClick={addExample}
        className="text-yellow-50"
      >
        + Add Example
      </button>
    </div>
  );
};

export default ExampleSection;