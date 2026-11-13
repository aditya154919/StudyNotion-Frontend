import { useEffect, useState } from "react";
import { Allotment } from "allotment";

import LeftPanel from "./LeftPanel";
import CodeEditor from "./CodeEditor";
import OutputPanel from "./OutputPanel";

const SplitLayout = () => {
  const [vertical, setVertical] = useState(false);

  useEffect(() => {
    const breakpoint = window.matchMedia("(max-width: 767px)");
    const updateOrientation = () => setVertical(breakpoint.matches);
    updateOrientation();
    breakpoint.addEventListener("change", updateOrientation);
    return () => breakpoint.removeEventListener("change", updateOrientation);
  }, []);

  return (
    <Allotment
      vertical={vertical}
      defaultSizes={vertical ? [38, 62] : [42, 58]}
    >
      {/* LEFT PANEL */}
      <Allotment.Pane minSize={vertical ? 180 : 260}>
        <div className="h-full border-b border-[#30363D] bg-[#161B22] md:border-b-0 md:border-r">
          <LeftPanel />
        </div>
      </Allotment.Pane>

      {/* RIGHT PANEL */}
      <Allotment.Pane minSize={vertical ? 280 : 320}>
        <Allotment vertical defaultSizes={[72, 28]}>
          {/* CODE EDITOR */}
          <Allotment.Pane minSize={250}>
            <div className="h-full bg-[#0D1117]">
              <CodeEditor />
            </div>
          </Allotment.Pane>

          {/* OUTPUT */}
          <Allotment.Pane minSize={150}>
            <div className="h-full bg-[#161B22] border-t border-[#30363D]">
              <OutputPanel />
            </div>
          </Allotment.Pane>
        </Allotment>
      </Allotment.Pane>
    </Allotment>
  );
};

export default SplitLayout;