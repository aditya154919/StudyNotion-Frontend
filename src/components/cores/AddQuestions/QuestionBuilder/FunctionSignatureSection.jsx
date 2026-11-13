import React, { useEffect, useState } from "react";
import Editor from "@monaco-editor/react";

const FunctionSignatureAndStarterCode = ({
  functionSignature,
  setFunctionSignature,
  starterCode,
  setStarterCode,
}) => {
  const [language, setLanguage] = useState("cpp");

  // ======================
  // PARAMETER FUNCTIONS
  // ======================

  const handleParameterChange = (
    index,
    field,
    value
  ) => {
    const updated = [...functionSignature.parameters];
    updated[index][field] = value;

    setFunctionSignature((prev) => ({
      ...prev,
      parameters: updated,
    }));
  };

  const addParameter = () => {
    setFunctionSignature((prev) => ({
      ...prev,
      parameters: [
        ...prev.parameters,
        {
          name: "",
          cppType: "",
          javaType: "",
        },
      ],
    }));
  };

  const deleteParameter = (index) => {
    const updated =
      functionSignature.parameters.filter(
        (_, i) => i !== index
      );

    setFunctionSignature((prev) => ({
      ...prev,
      parameters: updated,
    }));
  };

  // ======================
  // CODE GENERATORS
  // ======================

  const generateCppStarterCode = () => {
    const {
      functionName,
      returnType,
      parameters,
    } = functionSignature;

    if (!functionName || !returnType.cpp) {
      return "";
    }

    const params = parameters
      .filter((p) => p.name && p.cppType)
      .map((p) => {
        if (p.cppType.startsWith("vector")) {
          return `${p.cppType}& ${p.name}`;
        }

        return `${p.cppType} ${p.name}`;
      })
      .join(",\n        ");

    return `class Solution {
public:
    ${returnType.cpp} ${functionName}(
        ${params}
    ) {

    }
};`;
  };

  const generateJavaStarterCode = () => {
    const {
      functionName,
      returnType,
      parameters,
    } = functionSignature;

    if (!functionName || !returnType.java) {
      return "";
    }

    const params = parameters
      .filter((p) => p.name && p.javaType)
      .map(
        (p) => `${p.javaType} ${p.name}`
      )
      .join(",\n        ");

    return `class Solution {
    public ${returnType.java} ${functionName}(
        ${params}
    ) {

    }
}`;
  };

  const generatePythonStarterCode = () => {
    const {
      functionName,
      parameters,
    } = functionSignature;

    if (!functionName) {
      return "";
    }

    const params = parameters
      .filter((p) => p.name)
      .map((p) => p.name)
      .join(", ");

    return `class Solution:
    def ${functionName}(self, ${params}):
        pass`;
  };

  // ======================
  // AUTO GENERATE
  // ======================

  useEffect(() => {
    setStarterCode({
      cpp: generateCppStarterCode(),
      java: generateJavaStarterCode(),
      python: generatePythonStarterCode(),
    });
  }, [functionSignature]);

  return (
    <div className="space-y-8 rounded-md border border-[#2C333F] bg-[#161D29] p-6">

      {/* FUNCTION NAME */}
      <div>
        <label className="text-gray-300">
          Function Name
        </label>

        <input
          value={
            functionSignature.functionName
          }
          onChange={(e) =>
            setFunctionSignature((prev) => ({
              ...prev,
              functionName:
                e.target.value,
            }))
          }
          placeholder="twoSum"
          className="mt-2 w-full rounded-md bg-gray-600 p-3 text-gray-300"
        />
      </div>

      {/* RETURN TYPES */}
      <div className="grid grid-cols-2 gap-5">
        <div>
          <label className="text-gray-300">
            C++ Return Type
          </label>

          <input
            value={
              functionSignature.returnType
                .cpp
            }
            onChange={(e) =>
              setFunctionSignature(
                (prev) => ({
                  ...prev,
                  returnType: {
                    ...prev.returnType,
                    cpp:
                      e.target.value,
                  },
                })
              )
            }
            placeholder="vector<int>"
            className="mt-2 w-full rounded-md bg-gray-600 p-3 text-gray-300"
          />
        </div>

        <div>
          <label className="text-gray-300">
            Java Return Type
          </label>

          <input
            value={
              functionSignature.returnType
                .java
            }
            onChange={(e) =>
              setFunctionSignature(
                (prev) => ({
                  ...prev,
                  returnType: {
                    ...prev.returnType,
                    java:
                      e.target.value,
                  },
                })
              )
            }
            placeholder="int[]"
            className="mt-2 w-full rounded-md bg-gray-600 p-3 text-gray-300"
          />
        </div>
      </div>

      {/* PARAMETERS */}
      <div>
        <h3 className="mb-5 text-lg text-white">
          Parameters
        </h3>

        {functionSignature.parameters.map(
          (param, index) => (
            <div
              key={index}
              className="mb-4 rounded-md border border-[#2C333F] p-5"
            >
              <p className="mb-4 text-white">
                Parameter {index + 1}
              </p>

              <div className="space-y-4">
                <input
                  value={param.name}
                  onChange={(e) =>
                    handleParameterChange(
                      index,
                      "name",
                      e.target.value
                    )
                  }
                  placeholder="nums"
                  className="w-full rounded-md bg-gray-600 p-3 text-gray-300"
                />

                <input
                  value={param.cppType}
                  onChange={(e) =>
                    handleParameterChange(
                      index,
                      "cppType",
                      e.target.value
                    )
                  }
                  placeholder="vector<int>"
                  className="w-full rounded-md bg-gray-600 p-3 text-gray-300"
                />

                <input
                  value={param.javaType}
                  onChange={(e) =>
                    handleParameterChange(
                      index,
                      "javaType",
                      e.target.value
                    )
                  }
                  placeholder="int[]"
                  className="w-full rounded-md bg-gray-600 p-3 text-gray-300"
                />
              </div>

              {functionSignature.parameters
                .length > 1 && (
                <button
                  type="button"
                  onClick={() =>
                    deleteParameter(index)
                  }
                  className="mt-4 rounded-md bg-red-500 px-4 py-2 text-white"
                >
                  Delete
                </button>
              )}
            </div>
          )
        )}

        <button
          type="button"
          onClick={addParameter}
          className="text-yellow-400"
        >
          + Add Parameter
        </button>
      </div>

      {/* STARTER CODE */}
      <div>
        <h3 className="mb-5 text-lg text-white">
          Starter Code
        </h3>

        <div className="mb-5 flex gap-3">
          {["cpp", "java", "python"].map(
            (lang) => (
              <button
                key={lang}
                type="button"
                onClick={() =>
                  setLanguage(lang)
                }
                className={`rounded-md px-4 py-2 ${
                  language === lang
                    ? "bg-yellow-400 text-black"
                    : "bg-[#2C333F] text-white"
                }`}
              >
                {lang.toUpperCase()}
              </button>
            )
          )}
        </div>

        <div className="overflow-hidden rounded-md border border-[#2C333F]">
          <Editor
            height="400px"
            language={
              language === "cpp"
                ? "cpp"
                : language
            }
            theme="vs-dark"
            value={
              starterCode[language]
            }
            onChange={(value) =>
              setStarterCode((prev) => ({
                ...prev,
                [language]:
                  value || "",
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
    </div>
  );
};

export default FunctionSignatureAndStarterCode;