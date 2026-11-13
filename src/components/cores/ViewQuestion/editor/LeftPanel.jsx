import { useState } from "react";

import Description from "./Description";
import Editorial from "./Editorial";
import Solutions from "./Solutions";
import Submissions from "./SubmissionResult";

const tabs = [
  "Description",
  "Editorial",
  "Solutions",
  "Submissions",
];

const LeftPanel = () => {
  const [activeTab, setActiveTab] = useState("Description");

  return (
    <div className="h-full flex flex-col bg-[#0D1117]">
      {/* Tabs */}
      <div className="sticky top-0 z-20 bg-[#161B22] border-b border-[#30363D]">
        <div className="flex">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`relative whitespace-nowrap px-3 py-3 text-sm font-medium transition sm:px-5 sm:py-4 sm:text-base

              ${
                activeTab === tab
                  ? "text-white"
                  : "text-gray-400 hover:text-white"
              }
              
              `}
            >
              {tab}

              {activeTab === tab && (
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#58A6FF]" />
              )}
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-6">
        {activeTab === "Description" && <Description />}
        {activeTab === "Editorial" && <Editorial />}
        {activeTab === "Solutions" && <Solutions />}
        {activeTab === "Submissions" && <Submissions />}
        
      </div>
    </div>
  );
};

export default LeftPanel;