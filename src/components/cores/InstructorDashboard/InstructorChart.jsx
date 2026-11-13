import React, { useMemo, useState } from "react";
import { Chart, registerables } from "chart.js";
import { Bar } from "react-chartjs-2";

Chart.register(...registerables);

const InstructorChart = ({ course }) => {
  const [metric, setMetric] = useState("active");
  const chartData = useMemo(
    () => ({
      labels: course.map((item) => item.courseName),
      datasets: [
        {
          label: metric === "active" ? "Active learners" : "Access revoked",
          data: course.map((item) =>
            metric === "active"
              ? item.totalStudentsEnrolled
              : item.cancelledStudentsCount,
          ),
          backgroundColor: metric === "active" ? "#8B7CFF" : "#F37290",
          hoverBackgroundColor: metric === "active" ? "#A99DFF" : "#FF9CAF",
          borderRadius: 7,
          maxBarThickness: 28,
        },
      ],
    }),
    [course, metric],
  );
  const options = useMemo(
    () => ({
      indexAxis: "y",
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false },
        tooltip: {
          backgroundColor: "#0B1220",
          titleColor: "#F1F2FF",
          bodyColor: "#C5C7D4",
          padding: 12,
        },
      },
      scales: {
        x: {
          beginAtZero: true,
          ticks: { color: "#999DAA", precision: 0 },
          grid: { color: "rgba(153, 157, 170, 0.12)" },
        },
        y: {
          ticks: { color: "#C5C7D4", autoSkip: false },
          grid: { display: false },
        },
      },
    }),
    [],
  );

  return (
    <div className="flex h-full min-h-80 flex-col rounded-2xl border border-white/5 bg-[#111827] p-5 sm:p-6">
      <div className="mb-5 flex flex-wrap items-start justify-between gap-4">
        <div>
          <h2 className="text-lg font-semibold text-[#F1F2FF]">
            Learner activity
          </h2>
          <p className="mt-1 text-sm text-[#999DAA]">
            Enrollment status across your courses
          </p>
        </div>
        <div className="flex rounded-lg bg-[#0B1220] p-1">
          {[
            ["active", "Active"],
            ["cancelled", "Cancelled"],
          ].map(([value, label]) => (
            <button
              key={value}
              type="button"
              onClick={() => setMetric(value)}
              className={`rounded-md px-3 py-1.5 text-xs font-semibold transition ${
                metric === value
                  ? "bg-[#2C333F] text-white"
                  : "text-[#999DAA] hover:text-white"
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>
      {course.length ? (
        <div className="min-h-55 flex-1">
          <Bar data={chartData} options={options} />
        </div>
      ) : (
        <div className="grid flex-1 place-items-center text-sm text-[#999DAA]">
          Learner activity will appear here when someone enrolls.
        </div>
      )}
    </div>
  );
};

export default InstructorChart;
