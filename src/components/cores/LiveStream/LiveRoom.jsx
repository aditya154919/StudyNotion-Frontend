import "@livekit/components-styles";
import {
  LiveKitRoom,
  useRoomContext,
  VideoConference,
} from "@livekit/components-react";
import { RoomEvent, Track } from "livekit-client";
import { useNavigate, useParams } from "react-router-dom";
import { useCallback, useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import "./LiveRoom.css";
import StreamChat from "./StreamChat";
import {
  endStream,
  getStreamData,
  getStreamStatus,
  getToken,
  joinStreamAttendance,
  leaveStream,
  leaveStreamAttendance,
} from "../../../Services/operations/Streamapi";

const LIVEKIT_URL = "wss://studynotion-ejyi4njq.livekit.cloud";

const durationLabel = (seconds = 0) => {
  const totalMinutes = Math.floor(seconds / 60);
  const hours = Math.floor(totalMinutes / 60);
  return hours
    ? `${hours}h ${totalMinutes % 60}m`
    : `${totalMinutes}m`;
};

const createRoomRecording = async (room, onStopped) => {
  const canvas = document.createElement("canvas");
  canvas.width = 1280;
  canvas.height = 720;
  const context = canvas.getContext("2d");
  if (!context) throw new Error("Could not initialize the class recording.");

  const audioContext = new AudioContext();
  const audioDestination = audioContext.createMediaStreamDestination();
  const videoElements = new Map();
  const audioSources = new Map();
  const participants = () => [
    room.localParticipant,
    ...room.remoteParticipants.values(),
  ];

  const refreshTracks = () => {
    const activeVideoTracks = new Set();
    const activeAudioTracks = new Set();

    participants().forEach((participant) => {
      participant.getTrackPublications().forEach((publication) => {
        const track = publication.track;
        const mediaTrack = track?.mediaStreamTrack;
        if (!mediaTrack || mediaTrack.readyState !== "live") return;
        const trackKey = `${participant.identity}:${publication.trackSid}`;

        if (publication.kind === Track.Kind.Video) {
          activeVideoTracks.add(trackKey);
          if (!videoElements.has(trackKey)) {
            const video = document.createElement("video");
            video.autoplay = true;
            video.muted = true;
            video.playsInline = true;
            video.srcObject = new MediaStream([mediaTrack]);
            video.play().catch((error) => {
              console.warn("Recording video track did not start playing:", error);
            });
            videoElements.set(trackKey, { participant, video });
          }
        } else if (publication.kind === Track.Kind.Audio) {
          activeAudioTracks.add(trackKey);
          if (!audioSources.has(trackKey)) {
            const source = audioContext.createMediaStreamSource(
              new MediaStream([mediaTrack]),
            );
            source.connect(audioDestination);
            audioSources.set(trackKey, source);
          }
        }
      });
    });

    videoElements.forEach(({ video }, key) => {
      if (!activeVideoTracks.has(key)) {
        video.pause();
        video.srcObject = null;
        videoElements.delete(key);
      }
    });
    audioSources.forEach((source, key) => {
      if (!activeAudioTracks.has(key)) {
        source.disconnect();
        audioSources.delete(key);
      }
    });
  };

  let animationFrame;
  const drawFrame = () => {
    const videos = [...videoElements.values()];
    const columns = videos.length > 1 ? 2 : 1;
    const rows = Math.max(1, Math.ceil(videos.length / columns));
    const tileWidth = canvas.width / columns;
    const tileHeight = canvas.height / rows;

    context.fillStyle = "#101827";
    context.fillRect(0, 0, canvas.width, canvas.height);
    if (!videos.length) {
      context.fillStyle = "#f1f2ff";
      context.font = "600 30px sans-serif";
      context.textAlign = "center";
      context.fillText("Waiting for participants", canvas.width / 2, canvas.height / 2);
    }

    videos.forEach(({ participant, video }, index) => {
      const x = (index % columns) * tileWidth;
      const y = Math.floor(index / columns) * tileHeight;
      if (
        video.readyState >= HTMLMediaElement.HAVE_CURRENT_DATA &&
        video.videoWidth > 0 &&
        video.videoHeight > 0
      ) {
        const scale = Math.max(
          tileWidth / video.videoWidth,
          tileHeight / video.videoHeight,
        );
        const width = video.videoWidth * scale;
        const height = video.videoHeight * scale;
        context.save();
        context.beginPath();
        context.rect(x, y, tileWidth, tileHeight);
        context.clip();
        context.drawImage(
          video,
          x + (tileWidth - width) / 2,
          y + (tileHeight - height) / 2,
          width,
          height,
        );
        context.restore();
      }

      context.fillStyle = "rgba(0, 0, 0, 0.6)";
      context.fillRect(x + 12, y + tileHeight - 48, Math.min(tileWidth - 24, 340), 36);
      context.fillStyle = "#ffffff";
      context.font = "500 18px sans-serif";
      context.textAlign = "left";
      context.fillText(
        participant.name || participant.identity,
        x + 24,
        y + tileHeight - 24,
        tileWidth - 48,
      );
    });
    animationFrame = requestAnimationFrame(drawFrame);
  };

  refreshTracks();
  const updateEvents = [
    RoomEvent.TrackSubscribed,
    RoomEvent.TrackUnsubscribed,
    RoomEvent.TrackPublished,
    RoomEvent.TrackUnpublished,
    RoomEvent.LocalTrackPublished,
    RoomEvent.LocalTrackUnpublished,
    RoomEvent.ParticipantConnected,
    RoomEvent.ParticipantDisconnected,
  ];
  updateEvents.forEach((event) => room.on(event, refreshTracks));
  if (audioContext.state === "suspended") {
    try {
      await audioContext.resume();
    } catch (error) {
      console.warn("Class recording audio could not be activated:", error);
    }
  }
  drawFrame();

  const audioTracks = audioDestination.stream.getAudioTracks();
  const recordingStream = new MediaStream([
    ...canvas.captureStream(24).getVideoTracks(),
    ...audioTracks,
  ]);
  const supportedTypes = [
    "video/webm;codecs=vp9,opus",
    "video/webm;codecs=vp8,opus",
    "video/webm",
  ];
  const mimeType = supportedTypes.find((type) =>
    MediaRecorder.isTypeSupported(type),
  );
  const recorder = new MediaRecorder(recordingStream, {
    ...(mimeType ? { mimeType } : {}),
    videoBitsPerSecond: 1_000_000,
    audioBitsPerSecond: 96_000,
  });
  const chunks = [];
  recorder.ondataavailable = (event) => {
    if (event.data.size) chunks.push(event.data);
  };
  recorder.onstop = async () => {
    const type = recorder.mimeType || "video/webm";
    const blob = new Blob(chunks, { type });
    const file = blob.size
      ? new File([blob], `live-class-${Date.now()}.webm`, {
          type: "video/webm",
        })
      : null;
    updateEvents.forEach((event) => room.off(event, refreshTracks));
    cancelAnimationFrame(animationFrame);
    videoElements.forEach(({ video }) => {
      video.pause();
      video.srcObject = null;
    });
    audioSources.forEach((source) => source.disconnect());
    try {
      await audioContext.close();
    } catch (error) {
      console.warn("Could not close the class recording audio context:", error);
    }
    recordingStream.getTracks().forEach((track) => track.stop());
    onStopped(file);
  };
  recorder.start(1000);
  return recorder;
};

const StreamRoomContent = ({
  stream,
  user,
  onEnd,
  onLeave,
  ending,
  leaving,
  isRecording,
  canRecord,
  onStartRecording,
  recordingFile,
}) => {
  const room = useRoomContext();
  const isInstructor = user?.accountType === "Instructor";
  const records = stream?.attendance?.records || [];
  const presentRecords = records.filter((record) => record.status === "present");

  useEffect(() => {
    if (!isInstructor || !canRecord) return undefined;
    let active = true;
    const beginRecording = () => {
      if (active) onStartRecording(room);
    };
    if (room.state === "connected") beginRecording();
    else room.on(RoomEvent.Connected, beginRecording);

    return () => {
      active = false;
      room.off(RoomEvent.Connected, beginRecording);
    };
  }, [room, isInstructor, canRecord, onStartRecording]);

  const handleEnd = async () => {
    const ended = await onEnd();
    if (ended) room.disconnect();
  };

  const handleLeave = async () => {
    const left = await onLeave();
    if (left) room.disconnect();
  };

  return (
    <div className="min-h-screen bg-[#0b111b] p-3 text-[#F1F2FF] sm:p-5">
      <header className="mb-4 flex flex-wrap items-center justify-between gap-3 rounded-xl border border-[#2C333F] bg-[#161D29] p-4">
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 animate-pulse rounded-full bg-red-500" />
            <span className="text-xs font-bold uppercase tracking-widest text-red-300">
              Live class
            </span>
          </div>
          <h1 className="mt-1 truncate text-lg font-bold sm:text-xl">
            {stream?.title || "Connecting to class..."}
          </h1>
          <p className="text-sm text-[#AFB2BF]">
            {stream?.course?.courseName || ""}
          </p>
          <p className="mt-1 text-xs text-[#838894]">
            Leave room exits without ending the class. End class closes the
            session for everyone.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {isInstructor && canRecord && (
            <span className="rounded-full bg-red-500/15 px-3 py-2 text-xs font-bold uppercase tracking-wider text-red-300">
              {isRecording ? "Recording automatically" : "Preparing recording"}
            </span>
          )}
          <button
            type="button"
            onClick={handleLeave}
            disabled={ending || leaving}
            className="rounded-lg border border-[#424854] px-4 py-2 text-sm font-semibold text-[#F1F2FF] hover:bg-[#2C333F] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {leaving ? "Saving and leaving..." : "Leave room"}
          </button>
          {isInstructor && (
            <button
              type="button"
              onClick={handleEnd}
              disabled={ending || leaving}
              className="rounded-lg bg-red-500 px-4 py-2 text-sm font-bold text-white hover:bg-red-600 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {ending ? "Saving class..." : "End class"}
            </button>
          )}
        </div>
      </header>

      {isInstructor && canRecord && (
        <div className="mb-4 flex flex-wrap items-center justify-between gap-2 rounded-xl border border-[#2C333F] bg-[#161D29] px-4 py-3 text-sm text-[#AFB2BF]">
          <p>
            {isRecording
              ? "The class recording started automatically and includes participant video and audio."
              : recordingFile
                ? `Recording ready: ${recordingFile.name}. It will be saved to this course when you end the class.`
                : "Preparing the automatic class recording..."}
          </p>
          {isRecording && (
            <span className="rounded-full bg-red-500/15 px-3 py-1 font-semibold text-red-300">
              Recording
            </span>
          )}
        </div>
      )}

      <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_340px]">
        <main className="stream-video-conference min-h-[65vh] overflow-hidden rounded-xl border border-[#2C333F] bg-[#161D29]">
          <VideoConference />
        </main>
        <div className="flex min-h-0 flex-col gap-4">
          <StreamChat />
          <section className="rounded-xl border border-[#2C333F] bg-[#161D29] p-4">
            <div className="flex items-center justify-between">
              <h2 className="font-semibold">Class attendance</h2>
              <span className="rounded-full bg-emerald-500/10 px-3 py-1 text-sm font-semibold text-emerald-300">
                {stream?.attendance?.presentCount ?? presentRecords.length} here
              </span>
            </div>
            {!isInstructor ? (
              <p className="mt-3 text-sm text-[#AFB2BF]">
                Attendance is recorded automatically when you join the class.
              </p>
            ) : (
              <div className="mt-3 max-h-48 space-y-2 overflow-y-auto">
                {records.length === 0 ? (
                  <p className="text-sm text-[#838894]">
                    Enrolled students will appear here as they join.
                  </p>
                ) : (
                  records.map((record) => (
                    <div
                      key={record._id}
                      className="flex items-center justify-between gap-2 text-sm"
                    >
                      <span className="truncate">
                        {record.user?.firstName} {record.user?.lastName}
                      </span>
                      <span
                        className={
                          record.status === "present"
                            ? "shrink-0 text-emerald-300"
                            : "shrink-0 text-[#838894]"
                        }
                      >
                        {record.status === "present"
                          ? "Present"
                          : durationLabel(record.durationSeconds)}
                      </span>
                    </div>
                  ))
                )}
              </div>
            )}
          </section>
        </div>
      </div>
    </div>
  );
};

const LiveRoom = () => {
  const { roomId, streamId } = useParams();
  const { user } = useSelector((state) => state.profile);
  const { token } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const [liveKitToken, setLiveKitToken] = useState(null);
  const [stream, setStream] = useState(null);
  const [ending, setEnding] = useState(false);
  const [leaving, setLeaving] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [recordingFile, setRecordingFile] = useState(null);
  const [connectionError, setConnectionError] = useState("");
  const mediaRecorderRef = useRef(null);
  const recordingStartedRef = useRef(false);
  const classEndHandledRef = useRef(false);
  const statusErrorShownRef = useRef(false);
  const recordedChunksRef = useRef([]);
  const recordingFileRef = useRef(null);
  const stopWaitersRef = useRef([]);
  const attendanceJoinedRef = useRef(false);

  useEffect(() => {
    let active = true;
    const connect = async () => {
      try {
        const [roomToken, streamResponse] = await Promise.all([
          getToken(roomId, token),
          getStreamData(streamId, token),
        ]);
        if (streamResponse?.accessRevoked) {
          toast.error("You no longer have access to this class.");
          navigate("/dashboard/enrolled-courses", { replace: true });
          return;
        }
        if (!streamResponse?.data || streamResponse.data.status !== "live") {
          throw new Error("This live class is no longer available.");
        }
        if (active) {
          setLiveKitToken(roomToken);
          setStream(streamResponse.data);
        }
      } catch (error) {
        if (active) {
          const message =
            error.response?.data?.message ||
            error.message ||
            "Could not connect to the live class.";
          setConnectionError(message);
          toast.error(message);
        }
      }
    };
    if (roomId && streamId && token) connect();
    return () => {
      active = false;
    };
  }, [roomId, streamId, token, navigate]);

  const handleClassEnded = useCallback(() => {
    if (classEndHandledRef.current) return;
    classEndHandledRef.current = true;
    toast("The instructor ended this live class.");
    navigate("/dashboard/enrolled-courses", { replace: true });
  }, [navigate]);

  useEffect(() => {
    if (
      !liveKitToken ||
      !streamId ||
      !token ||
      ending ||
      classEndHandledRef.current
    ) {
      return undefined;
    }

    let active = true;
    let timeoutId;
    let retryDelay = 2000;
    const refreshStream = async () => {
      try {
        const response = await getStreamStatus(streamId, token);
        if (!active) return;
        retryDelay = 2000;
        statusErrorShownRef.current = false;
        if (response?.accessRevoked) {
          toast.error("Your access to this course has been revoked.");
          navigate("/dashboard/enrolled-courses", { replace: true });
          return;
        }
        if (!response?.data) return;
        setStream((previous) => ({
          ...previous,
          status: response.data.status,
          attendance: response.data.attendance,
        }));
        if (response.data.status === "ended") {
          if (user?.accountType === "Instructor") {
            navigate(`/dashboard/live-dashboard/${streamId}`, { replace: true });
          } else {
            handleClassEnded();
          }
          return;
        }
      } catch (error) {
        if (!statusErrorShownRef.current) {
          statusErrorShownRef.current = true;
          console.error("Could not refresh live-class state:", error);
          if (!error.response) {
            toast.error(
              "Cannot reach the class server. Reconnecting automatically...",
            );
          }
        }
        retryDelay = Math.min(retryDelay * 2, 15000);
      }
      if (active) timeoutId = window.setTimeout(refreshStream, retryDelay);
    };
    timeoutId = window.setTimeout(refreshStream, retryDelay);
    return () => {
      active = false;
      window.clearTimeout(timeoutId);
    };
  }, [
    liveKitToken,
    streamId,
    token,
    user?.accountType,
    navigate,
    handleClassEnded,
    ending,
  ]);

  const handleConnected = useCallback(async () => {
    if (user?.accountType !== "Student" || attendanceJoinedRef.current) return;
    try {
      await joinStreamAttendance(streamId, token);
      attendanceJoinedRef.current = true;
      toast.success("You are marked present for this class.");
    } catch (error) {
      console.error("Could not record class attendance:", error);
      toast.error(
        error.response?.data?.message || "Could not record your attendance.",
      );
    }
  }, [streamId, token, user?.accountType]);

  const handleDisconnected = useCallback(async () => {
    if (user?.accountType !== "Student") return;
    if (attendanceJoinedRef.current) {
      attendanceJoinedRef.current = false;
      try {
        await leaveStreamAttendance(streamId, token);
      } catch (error) {
        console.error("Could not close attendance session:", error);
      }
    }
    try {
      const response = await getStreamStatus(streamId, token);
      if (response?.data?.status === "ended") handleClassEnded();
    } catch (error) {
      console.error("Could not verify why the live room disconnected:", error);
    }
  }, [streamId, token, user?.accountType, handleClassEnded]);

  const startRecording = useCallback(async (room) => {
    try {
      if (recordingStartedRef.current || mediaRecorderRef.current) return;
      if (!window.MediaRecorder || !HTMLCanvasElement.prototype.captureStream) {
        throw new Error("Automatic recording is not supported by this browser.");
      }
      recordingStartedRef.current = true;
      recordedChunksRef.current = [];
      recordingFileRef.current = null;
      setRecordingFile(null);
      const recorder = await createRoomRecording(room, (file) => {
        if (!file) {
          toast.error("The class recording did not contain any media.");
        } else {
          recordedChunksRef.current = [file];
          toast.success("Class recording is ready to upload.");
        }
        recordingFileRef.current = file;
        setRecordingFile(file);
        setIsRecording(false);
        stopWaitersRef.current.forEach((resolve) => resolve(file));
        stopWaitersRef.current = [];
      });
      mediaRecorderRef.current = recorder;
      setIsRecording(true);
      toast.success("Class recording started automatically.");
    } catch (error) {
      recordingStartedRef.current = false;
      console.error("Could not start automatic class recording:", error);
      toast.error(error.message || "Could not start class recording.");
    }
  }, []);

  useEffect(() => {
    if (!isRecording) return undefined;
    const preventLeaving = (event) => {
      event.preventDefault();
      event.returnValue = "";
    };
    window.addEventListener("beforeunload", preventLeaving);
    return () => window.removeEventListener("beforeunload", preventLeaving);
  }, [isRecording]);

  const finishRecording = () => {
    const recorder = mediaRecorderRef.current;
    if (!recorder || recorder.state === "inactive") {
      return Promise.resolve(recordingFileRef.current);
    }
    return new Promise((resolve) => {
      stopWaitersRef.current.push(resolve);
      recorder.stop();
    });
  };

  const leaveLiveRoom = async () => {
    const isInstructor = user?.accountType === "Instructor";
    if (
      isInstructor &&
      stream.recordingEnabled &&
      !isRecording &&
      !recordingFileRef.current &&
      !window.confirm(
        "The recording is not ready. Leave the room without saving this recording segment? The class will remain live for students.",
      )
    ) {
      return false;
    }

    setLeaving(true);
    try {
      const file = isInstructor ? await finishRecording() : undefined;
      if (isInstructor && stream.recordingEnabled && !file) {
        const continueWithoutRecording = window.confirm(
          "No recording segment was produced. Leave the room and keep the class live without saving this segment?",
        );
        if (!continueWithoutRecording) return false;
      }

      const response = await leaveStream(streamId, token, file);
      if (!isInstructor) attendanceJoinedRef.current = false;
      toast.success(
        response.message || "You left the live room. The class remains active.",
      );
      navigate(-1);
      return true;
    } catch (error) {
      console.error("Could not leave the live class:", error);
      toast.error(
        error.response?.data?.message ||
          (error.code === "ERR_NETWORK"
            ? "Cannot reach the class server. Try leaving again after the server reconnects."
            : error.message),
      );
      return false;
    } finally {
      setLeaving(false);
    }
  };

  const finishLiveClass = async () => {
    if (
      stream.recordingEnabled &&
      !isRecording &&
      !recordingFileRef.current &&
      !window.confirm(
        "The recording is not ready. End the class without saving a replay?",
      )
    ) {
      return false;
    }
    classEndHandledRef.current = true;
    setEnding(true);
    try {
      const file = await finishRecording();
      if (
        stream.recordingEnabled &&
        !file &&
        !window.confirm(
          "The recording could not be finalized. End the class without a replay?",
        )
      ) {
        classEndHandledRef.current = false;
        return false;
      }
      const response = await endStream(streamId, token, file);
      toast.success(response.message);
      navigate(`/dashboard/live-dashboard/${streamId}`, { replace: true });
      return true;
    } catch (error) {
      classEndHandledRef.current = false;
      console.error("Could not end the live class:", error);
      toast.error(
        error.response?.data?.message ||
          (error.code === "ERR_NETWORK"
            ? "Cannot reach the class server. Make sure the backend is running, then try ending the class again."
            : error.message),
      );
      return false;
    } finally {
      setEnding(false);
    }
  };

  if (connectionError) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#0b111b] p-6 text-center text-[#F1F2FF]">
        <div className="max-w-lg rounded-2xl border border-[#2C333F] bg-[#161D29] p-8">
          <h1 className="text-xl font-bold">Unable to join this class</h1>
          <p className="mt-3 text-[#AFB2BF]">{connectionError}</p>
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="mt-6 rounded-lg bg-[#FFD60A] px-5 py-2 font-semibold text-[#161D29]"
          >
            Go back
          </button>
        </div>
      </div>
    );
  }

  if (!liveKitToken || !stream) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#0b111b] text-[#AFB2BF]">
        Connecting to your live class...
      </div>
    );
  }

  return (
    <LiveKitRoom
      token={liveKitToken}
      serverUrl={LIVEKIT_URL}
      connect
      video
      audio
      onConnected={handleConnected}
      onDisconnected={handleDisconnected}
      data-lk-theme="default"
    >
      <StreamRoomContent
        stream={stream}
        user={user}
        onEnd={finishLiveClass}
        onLeave={leaveLiveRoom}
        ending={ending}
        leaving={leaving}
        isRecording={isRecording}
        canRecord={Boolean(stream.recordingEnabled)}
        onStartRecording={startRecording}
        recordingFile={recordingFile}
      />
    </LiveKitRoom>
  );
};

export default LiveRoom;
