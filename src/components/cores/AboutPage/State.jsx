import React from 'react'


const Stats = [
  { count: "5K", label: "Active Students" },
  { count: "10+", label: "Mentors" },
  { count: "200+", label: "Courses" },
  { count: "50+", label: "Awards" },
];
const State = () => {
  return (
    <section className="bg-[#2C333F]">
      {/* Stats */}
      <div className="mx-auto w-11/12 max-w-315 py-3 text-white sm:py-5">
        <div className="grid grid-cols-2 gap-y-2 text-center sm:grid-cols-4 sm:gap-y-0">
          {Stats.map((data, index) => {
            return (
              <div className="flex min-w-0 flex-col py-3 sm:py-5" key={index}>
                <p className="text-2xl font-bold text-gray-100 sm:text-[30px]">
                  {data.count}
                </p>
                <p className="text-xs font-semibold text-[#C5C7D4] sm:text-sm md:text-base">
                  {data.label}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  )
}

export default State
