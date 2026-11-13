import { useState } from "react";

import OutputTabs from "./Outputtab";
import TestCasePanel from "./TestcasePanel";
import ConsolePanel from "./Console";
import ResultPanel from "./ResultPannel";

const OutputPanel = () => {
  const [activeTab, setActiveTab] = useState("testcase");

  return (
    <div className="h-full bg-[#161B22] flex flex-col">

      <OutputTabs
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

      <div className="flex-1 overflow-auto">

        {activeTab === "testcase" && <TestCasePanel />}

        {activeTab === "console" && <ConsolePanel />}

        {activeTab === "result" && <ResultPanel />}

      </div>

    </div>
  );
};

export default OutputPanel;