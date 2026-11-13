const TagChip = ({ text }) => {
  return (
    <div
      className="
      px-4
      py-2
      rounded-xl
      bg-[#0D1117]
      border
      border-[#30363D]
      text-sm
      hover:border-[#58A6FF]
      hover:bg-[#111827]
      transition-all
      duration-200
      cursor-pointer
      "
    >
      {text}
    </div>
  );
};

export default TagChip;
