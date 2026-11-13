import { Search } from "lucide-react";

function SearchBar() {
  return (
    <div className="mb-6">
      <div className="flex items-center bg-[#1a1a1a] rounded-2xl px-5 py-3 max-w-md">
        <Search size={20} />
        <input
          type="text"
          placeholder="Search Questions"
          className="bg-transparent outline-none ml-3 w-full"
        />
      </div>
    </div>
  );
}

export default SearchBar;