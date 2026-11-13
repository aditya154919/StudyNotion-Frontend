import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ArrowUpRight, CircleDot, Users, Video } from "lucide-react";
import toast from "react-hot-toast";
import { getLiveRoom } from "../Services/operations/Streamapi";

const LiveRoom = () => {
  const { token } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const [liveClasses, setLiveClasses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    let loadingRequest = false;
    const loadClasses = async (initialLoad = false) => {
      if (loadingRequest) return;
      loadingRequest = true;
      try {
        const classes = await getLiveRoom(token);
        if (active) setLiveClasses(classes);
      } catch (error) {
        if (active && initialLoad) {
          toast.error(
            error.response?.data?.message || "Could not load live classes.",
          );
        } else if (active) {
          console.error("Could not refresh live classes:", error);
        }
      } finally {
        loadingRequest = false;
        if (active && initialLoad) setLoading(false);
      }
    };
    if (token) {
      loadClasses(true);
      const refreshWhenVisible = () => {
        if (document.visibilityState === "visible") loadClasses();
      };
      const intervalId = window.setInterval(() => loadClasses(), 5000);
      window.addEventListener("focus", refreshWhenVisible);
      document.addEventListener("visibilitychange", refreshWhenVisible);
      return () => {
        active = false;
        window.clearInterval(intervalId);
        window.removeEventListener("focus", refreshWhenVisible);
        document.removeEventListener("visibilitychange", refreshWhenVisible);
      };
    }
    setLoading(false);
    return () => {
      active = false;
    };
  }, [token]);

  if (loading) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center text-[#AFB2BF]">
        Finding live classes...
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl space-y-6 text-[#F1F2FF]">
      <header className="rounded-2xl border border-[#2C333F] bg-gradient-to-br from-[#202b3d] to-[#161D29] p-6 sm:p-8">
        <p className="mb-2 text-sm font-semibold uppercase tracking-[0.18em] text-[#FFD60A]">
          Learn together
        </p>
        <h1 className="text-3xl font-bold sm:text-4xl">Live classes</h1>
        <p className="mt-3 max-w-2xl text-[#AFB2BF]">
          Join a live session from one of your enrolled courses. Your attendance
          is recorded automatically when you connect.
        </p>
        <div className="mt-5 inline-flex items-center gap-2 rounded-full bg-[#0f1724] px-4 py-2 text-sm text-[#AFB2BF]">
          <CircleDot className="h-4 w-4 text-red-400" />
          {liveClasses.length} live{" "}
          {liveClasses.length === 1 ? "class" : "classes"} available
        </div>
      </header>

      {liveClasses.length === 0 ? (
        <section className="rounded-2xl border border-dashed border-[#424854] bg-[#161D29] px-6 py-14 text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[#202938] text-[#FFD60A]">
            <Video className="h-7 w-7" />
          </div>
          <h2 className="mt-5 text-xl font-bold">No classes are live right now</h2>
          <p className="mx-auto mt-2 max-w-md text-[#AFB2BF]">
            When an instructor starts a class for one of your enrolled courses,
            it will appear here.
          </p>
        </section>
      ) : (
        <div className="grid gap-5 md:grid-cols-2">
          {liveClasses.map((liveClass) => (
            <article
              key={liveClass._id}
              className="overflow-hidden rounded-2xl border border-[#2C333F] bg-[#161D29] shadow-lg"
            >
              <div className="relative h-44 bg-[#202938]">
                {liveClass.course?.thumbnail ? (
                  <img
                    src={liveClass.course.thumbnail}
                    alt={liveClass.course.courseName}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center text-[#838894]">
                    <Video className="h-12 w-12" />
                  </div>
                )}
                <span className="absolute left-4 top-4 inline-flex items-center gap-2 rounded-full bg-red-500 px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-white shadow">
                  <span className="h-2 w-2 animate-pulse rounded-full bg-white" />
                  Live now
                </span>
              </div>
              <div className="p-5">
                <p className="text-sm font-medium text-[#FFD60A]">
                  {liveClass.course?.courseName}
                </p>
                <h2 className="mt-1 text-xl font-bold">{liveClass.title}</h2>
                <p className="mt-2 line-clamp-2 min-h-10 text-sm text-[#AFB2BF]">
                  {liveClass.description}
                </p>
                <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-[#2C333F] pt-4">
                  <div className="flex items-center gap-2 text-sm text-[#AFB2BF]">
                    <Users className="h-4 w-4" />
                    {liveClass.instructor?.firstName}{" "}
                    {liveClass.instructor?.lastName}
                  </div>
                  <button
                    type="button"
                    onClick={() =>
                      navigate(
                        `/live-room/${liveClass.roomId}/${liveClass._id}/${liveClass.section}`,
                      )
                    }
                    className="inline-flex items-center gap-2 rounded-lg bg-[#FFD60A] px-4 py-2.5 font-bold text-[#161D29] transition hover:bg-yellow-300"
                  >
                    Join class
                    <ArrowUpRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
};

export default LiveRoom;
