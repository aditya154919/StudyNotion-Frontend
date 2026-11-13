import { useState } from "react";
import SectionCard from "./SectionCard";
import { FiChevronDown, FiChevronRight } from "react-icons/fi";

const HintCard = ({ hints }) => {
  const [opened, setOpened] = useState(false);

  return (
    <SectionCard
      title="Hints"
      icon="💡"
    >
      <button
        onClick={() => setOpened(!opened)}
        className="w-full flex items-center justify-between bg-[#0D1117] border border-[#30363D] rounded-xl px-5 py-4 hover:border-[#58A6FF] transition"
      >
        <span className="font-medium">
          {opened ? "Hide Hint" : "Reveal Hint"}
        </span>

        {opened ? (
          <FiChevronDown size={20} />
        ) : (
          <FiChevronRight size={20} />
        )}
      </button>

      {opened && (
        <div className="mt-5 space-y-4">
          {hints.map((hint, index) => (
            <div
              key={index}
              className="rounded-xl bg-[#0D1117] border border-[#30363D] p-4"
            >
              <p className="text-sm text-[#58A6FF] font-semibold mb-2">
                Hint {index + 1}
              </p>

              <p className="text-gray-300 leading-7">
                {hint}
              </p>
            </div>
          ))}
        </div>
      )}
    </SectionCard>
  );
};

export default HintCard;