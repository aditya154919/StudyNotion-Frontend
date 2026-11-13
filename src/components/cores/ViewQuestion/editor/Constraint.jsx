import SectionCard from "./SectionCard";

const ConstraintCard = ({ constraints }) => {
  return (
    <SectionCard
      title="Constraints"
      icon="📏"
    >
      <ul className="space-y-3">
        {constraints.map((item, index) => (
          <li
            key={index}
            className="flex items-start gap-3"
          >
            <div className="mt-2 h-2 w-2 rounded-full bg-[#58A6FF]" />

            <span className="text-gray-300 leading-7">
              {item}
            </span>
          </li>
        ))}
      </ul>
    </SectionCard>
  );
};

export default ConstraintCard;