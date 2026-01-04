import React, { useState } from "react";
import { Chart, registerables } from "chart.js";
import { Pie } from "react-chartjs-2";

Chart.register(...registerables);
const InstructorChart = ({ course }) => {
  const [currentChart, setCurrentChart] = useState("students");
  // function to generate random color
  const getRandomColors = (numcolors) => {
    const colors = [];
    for (let i = 0; i < numcolors; i++) {
      const color = `rgb(${Math.floor(Math.random() * 256)},${Math.floor(
        Math.random() * 256
      )},${Math.floor(Math.random() * 256)})`;
      colors.push(color);
    }

    return colors;
  };

  const chartDataStudents = {
    labels: course.map((item) => item.courseName),
    datasets: [
      {
        data: course.map((item) => item.totalStudentsEnrolled),
        backgroundColor: getRandomColors(course.length),
      },
    ],
  };

  const chartIncomeData = {
    labels: course.map((item) => item.courseName),
    datasets: [
      {
        data: course.map((item) => item.totalEarning),
        backgroundColor: getRandomColors(course.length),
      },
    ],
  };
  const option = {
     maintainAspectRatio: false,
  }
  return (
    <div className="flex flex-1 flex-col gap-y-4 rounded-md bg-[#161D29] p-5">
        <p className="text-lg font-bold text-gray-200">Visualise</p>
        <div className="space-x-4 font-semibold">
           <button
          onClick={() => setCurrentChart("students")}
          className={`rounded-sm p-1 px-3 transition-all duration-200 ${
            currentChart === "students"
              ? "bg-[#2C333F] text-[#FFD60A]"
              : "text-[#9E8006]"
          }`}
        >
          Students
        </button>
        {/* Button to switch to the "income" chart */}
        <button
          onClick={() => setCurrentChart("income")}
          className={`rounded-sm p-1 px-3 transition-all duration-200 ${
            currentChart === "income"
              ? "bg-[#2C333F] text-[#FFD60A]"
              : "text-[#9E8006]"
          }`}
        >
          Income
        </button>
        </div>
        <div className="relative mx-auto aspect-square h-[80%] w-full">
        {/* Render the Pie chart based on the selected chart */}
        <Pie
          data={currentChart === "students" ? chartDataStudents : chartIncomeData}
          options={option}
        />
      </div>
    </div>
  )
};

export default InstructorChart;
