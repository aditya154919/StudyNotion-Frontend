function RightPanel() {
  return (
    <div className="w-80 border-l border-gray-800 p-6 hidden xl:block">
      <div className="bg-[#1a1a1a] rounded-3xl p-5">
        <h2 className="text-xl font-bold mb-4">
          Day 23
        </h2>

        <div className="grid grid-cols-7 gap-2 text-center">
          {[...Array(30)].map((_, i) => (
            <div
              key={i}
              className="h-8 w-8 rounded-full bg-[#242424]"
            >
              {i + 1}
            </div>
          ))}
        </div>
      </div>

      <div className="bg-[#1a1a1a] rounded-3xl p-5 mt-6">
        <h2 className="font-bold text-lg">
          52 / 3972 Solved
        </h2>
      </div>
    </div>
  );
}

export default RightPanel;