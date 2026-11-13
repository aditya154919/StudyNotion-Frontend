import { useEffect, useState } from "react";
import { Timer, Play, Pause, Square } from "lucide-react";

const formatTime = (seconds) => {
  const hrs = String(Math.floor(seconds / 3600)).padStart(2, "0");
  const mins = String(Math.floor((seconds % 3600) / 60)).padStart(2, "0");
  const secs = String(seconds % 60).padStart(2, "0");

  return `${hrs}:${mins}:${secs}`;
};

const Stopwatch = ({ problemId }) => {
  const storageKey = `timer-${problemId}`;

  const [timer, setTimer] = useState(() => {
    const saved = localStorage.getItem(storageKey);

    if (saved) {
      return JSON.parse(saved);
    }

    return {
      elapsed: 0,
      running: false,
    };
  });

  // Save timer state
  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(timer));
  }, [timer, storageKey]);

  // Run timer
  useEffect(() => {
    if (!timer.running) return;

    const interval = setInterval(() => {
      setTimer((prev) => ({
        ...prev,
        elapsed: prev.elapsed + 1,
      }));
    }, 1000);

    return () => clearInterval(interval);
  }, [timer.running]);

  // Start / Resume
  const start = () => {
    setTimer((prev) => ({
      ...prev,
      running: true,
    }));
  };

  // Pause
  const pause = () => {
    setTimer((prev) => ({
      ...prev,
      running: false,
    }));
  };

  // Stop & Reset
  const stop = () => {
    localStorage.removeItem(storageKey);

    setTimer({
      elapsed: 0,
      running: false,
    });
  };

  return (
    <div className="flex items-center gap-4 rounded-xl border border-[#30363D] bg-[#0D1117] px-4 py-2">

      {/* Icon */}
      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#1F6FEB]/15">
        <Timer className="text-[#58A6FF]" size={20} />
      </div>

      {/* Time */}
      <div>
        <p className="text-[11px] uppercase tracking-widest text-gray-500">
          Solving Time
        </p>

        <p className="font-mono text-lg font-semibold tracking-wider text-white">
          {formatTime(timer.elapsed)}
        </p>
      </div>

      {/* Controls */}
      <div className="ml-2 flex items-center gap-2">

        {/* Start */}
        {!timer.running && timer.elapsed === 0 && (
          <button
            onClick={start}
            className="rounded-lg bg-green-600 p-2 hover:bg-green-700 transition"
          >
            <Play size={16} />
          </button>
        )}

        {/* Pause */}
        {timer.running && (
          <button
            onClick={pause}
            className="rounded-lg bg-yellow-500 p-2 hover:bg-yellow-600 transition"
          >
            <Pause size={16} />
          </button>
        )}

        {/* Resume */}
        {!timer.running && timer.elapsed > 0 && (
          <button
            onClick={start}
            className="rounded-lg bg-green-600 p-2 hover:bg-green-700 transition"
          >
            <Play size={16} />
          </button>
        )}

        {/* Stop */}
        {timer.elapsed > 0 && (
          <button
            onClick={stop}
            className="rounded-lg bg-red-600 p-2 hover:bg-red-700 transition"
          >
            <Square size={16} />
          </button>
        )}

      </div>
    </div>
  );
};

export default Stopwatch;