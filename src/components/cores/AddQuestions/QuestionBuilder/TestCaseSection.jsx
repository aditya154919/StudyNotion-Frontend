import React from "react";

const TestCaseSection = ({
  testCases,
  setTestCases,
}) => {
  const handleChange = (
    index,
    field,
    value
  ) => {
    const updated = [...testCases];
    updated[index][field] = value;
    setTestCases(updated);
  };

  const addTestCase = () => {
    setTestCases([
      ...testCases,
      {
        input: "",
        output: "",
        hidden: false,
      },
    ]);
  };

  const deleteTestCase = (index) => {
    const updated = testCases.filter(
      (_, i) => i !== index
    );
    setTestCases(updated);
  };

  const saveTestCase = (index) => {
    console.log("Saved:", testCases[index]);
  };

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-[#F1F2FF]">
        Sample Test Cases
      </h3>

      {testCases.map((testCase, index) => (
        <div
          key={index}
          className="rounded-md border border-[#2C333F] bg-[#161D29] p-5"
        >
          <h4 className="mb-4 text-lg text-[#F1F2FF]">
            Test Case {index + 1}
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
              placeholder="nums = [2,7,11,15], target = 9"
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
              placeholder="[0,1]"
              className="mt-2 w-full rounded-md bg-gray-600 p-3 text-gray-300"
            />
          </div>

          {/* Buttons */}
          <div className="mt-5 flex justify-end gap-3">
            <button
              type="button"
              onClick={() =>
                saveTestCase(index)
              }
              className="rounded-md bg-yellow-400 px-4 py-2 text-black"
            >
              Save
            </button>

            {testCases.length > 1 && (
              <button
                type="button"
                onClick={() =>
                  deleteTestCase(index)
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
        onClick={addTestCase}
        className="text-yellow-50"
      >
        + Add Test Case
      </button>
    </div>
  );
};

export default TestCaseSection;