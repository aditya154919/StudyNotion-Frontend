import SectionCard from "./SectionCard";

const CodeBlock = ({ title, value }) => {
  return (
    <div className="mt-3">
      <p className="text-sm font-medium text-gray-400 mb-2">
        {title}
      </p>

      <div className="bg-[#0D1117] border border-[#30363D] rounded-xl px-3 py-2 font-mono text-sm text-gray-200 overflow-x-auto">
        {value}
      </div>
    </div>
  );
};

const ExampleCard = ({ example,number }) => {
  return (
    <SectionCard title={`Example ${number}`} icon="🧪">
      <CodeBlock
        title="Input"
        value={example.input}
      />

      <CodeBlock
        title="Output"
        value={example.output}
      />

      {example.explanation && (
        <div className="mt-5">
          <p className="text-sm font-medium text-gray-400 mb-2">
            Explanation
          </p>

          <p className="leading-7 text-gray-300">
            {example.explanation}
          </p>
        </div>
      )}
    </SectionCard>
  );
};

export default ExampleCard;