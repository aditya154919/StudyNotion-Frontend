import { BookOpen, User } from "lucide-react";
import React from "react";
import { useSelector } from "react-redux";

const Sidebar = () => {
  const { token } = useSelector((state) => state.auth);
  return (
    <div className="w-full shrink-0 border-b border-gray-800 bg-[#121212] p-4 sm:p-5 lg:min-h-screen lg:w-72 lg:border-b-0 lg:border-r">
      <h1 className="mb-4 text-2xl font-bold sm:text-3xl lg:mb-12">Library</h1>

      <div className="flex flex-wrap gap-2 lg:flex-col lg:gap-4">
        <button className="flex items-center gap-3 rounded-xl bg-[#1c1c1c] p-3">
          <BookOpen size={20} />
          Library
        </button>

        {token && (
          <button className="flex items-center gap-3 rounded-xl p-3 hover:bg-[#1c1c1c]">
            <User size={20} />
            Profile
          </button>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
