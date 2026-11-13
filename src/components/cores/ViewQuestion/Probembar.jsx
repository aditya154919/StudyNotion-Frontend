import React from "react";
import { useSelector } from "react-redux";
import { FaCheckCircle } from "react-icons/fa";
import ConfirmationModal from "../../../Common/ConfirmationModal";
import { useState } from "react";
import { useNavigate } from "react-router";

const ProblemTable = () => {
  const { questionData } = useSelector((state) => state.viewQuestion);
  const { solvedProblem } = useSelector((state) => state.profile);
  const { token } = useSelector((state) => state.auth);
  const [confirmationModal, setConfirmationModal] = useState(null);
  const navigate = useNavigate();

  const solvedSet = new Set(solvedProblem);

  const goNext = (slug) => {
    if (!token) {
      setConfirmationModal({
        text1: "You are not logged in!",
        text2: "Please login to solve the problem.",
        btn1Text: "Login",
        btn2Text: "Cancel",
        btn1Handler: () => navigate("/login"),
        btn2Handler: () => setConfirmationModal(null),
      });
    }
    else{
      navigate(`/problems/${slug}`);
    }
  };

  return (
    <>
      <div className="space-y-4">
        {questionData.map((problem, index) => {
          const isSolved = solvedSet.has(problem._id);

          return (
            <div
              key={problem._id}
              className="bg-[#181818] rounded-2xl p-4 flex justify-between items-center hover:bg-[#212121] transition cursor-pointer"
              onClick={() => goNext(problem.slug)}
            >
              {/* Left */}
              <div className="flex items-center gap-3">
                {isSolved && (
                  <FaCheckCircle className="text-green-500 text-lg" />
                )}

                <span className="text-gray-500">{index + 1}.</span>

                <span className="font-semibold">{problem.title}</span>
              </div>

              {/* Right */}
              <span
                className={`font-medium ${
                  problem.difficulty === "Easy"
                    ? "text-green-400"
                    : problem.difficulty === "Medium"
                      ? "text-yellow-400"
                      : "text-red-400"
                }`}
              >
                {problem.difficulty}
              </span>
            </div>
          );
        })}
      </div>
      {confirmationModal && <ConfirmationModal modelData={confirmationModal} />}
    </>
  );
};

export default ProblemTable;
