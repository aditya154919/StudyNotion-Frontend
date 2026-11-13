import React from "react";
import TopNavbar from "../components/cores/ViewQuestion/editor/TopNavbar";
import SplitLayout from "../components/cores/ViewQuestion/editor/SplitLayout";



const Editor = () => {
  return (
    <div className="flex h-[calc(100dvh_-_3.5rem)] min-h-[32rem] min-w-0 flex-col overflow-hidden bg-[#0D1117] text-[#E6EDF3]">
      {/* Navbar */}
     <TopNavbar/>

      {/* Main Editor */}
      <div className="min-h-0 min-w-0 flex-1 overflow-hidden">
        <SplitLayout />
      </div>
    </div>
  );
};

export default Editor;
