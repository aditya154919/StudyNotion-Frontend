import React from "react";

const HiddenTestCaseSection = ({
  hiddenTestCases,
  setHiddenTestCases,
}) => {
  const handleChange = (
    index,
    field,
    value
  ) => {
    const updated = [...hiddenTestCases];
    updated[index][field] = value;
    setHiddenTestCases(updated);
  };

  const addHiddenTestCase = () => {
    setHiddenTestCases([
      ...hiddenTestCases,
      {
        input: "",
        output: "",
        hidden: true,
      },
    ]);
  };

  const deleteHiddenTestCase = (index) => {
    const updated = hiddenTestCases.filter(
      (_, i) => i !== index
    );
    setHiddenTestCases(updated);
  };

  const saveHiddenTestCase = (index) => {
    console.log(
      "Saved Hidden Test Case:",
      hiddenTestCases[index]
    );
  };

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-[#F1F2FF]">
        Hidden Test Cases
      </h3>

      {hiddenTestCases.map((testCase, index) => (
        <div
          key={index}
          className="rounded-md border border-[#2C333F] bg-[#161D29] p-5"
        >
          <h4 className="mb-4 text-lg text-[#F1F2FF]">
            Hidden Test Case {index + 1}
          </h4>

          {/* Input */}
          <div className="mb-4">
            <label className="text-gray-300">
              Input
            </label>

            <textarea
              value={testCase.input}
              onChange={(e) =>
                handleChange(
                  index,
                  "input",
                  e.target.value
                )
              }
              placeholder="nums = [3,2,4], target = 6"
              className="mt-2 w-full rounded-md bg-gray-600 p-3 text-gray-300"
            />
          </div>

          {/* Output */}
          <div>
            <label className="text-gray-300">
              Expected Output
            </label>

            <textarea
              value={testCase.output}
              onChange={(e) =>
                handleChange(
                  index,
                  "output",
                  e.target.value
                )
              }
              placeholder="[1,2]"
              className="mt-2 w-full rounded-md bg-gray-600 p-3 text-gray-300"
            />
          </div>

          {/* Buttons */}
          <div className="mt-5 flex justify-end gap-3">
            <button
              type="button"
              onClick={() =>
                saveHiddenTestCase(index)
              }
              className="rounded-md bg-yellow-400 px-4 py-2 text-black"
            >
              Save
            </button>

            {hiddenTestCases.length > 1 && (
              <button
                type="button"
                onClick={() =>
                  deleteHiddenTestCase(index)
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
        onClick={addHiddenTestCase}
        className="text-yellow-50"
      >
        + Add Hidden Test Case
      </button>
    </div>
  );
};

export default HiddenTestCaseSection;