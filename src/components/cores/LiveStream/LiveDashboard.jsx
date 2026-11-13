import React, { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import {
  getStreamData,
  startStream as startLiveClass,
} from "../../../Services/operations/Streamapi";

const formatDuration = (seconds = 0) => {
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  return hours
    ? `${hours}h ${minutes % 60}m`
    : `${minutes}m`;
};

const LiveDashboard = () => {
  const { streamId } = useParams();
  const { token } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const [stream, setStream] = useState(null);
  const [loading, setLoading] = useState(true);
  const [starting, setStarting] = useState(false);

  useEffect(() => {
    let active = true;
    const loadStream = async () => {
      try {
        const response = await getStreamData(streamId, token);
        if (response?.accessRevoked) {
          toast.error("You no longer have access to this live class.");
          navigate("/dashboard", { replace: true });
          return;
        }
        if (active) setStream(response?.data || null);
      } catch (error) {
        if (active) toast.error(error.response?.data?.message || error.message);
      } finally {
        if (active) setLoading(false);
      }
    };
    if (streamId && token) loadStream();
    return () => {
      active = false;
    };
  }, [streamId, token, navigate]);

  const sectionName = useMemo(() => {
    const section = stream?.course?.courseContent?.find(
      (item) => item._id === stream.section || item._id === stream.section?._id,
    );
    return section?.sectionName || "Course section";
  }, [stream]);

  const openStudio = () => {
    navigate(`/live-room/${stream.roomId}/${stream._id}/${stream.section?._id || stream.section}`);
  };

  const startStream = async () => {
    setStarting(true);
    try {
      const response = await startLiveClass(stream._id, token);
      setStream(response.data);
      if (response.notificationFailures) {
        toast.error(
          `Live class started, but ${response.notificationFailures} student email(s) could not be sent.`,
        );
      } else {
        toast.success("You are live. Students can now join.");
      }
      openStudio();
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    } finally {
      setStarting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center text-[#AFB2BF]">
        Loading live-class details...
      </div>
    );
  }

  if (!stream) {
    return (
      <div className="rounded-2xl border border-[#2C333F] bg-[#161D29] p-8 text-center text-[#AFB2BF]">
        This live class could not be found.
      </div>
    );
  }

  const presentCount = stream.attendance?.presentCount || 0;

  return (
    <div className="mx-auto max-w-5xl space-y-6 text-[#F1F2FF]">
      <section className="overflow-hidden rounded-2xl border border-[#2C333F] bg-[#161D29] shadow-xl">
        <div className="bg-gradient-to-r from-[#242e40] to-[#161D29] p-6 sm:p-8">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="mb-2 text-sm font-semibold uppercase tracking-[0.18em] text-[#FFD60A]">
                Instructor studio
              </p>
              <h1 className="text-3xl font-bold">{stream.title}</h1>
              <p className="mt-2 max-w-2xl text-[#AFB2BF]">
                {stream.description}
              </p>
            </div>
            <span
              className={`rounded-full px-4 py-2 text-sm font-bold ${
                stream.status === "live"
                  ? "bg-red-500/15 text-red-300"
                  : stream.status === "ended"
                    ? "bg-[#2C333F] text-[#AFB2BF]"
                    : "bg-[#FFD60A]/10 text-[#FFD60A]"
              }`}
            >
              {stream.status === "live"
                ? "LIVE NOW"
                : stream.status.toUpperCase()}
            </span>
          </div>
          <div className="mt-7 flex flex-wrap gap-3">
            {stream.status === "scheduled" && (
              <button
                type="button"
                onClick={startStream}
                disabled={
                  starting ||
                  (stream.scheduledFor &&
                    new Date(stream.scheduledFor).getTime() > Date.now())
                }
                className="rounded-xl bg-[#FFD60A] px-6 py-3 font-bold text-[#161D29] hover:bg-yellow-300 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {starting ? "Starting..." : "Go live"}
              </button>
            )}
            {stream.status === "live" && (
              <button
                type="button"
                onClick={openStudio}
                className="rounded-xl bg-[#FFD60A] px-6 py-3 font-bold text-[#161D29] hover:bg-yellow-300"
              >
                Enter live studio
              </button>
            )}
            {stream.status === "ended" && stream.recordingUrl && (
              <a
                href={stream.recordingUrl}
                target="_blank"
                rel="noreferrer"
                className="rounded-xl bg-[#FFD60A] px-6 py-3 font-bold text-[#161D29] hover:bg-yellow-300"
              >
                View class replay
              </a>
            )}
          </div>
          {stream.status === "scheduled" &&
            stream.scheduledFor &&
            new Date(stream.scheduledFor).getTime() > Date.now() && (
              <p className="mt-3 text-sm text-[#AFB2BF]">
                Scheduled for {new Date(stream.scheduledFor).toLocaleString()}.
                Go live will be available at the scheduled time.
              </p>
            )}
        </div>

        <div className="grid gap-4 border-t border-[#2C333F] p-6 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <p className="text-sm text-[#838894]">Course</p>
            <p className="mt-1 font-semibold">{stream.course?.courseName}</p>
          </div>
          <div>
            <p className="text-sm text-[#838894]">Replay section</p>
            <p className="mt-1 font-semibold">{sectionName}</p>
          </div>
          <div>
            <p className="text-sm text-[#838894]">Recording</p>
            <p className="mt-1 font-semibold">
              {stream.recordingEnabled ? "Enabled" : "Not requested"}
            </p>
          </div>
          <div>
            <p className="text-sm text-[#838894]">Attendance</p>
            <p className="mt-1 font-semibold">
              {stream.status === "ended"
                ? `${stream.attendance?.records?.length || 0} students attended`
                : `${presentCount} students present`}
            </p>
          </div>
        </div>
      </section>

      {stream.status === "ended" && (
        <section className="rounded-2xl border border-[#2C333F] bg-[#161D29] p-6">
          <h2 className="text-xl font-bold">Attendance report</h2>
          {!stream.attendance?.records?.length ? (
            <p className="mt-3 text-sm text-[#AFB2BF]">
              No student attendance was recorded for this class.
            </p>
          ) : (
            <div className="mt-4 divide-y divide-[#2C333F]">
              {stream.attendance.records.map((record) => (
                <div
                  key={record._id}
                  className="flex flex-wrap items-center justify-between gap-3 py-3"
                >
                  <div>
                    <p className="font-medium">
                      {record.user?.firstName} {record.user?.lastName}
                    </p>
                    <p className="text-sm text-[#838894]">
                      Joined {new Date(record.joinedAt).toLocaleString()}
                    </p>
                  </div>
                  <span className="rounded-full bg-emerald-500/10 px-3 py-1 text-sm text-emerald-300">
                    Present · {formatDuration(record.durationSeconds)}
                  </span>
                </div>
              ))}
            </div>
          )}
        </section>
      )}
    </div>
  );
};

export default LiveDashboard;
