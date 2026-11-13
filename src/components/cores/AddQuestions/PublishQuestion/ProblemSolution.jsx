import { useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import EditorialSection from "./Editorial";
import SolutionCodeSection from "./Solution";
import { publishQuestion } from "../../../../Services/operations/QuestionApi";
import { setQuestion, setStep } from "../../../../slices/Question";
import { useNavigate } from "react-router";

const ProblemSolution = () => {
  const { question } = useSelector((state) => state.question);
  const {token} = useSelector((state)=>state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch()

  const [editorial, setEditorial] = useState({
    video: null,
    description: "",
  });

  const [solutionCode, setSolutionCode] = useState({
    cpp: "",
    java: "",
    python: "",
  });

  const formData = new FormData();

  formData.append("questionId", question?._id);

  formData.append("description", editorial.description);

  if (editorial.video) {
    formData.append("video", editorial.video);
  }

  formData.append("solutionCode", JSON.stringify(solutionCode));

  formData.append("status", "Published");

  const submitHandler = async()=>{
    try {
        const result = await publishQuestion(formData,token);
        if(result){
          dispatch(setQuestion(result.data));
          navigate("/dashboard/problems")
          dispatch(setStep(1));
        }
    } catch (error) {
        console.log("Error")
    }
  }

  return (
    <form
      onSubmit={submitHandler}
      className="space-y-8 rounded-md border border-[#2C333F] bg-[#161D29] p-6"
    >
      <EditorialSection editorial={editorial} setEditorial={setEditorial} />

      <SolutionCodeSection
        solutionCode={solutionCode}
        setSolutionCode={setSolutionCode}
      />

      <div className="flex justify-between">
        <button type="button" className="rounded-md bg-[#788296] px-5 py-2">
          Back
        </button>

        <button
          type="submit"
          className="rounded-md bg-yellow-50 px-5 py-2 text-[#000814]"
        >
          Publish
        </button>
      </div>
    </form>
  );
};

export default ProblemSolution;
