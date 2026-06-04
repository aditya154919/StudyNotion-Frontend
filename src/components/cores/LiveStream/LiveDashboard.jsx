import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { getStreamData, sentNotification } from "../../../Services/operations/Streamapi";

const LiveDashboard = () => {
  const { streamId } = useParams();
  const { token } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const [stream, setStream] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getStreamDetails = async () => {
      try {
        setLoading(true);

        const response = await getStreamData(streamId, token);

        console.log("Stream Response:", response.data);

        setStream(response?.data || response);
      } catch (error) {
        console.log("Error fetching stream:", error);
      } finally {
        setLoading(false);
      }
    };

    if (streamId && token) {
      getStreamDetails();
    }
  }, [streamId, token]);
  

  const startStream = async () => {
  try {
    await sentNotification(
      stream.roomId,
      token,
      stream.course._id
    );

    navigate(`/live-room/${stream.roomId}/${stream._id}/${stream.course?.courseContent.at(-1)?._id}`);
  } catch (error) {
    console.log(error);
  }
};

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh] text-[#F1F2FF]">
        Loading Stream Details...
      </div>
    );
  }

  if (!stream) {
    return (
      <div className="flex items-center justify-center min-h-[50vh] text-red-400">
        Live Stream not found
      </div>
    );
  }

  return (
    <div className="rounded-xl bg-[#161D29] p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-semibold text-[#F1F2FF]">
          Stream Dashboard
        </h1>

        <button className="bg-[#FFD60A] text-black px-4 py-2 rounded-lg font-medium">
          Edit Stream
        </button>
      </div>

      {/* Stream Card */}
      <div className="border border-[#2C333F] rounded-xl p-5 bg-[#161D29]">
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-2xl font-semibold text-[#F1F2FF]">
              {stream.title}
            </h2>

            <p className="text-[#AFB2BF] mt-2">{stream.description}</p>

            <div className="mt-4 space-y-2">
              <p className="text-[#AFB2BF]">
                <span className="text-[#F1F2FF] font-medium">Course:</span>{" "}
                {stream.course?.courseName}
              </p>

              <p className="text-[#AFB2BF]">
                <span className="text-[#F1F2FF] font-medium">Section:</span>{" "}
                {stream.course?.courseContent.at(-1)?.sectionName}
              </p>

              <p className="text-[#AFB2BF]">
                <span className="text-[#F1F2FF] font-medium">Room ID:</span>{" "}
                {stream.roomId}
              </p>

              {stream.scheduledFor && (
                <p className="text-[#AFB2BF]">
                  <span className="text-[#F1F2FF] font-medium">
                    Scheduled For:
                  </span>{" "}
                  {new Date(stream.scheduledFor).toLocaleString()}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Options */}
        <div className="mt-6 flex flex-wrap gap-3">
          {stream.status === "live" && (
            <button
              className="bg-[#FFD60A] text-black px-4 py-2 rounded-lg font-medium"
              onClick={startStream}
            >
              Start Stream
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default LiveDashboard;

