import ProblemTable from "../components/cores/ViewQuestion/Probembar";
import RightPanel from "../components/cores/ViewQuestion/Rightpannel";
import SearchBar from "../components/cores/ViewQuestion/SearchBar";
import Sidebar from "../components/cores/ViewQuestion/Sidebar";
import TopCards from "../components/cores/ViewQuestion/TopCard";
import TopicChips from "../components/cores/ViewQuestion/TopChip";

function Library() {
  return (
    <div className="flex min-h-screen min-w-0 flex-col bg-[#0f0f0f] text-white lg:flex-row">
      <Sidebar />

      <div className="min-w-0 flex-1 overflow-y-auto p-4 sm:p-6">
        <TopCards />
        <TopicChips />
        <SearchBar />
        <ProblemTable />
      </div>

      <RightPanel />
    </div>
  );
}

export default Library;