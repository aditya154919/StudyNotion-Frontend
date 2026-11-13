import React, { useEffect, useState } from "react";
import Editor from "@monaco-editor/react";
import { useSelector } from "react-redux";

const SolutionCodeSection = ({ solutionCode, setSolutionCode }) => {
  const [language, setLanguage] = useState("cpp");

  const { question } = useSelector((state) => state.question);

  const signature = question?.functionSignature;

  const generateCpp = () => {
    if (!signature) return "";

    const params = signature.parameters
      ?.map((p) =>
        p.cppType.startsWith("vector")
          ? `${p.cppType}& ${p.name}`
          : `${p.cppType} ${p.name}`,
      )
      .join(", ");

    return `class Solution {
public:
    ${signature.returnType.cpp}
    ${signature.functionName}(
        ${params}
    ) {

        // Write your solution here

    }
};`;
  };

  const generateJava = () => {
    if (!signature) return "";

    const params = signature.parameters
      ?.map((p) => `${p.javaType} ${p.name}`)
      .join(", ");

    return `class Solution {
    public ${signature.returnType.java}
    ${signature.functionName}(
        ${params}
    ) {

        // Write your solution here

    }
}`;
  };

  const generatePython = () => {
    if (!signature) return "";

    const params = signature.parameters?.map((p) => p.name).join(", ");

    return `class Solution:
    def ${signature.functionName}(self, ${params}):

        # Write your solution here
        pass`;
  };

  useEffect(() => {
    if (solutionCode.cpp || solutionCode.java || solutionCode.python) return;

    setSolutionCode({
      cpp: generateCpp(),
      java: generateJava(),
      python: generatePython(),
    });
  }, [signature]);

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-[#F1F2FF]">Solution Code</h3>

      <div className="flex gap-3">
        {["cpp", "java", "python"].map((lang) => (
          <button
            key={lang}
            type="button"
            onClick={() => setLanguage(lang)}
            className={`rounded-md px-4 py-2 ${
              language === lang
                ? "bg-yellow-400 text-black"
                : "bg-[#2C333F] text-white"
            }`}
          >
            {lang.toUpperCase()}
          </button>
        ))}
      </div>

      <div className="overflow-hidden rounded-md border border-[#2C333F]">
        <Editor
          height="500px"
          language={language === "cpp" ? "cpp" : language}
          theme="vs-dark"
          value={solutionCode[language]}
          onChange={(value) =>
            setSolutionCode((prev) => ({
              ...prev,
              [language]: value || "",
            }))
          }
          options={{
            fontSize: 15,
            minimap: {
              enabled: false,
            },
            automaticLayout: true,
          }}
        />
      </div>
    </div>
  );
};

export default SolutionCodeSection;
