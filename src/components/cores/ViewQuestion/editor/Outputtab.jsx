const tabs = [
  {
    id: "testcase",
    label: "Test Cases",
  },
  {
    id: "console",
    label: "Console",
  },
  {
    id: "result",
    label: "Result",
  },
];

const OutputTabs = ({
  activeTab,
  setActiveTab,
}) => {
  return (
    <div className="flex border-b border-[#30363D]">

      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => setActiveTab(tab.id)}
          className={`relative whitespace-nowrap px-3 py-3 text-xs font-medium transition sm:px-5 sm:py-4 sm:text-sm

            ${
              activeTab === tab.id
                ? "text-white"
                : "text-gray-400 hover:text-white"
            }

          `}
        >
          {tab.label}

          {activeTab === tab.id && (
            <span className="absolute left-0 bottom-0 h-0.5 w-full bg-[#58A6FF]" />
          )}
        </button>
      ))}

    </div>
  );
};

export default OutputTabs;