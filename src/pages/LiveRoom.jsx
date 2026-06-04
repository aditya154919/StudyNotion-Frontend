import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getLiveRoom, getStreamData } from "../Services/operations/Streamapi";
import { useNavigate } from "react-router";

const LiveRoom = () => {
  const { token } = useSelector((state) => state.auth);
  const navigate = useNavigate()
  if (!token) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <p className="text-[#AFB2BF] text-xl">User does not exist</p>
      </div>
    );
  }

  const [liveClasses, setLiveClass] = useState([]);

  useEffect(() => {
    const getLivedata = async () => {
      const response = await getLiveRoom(token);
      setLiveClass(response);
    };
    getLivedata();
  }, [token]);
  console.log("Response", liveClasses);


  if (!liveClasses?.length) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <p className="text-[#AFB2BF]  text-xl">
          No live classes available right now
        </p>
      </div>
    );
  }
  return (
    <div className="rounded-xl border border-[#2C333F] text-[#AFB2BF]">
      <div className="grid grid-cols-12 p-5 border-b border-[#2C333F] font-semibold">
        <p className="col-span-6">LIVE CLASS</p>
        <p className="col-span-2">STATUS</p>
        <p className="col-span-2">INSTRUCTOR</p>
        <p className="col-span-2">ACTION</p>
      </div>

      {liveClasses.map((liveClass) => (
        <div
          key={liveClass._id}
          className="grid grid-cols-12 p-5 border-b border-[#2C333F] items-center"
        >
          <div className="col-span-6 flex gap-4">
            <img
              src={liveClass.course.thumbnail}
              className="h-24 w-40 rounded-lg object-cover"
            />

            <div>
              <h3 className="font-semibold text-xl">{liveClass.title}</h3>

              <p className="text-[#838894]">{liveClass.description}</p>

              <p className="mt-2 text-sm">
                Course: {liveClass.course.courseName}
              </p>
            </div>
          </div>

          <div className="col-span-2">{liveClass.status}</div>

          <div className="col-span-2">
            {`${liveClass.instructor.firstName} ${liveClass.instructor.lastName}`}
          </div>
          <div className="col-span-2">
            {
              liveClass.status ==="ended" ? (
                <button
              className="bg-[#FFD60A] text-black px-4 py-2 rounded-md cursor-pointer"
              onClick={() => navigate("/dashboard/enrolled-courses")}
            >
              Check 
            </button>
              ):(
                <button
              className="bg-[#FFD60A] text-black px-4 py-2 rounded-md cursor-pointer"
              onClick={() => navigate(`/live-room/${liveClass.roomId}/${liveClass._id}/${liveClass.section}`)}
            >
              Join
            </button>
              )
            }
          </div>
        </div>
      ))}
    </div>
  );
};

export default LiveRoom;
