import React from "react";

const HintSection = ({
  hints,
  setHints,
}) => {
  const handleChange = (
    index,
    value
  ) => {
    const updated = [...hints];
    updated[index] = value;
    setHints(updated);
  };

  const addHint = () => {
    setHints([...hints, ""]);
  };

  const deleteHint = (index) => {
    const updated = hints.filter(
      (_, i) => i !== index
    );
    setHints(updated);
  };

  const saveHints = () => {
    const filteredHints = hints.filter(
      (hint) => hint.trim() !== ""
    );

    setHints(filteredHints);

    console.log(
      "Saved Hints:",
      filteredHints
    );
  };

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-[#F1F2FF]">
        Hints (Optional)
      </h3>

      {hints.map((hint, index) => (
        <div
          key={index}
          className="rounded-md border border-[#2C333F] p-5"
        >
          <p className="mb-3 text-[#F1F2FF]">
            Hint {index + 1}
          </p>

          <textarea
            rows={4}
            value={hint}
            onChange={(e) =>
              handleChange(
                index,
                e.target.value
              )
            }
            placeholder="Enter hint..."
            className="w-full rounded-md bg-gray-600 p-3 text-gray-300"
          />

          {hints.length > 1 && (
            <div className="mt-4 flex justify-end">
              <button
                type="button"
                onClick={() =>
                  deleteHint(index)
                }
                className="rounded-md bg-red-500 px-4 py-2 text-white"
              >
                Delete
              </button>
            </div>
          )}
        </div>
      ))}

      <button
        type="button"
        onClick={addHint}
        className="text-yellow-50"
      >
        + Add Hint
      </button>

      <div className="flex justify-end">
        <button
          type="button"
          onClick={saveHints}
          className="rounded-md bg-yellow-400 px-5 py-2 text-black"
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default HintSection;