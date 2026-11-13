import { useState } from "react";
import { Plus } from "lucide-react";

import CodeMirror from "@uiw/react-codemirror";
import { cpp } from "@codemirror/lang-cpp";
import { oneDark } from "@codemirror/theme-one-dark";

const TestCasePanel = () => {
  const [testCases, setTestCases] = useState([
    {
      input: "nums = [2,7,11,15]\ntarget = 9",
      output: "",
    },
  ]);

  const [activeTestCase, setActiveTestCase] = useState(0);

  // Currently selected testcase
  const current = testCases[activeTestCase];

  const addTestCase = () => {
    setTestCases((prev) => [
      ...prev,
      {
        input: "",
        output: "",
      },
    ]);

    setActiveTestCase(testCases.length);
  };

  const updateInput = (value) => {
    const arr = [...testCases];
    arr[activeTestCase].input = value;
    setTestCases(arr);
  };

  return (
    <div className="h-full flex flex-col">
      {/* Test Case Tabs */}
      <div className="flex items-center gap-3 border-b border-[#30363D] px-6 py-4 overflow-x-auto">
        {testCases.map((_, index) => (
          <button
            key={index}
            onClick={() => setActiveTestCase(index)}
            className={`px-4 py-3 rounded-lg whitespace-nowrap transition ${
              activeTestCase === index
                ? "bg-[#1F6FEB] text-white"
                : "bg-[#21262D] text-gray-300 hover:bg-[#30363D]"
            }`}
          >
            Test Case {index + 1}
          </button>
        ))}

        <button
          onClick={addTestCase}
          className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#21262D] hover:bg-[#30363D]"
        >
          <Plus size={18} />
        </button>
      </div>

      {/* Editor */}
      <div className="flex-1 p-6">
        <h3 className="mb-3 text-sm font-medium text-gray-400">
          Input
        </h3>

        <div className="overflow-hidden rounded-xl border border-[#30363D]">
          <CodeMirror
            value={current.input}
            height="120px"
            theme={oneDark}
            extensions={[cpp()]}
            onChange={updateInput}
            basicSetup={{
              lineNumbers: false,
              foldGutter: false,
              highlightActiveLine: false,
              highlightActiveLineGutter: false,
              autocompletion: false,
              searchKeymap: false,
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default TestCasePanel;