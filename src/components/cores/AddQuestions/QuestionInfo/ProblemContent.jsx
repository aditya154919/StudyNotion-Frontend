import { useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";

import ExampleSection from "../QuestionBuilder/ExampleSection";
import FunctionSignatureSection from "../QuestionBuilder/FunctionSignatureSection";
import HiddenTestCaseSection from "../QuestionBuilder/HiddenTestCaseSection";
import HintSection from "../QuestionBuilder/HintSection";
import TestCaseSection from "../QuestionBuilder/TestCaseSection";
import { updateQuestion } from "../../../../Services/operations/QuestionApi";
import { setQuestion, setStep } from "../../../../slices/Question";

const ProblemContent = () => {
  const { question } = useSelector(
    (state) => state.question
  );

  const {token} = useSelector((state)=>state.auth);
  const dispatch = useDispatch();

  const [examples, setExamples] = useState([
    {
      input: "",
      output: "",
      explanation: "",
    },
  ]);

  const [testCases, setTestCases] =
    useState([
      {
        input: "",
        output: "",
        hidden: false,
      },
    ]);

  const [
    hiddenTestCases,
    setHiddenTestCases,
  ] = useState([
    {
      input: "",
      output: "",
      hidden: true,
    },
  ]);

  const [
    functionSignature,
    setFunctionSignature,
  ] = useState({
    functionName: "",
    returnType: {
      cpp: "",
      java: "",
    },
    parameters: [
      {
        name: "",
        cppType: "",
        javaType: "",
      },
    ],
  });

  const [starterCode, setStarterCode] =
    useState({
      cpp: "",
      java: "",
      python: "",
    });

  const [hints, setHints] = useState([
    "",
  ]);

  const submitHandler = async (e) => {
    e.preventDefault();

    const data = {
      questionId: question?._id,
      examples,
      testCases: [
        ...testCases,
        ...hiddenTestCases,
      ],
      functionSignature,
      starterCode,
      hints: hints.filter(
        (hint) => hint.trim() !== ""
      ),
    };

    console.log("Payload:", data);

    try {
      const response = await updateQuestion(data,token)
       dispatch(setQuestion(response.data))
       dispatch(setStep(3));
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form
      onSubmit={submitHandler}
      className="space-y-8 rounded-md border border-[#2C333F] bg-[#161D29] p-6"
    >
      <ExampleSection
        examples={examples}
        setExamples={setExamples}
      />

      <TestCaseSection
        testCases={testCases}
        setTestCases={setTestCases}
      />

      <HiddenTestCaseSection
        hiddenTestCases={
          hiddenTestCases
        }
        setHiddenTestCases={
          setHiddenTestCases
        }
      />

      <FunctionSignatureSection
        functionSignature={
          functionSignature
        }
        setFunctionSignature={
          setFunctionSignature
        }
        starterCode={starterCode}
        setStarterCode={
          setStarterCode
        }
      />

      <HintSection
        hints={hints}
        setHints={setHints}
      />

      <div className="flex justify-between">
        <button
          type="button"
          className="rounded-md bg-[#788296] px-5 py-2 cursor-pointer"
        >
          Back
        </button>

        <button
          type="submit"
          className="rounded-md bg-yellow-50 px-5 py-2 text-[#000814] cursor-pointer"
        >
          Next
        </button>
      </div>
    </form>
  );
};

export default ProblemContent;