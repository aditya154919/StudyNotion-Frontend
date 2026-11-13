import Badge from "./Badge";
import TagChip from "./TagChip";
import SectionCard from "./SectionCard";

import ExampleCard from "./Examples";
import ConstraintCard from "./Constraint";
import HintCard from "./Hint";

const problem = {
  id: 7,
  title: "Reverse Integer",
  difficulty: "Medium",

  tags: ["Math"],

  description:
    "Given a signed 32-bit integer x, return x with its digits reversed. If reversing x causes the value to go outside the signed 32-bit integer range, then return 0.",

  examples: [
    {
      input: "123",
      output: "321",
      explanation: "Reverse the digits.",
    },
  ],

  constraints: ["-2³¹ ≤ x ≤ 2³¹ - 1"],

  hints: ["Think carefully about overflow."],
};

const Description = () => {
  return (
    <div className="space-y-5">
      {/* Header */}

      <div className="bg-[#161B22] rounded-2xl border border-[#30363D] p-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">
            <span className="text-gray-300">#{problem.id}</span> {problem.title}
          </h1>

          <div className="flex items-center gap-4 mt-5">
            <Badge difficulty={problem.difficulty} />
          </div>
        </div>

        {/* Topics */}

        <div className="mt-6">
          <p className="text-gray-400 mb-3">Topics</p>

          <div className="flex gap-3 flex-wrap">
            {problem.tags.map((tag) => (
              <TagChip key={tag} text={tag} />
            ))}
          </div>
        </div>

        {/* Companies */}
      </div>

      {/* Description */}

      <SectionCard title="Description" icon="📄">
        <p className="leading-8 text-gray-300">{problem.description}</p>
      </SectionCard>

      {/* Example */}

      {problem.examples.map((example, index) => (
        <ExampleCard key={index} example={example} number={index + 1} />
      ))}

      {/* Constraints */}

      <ConstraintCard constraints={problem.constraints} />

      {/* Hint */}

      <HintCard hints={problem.hints} />
    </div>
  );
};

export default Description;
