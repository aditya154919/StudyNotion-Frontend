const ResultPanel = () => {
  return (
    <div className="p-6">

      <div
        className="
        rounded-2xl
        border
        border-[#30363D]
        bg-[#0D1117]
        p-6
        "
      >
        <h2 className="text-green-400 text-xl font-semibold">

          Accepted

        </h2>

        <div className="mt-6 grid grid-cols-2 gap-6">

          <div>

            <p className="text-gray-400">
              Runtime
            </p>

            <p className="mt-2 text-2xl font-bold">
              12 ms
            </p>

          </div>

          <div>

            <p className="text-gray-400">
              Memory
            </p>

            <p className="mt-2 text-2xl font-bold">
              8.2 MB
            </p>

          </div>

        </div>

      </div>

    </div>
  );
};

export default ResultPanel;