import React from "react";
import {
  FiMenu,
  FiChevronLeft,
  FiChevronRight,
  FiPlay,
  FiUploadCloud,
  FiUser,
} from "react-icons/fi";
import Stopwatch from "./Stopwatch";

const TopNavbar = ({ problemId }) => {
  return (
    <header className="flex min-h-16 flex-wrap items-center justify-between gap-2 border-b border-[#30363D] bg-[#161B22] px-3 py-2 sm:px-5 lg:px-6">
      {/* Left */}
      <div className="flex min-w-0 items-center gap-2 sm:gap-4 lg:gap-6">

        {/* Problem List */}
        <button className="flex items-center gap-2 text-gray-300 hover:text-white transition">
          <FiMenu size={18} />
          <span className="hidden sm:inline">Problem List</span>
        </button>

        {/* Navigation */}
        <div className="hidden items-center gap-1 sm:flex">
          <button className="p-2 rounded-lg hover:bg-[#21262D]">
            <FiChevronLeft size={20} />
          </button>

          <button className="p-2 rounded-lg hover:bg-[#21262D]">
            <FiChevronRight size={20} />
          </button>
        </div>
      </div>

      {/* Center */}
      <div className="flex min-w-0 items-center gap-2 sm:gap-3 lg:gap-4">
        {/* Language */}
        <select className="min-w-0 rounded-lg border border-[#30363D] bg-[#0D1117] px-2 py-2 text-sm outline-none sm:px-3">
          <option>C++</option>
          <option>Java</option>
          <option>Python</option>
        </select>

        {/* Run */}
        <button className="flex items-center gap-2 rounded-lg bg-[#238636] px-3 py-2 font-medium transition hover:bg-[#2EA043] sm:px-5">
          <FiPlay />
          <span className="hidden sm:inline">Run</span>
        </button>

        <button className="flex items-center gap-2 rounded-lg bg-[#1F6FEB] px-3 py-2 font-medium transition hover:bg-[#388BFD] sm:px-5">
          <FiUploadCloud />
          <span className="hidden sm:inline">Submit</span>
        </button>
      </div>

      {/* Right */}
      <div className="flex items-center gap-4">
        

   <Stopwatch problemId={problemId} />

        <div className="w-10 h-10 rounded-full bg-[#30363D] flex items-center justify-center cursor-pointer hover:bg-[#484F58] transition">
          <FiUser size={20} />
        </div>
      </div>
    </header>
  );
};

export default TopNavbar;
