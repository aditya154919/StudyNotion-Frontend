import { useEffect, useState } from "react";
import { FiTrash2 } from "react-icons/fi";
import { useSelector } from "react-redux";
import {
  deleteProblem,
  FetchInstructorQuestion,
} from "../Services/operations/QuestionApi";

const MyQuestions = () => {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(false);

  const { token } = useSelector((state) => state.auth);

  useEffect(() => {
    fetchQuestions();
  }, []);

  const fetchQuestions = async () => {
    try {
      setLoading(true);

      const result = await FetchInstructorQuestion(token);

      setQuestions(result || []);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const deleteQuestion = async (questionId) => {
    try {
      await deleteProblem(questionId, token);

      setQuestions((prev) => prev.filter((q) => q._id !== questionId));
    } catch (error) {
      console.log(error);
    }
  };

  if (loading) {
    return (
      <div className="flex h-75 items-center justify-center text-lg text-white">
        Loading...
      </div>
    );
  }

  return (
    <div className="text-white">
      {/* Heading */}
      <div className="mb-10 flex items-center justify-between">
        <h1 className="text-3xl font-semibold">My Questions</h1>

        <button className="rounded-md bg-yellow-400 px-5 py-3 text-black">
          Add Question +
        </button>
      </div>

      {/* No Questions */}
      {questions.length === 0 ? (
        <div className="flex h-75 items-center justify-center rounded-md border border-[#2C333F] bg-[#161D29]">
          <p className="text-xl font-medium text-richblack-200">
            No questions created by you.
          </p>
        </div>
      ) : (
        <div className="overflow-hidden rounded-md border border-[#2C333F]">
          {/* Header */}
          <div className="grid grid-cols-[3fr_1fr_1fr_1fr] border-b border-[#2C333F] bg-[#161D29] p-5 font-semibold">
            <p>QUESTIONS</p>
            <p>DIFFICULTY</p>
            <p>STATUS</p>
            <p>ACTION</p>
          </div>

          {/* Rows */}
          {questions.map((question) => (
            <div
              key={question._id}
              className="grid grid-cols-[3fr_1fr_1fr_1fr] items-center border-b border-[#2C333F] bg-[#161D29] p-5"
            >
              {/* Question */}
              <div>
                <h3 className="text-xl font-semibold">{question.title}</h3>
              </div>

              {/* Difficulty */}
              <div>
                <span
                  className={`font-semibold ${
                    question.difficulty === "Easy"
                      ? "text-green-500"
                      : question.difficulty === "Medium"
                        ? "text-yellow-400"
                        : "text-red-500"
                  }`}
                >
                  {question.difficulty}
                </span>
              </div>

              {/* Status */}
              <div>
                <span
                  className={`rounded-full px-4 py-2 text-sm font-semibold ${
                    question.status === "Published"
                      ? "bg-green-500/20 text-green-400"
                      : "bg-pink-500/20 text-pink-400"
                  }`}
                >
                  {question.status}
                </span>
              </div>

              {/* Actions */}
              <div className="pl-3 text-2xl">
                <button
                  className="cursor-pointer text-richblack-300 transition-all duration-200 hover:text-red-500"
                  onClick={() => deleteQuestion(question._id)}
                >
                  <FiTrash2 />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyQuestions;
