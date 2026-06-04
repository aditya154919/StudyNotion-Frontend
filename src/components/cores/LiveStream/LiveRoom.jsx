import "@livekit/components-styles";
import { LiveKitRoom, VideoConference } from "@livekit/components-react";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import {
  endStream,
  getStreamData,
  getToken,
  uploadRecording,
} from "../../../Services/operations/Streamapi";
import { useSelector } from "react-redux";

const LiveRoom = () => {
  const { roomId, streamId,sectionId } = useParams();
  const { user } = useSelector((state) => state.profile);
  const { token } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const mediaRecorderRef = useRef(null);
  const recordedChunksRef = useRef([]);
  const screenStreamRef = useRef(null);

  const [toke, setToke] = useState(null);
  const [stream,setStream]  = useState(null);
  const name = `${user.firstName} ${user.lastName}`;

  useEffect(() => {
    const fetchToken = async () => {
      try {
        const res = await getToken(roomId, name);

        console.log("Token Response:", res);

        setToke(res);
      } catch (error) {
        console.log(error);
      }
    };

    if (roomId) {
      fetchToken();
    }
  }, [roomId]);

  const handleEndStream = async () => {
    try {
      await endStream(roomId, token);

      if (mediaRecorderRef.current) {
        await new Promise((resolve) => {
          mediaRecorderRef.current.onstop = async () => {
            const blob = new Blob(recordedChunksRef.current, {
              type: "video/webm",
            });

            console.log("Blob Size:", blob.size);

            const file = new File([blob], `recording-${Date.now()}.webm`, {
              type: "video/webm",
            });
            const formData = new FormData();

            formData.append("title", stream.title);
            formData.append("description",stream.description);
            formData.append("file",file)
            formData.append("sectionId", sectionId);

            await uploadRecording(formData, token);

            console.log("Recording File:", file);

            const url = URL.createObjectURL(blob);

            // Test recording
            window.open(url, "_blank");

            

            // Optional auto download
            const a = document.createElement("a");
            a.href = url;
            a.download = file.name;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);

            if (screenStreamRef.current) {
              screenStreamRef.current
                .getTracks()
                .forEach((track) => track.stop());
            }

            resolve();
          };

          mediaRecorderRef.current.stop();
        });
      }

    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const interval = setInterval(async () => {
      const s = await getStreamData(streamId, token);
      setStream(s.data);

      if (s?.data?.status === "ended") {
        clearInterval(interval);

        alert("Class Ended");

        if (user.accountType === "Student") {
          navigate("/dashboard/enrolled-courses");
        } else {
          navigate("/dashboard/Live-Analytic");
        }
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [streamId, token, navigate, user.accountType]);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getDisplayMedia({
        video: true,
        audio: true,
      });

      screenStreamRef.current = stream;

      const mediaRecorder = new MediaRecorder(stream);

      recordedChunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          recordedChunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstart = () => {
        console.log("Recording Started");
      };

      mediaRecorder.start(1000);

      mediaRecorderRef.current = mediaRecorder;
    } catch (error) {
      console.log("Recording Error:", error);
    }
  };
  useEffect(() => {
    if (user?.accountType === "Instructor") {
      startRecording();
    }
  }, [user]);
  if (!toke) {
    return (
      <div className="text-white flex justify-center items-center min-h-screen">
        Connecting to stream...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#161D29] text-white">
      <LiveKitRoom
        token={toke}
        serverUrl="wss://studynotion-ejyi4njq.livekit.cloud"
        connect
        video
        audio
      >
        <div className="text-white">
          <VideoConference />
        </div>
      </LiveKitRoom>
      {user?.accountType === "Instructor" && (
        <button
          onClick={handleEndStream}
          className="bg-[#FFD60A] text-black px-4 py-2 rounded-lg font-medium"
        >
          End Stream
        </button>
      )}
    </div>
  );
};

export default LiveRoom;
