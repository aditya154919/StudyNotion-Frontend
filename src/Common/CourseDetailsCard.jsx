import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  BadgeCheck,
  BookOpenCheck,
  CreditCard,
  Share2,
  ShieldCheck,
  ShoppingCart,
  UsersRound,
} from "lucide-react";
import toast from "react-hot-toast";
import copy from "copy-to-clipboard";
import { useNavigate } from "react-router";
import { ACCOUNT_TYPE } from "../utils/constant";
import { setAddToCart } from "../slices/Cartslice";

const CourseDetailsCard = ({
  course,
  setConfirmationModal,
  handleBuyCourse,
}) => {
  const { user } = useSelector((state) => state.profile);
  const { token } = useSelector((state) => state.auth);
  const { cart } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const enrolled = Boolean(
    user &&
      course?.studentEnrolled?.some((student) =>
        (typeof student === "string" ? student : student?._id) === user._id,
      ),
  );
  const inCart = Boolean(cart?.some((item) => item._id === course?._id));
  const instructor = user?.accountType === ACCOUNT_TYPE.INSTRUCTOR;

  const handleShare = async () => {
    const copied = copy(window.location.href);
    if (copied) {
      toast.success("Course link copied");
      return;
    }
    try {
      await navigator.clipboard.writeText(window.location.href);
      toast.success("Course link copied");
    } catch (error) {
      console.error("Could not copy course link:", error);
      toast.error("Could not copy the course link");
    }
  };

  const handleAddCart = () => {
    if (instructor) {
      toast.error("Instructor accounts cannot purchase courses.");
      return;
    }
    if (enrolled) {
      navigate("/dashboard/enrolled-courses");
      return;
    }
    if (!token) {
      setConfirmationModal({
        text1: "Sign in to add this course",
        text2: "Log in or create an account to save courses to your cart.",
        btn1Text: "Login",
        btn2Text: "Cancel",
        btn1Handler: () => navigate("/login"),
        btn2Handler: () => setConfirmationModal(null),
      });
      return;
    }
    dispatch(setAddToCart(course));
  };

  return (
    <aside className="overflow-hidden rounded-2xl border border-[#2C333F] bg-[#161D29] shadow-2xl shadow-black/30">
      <div className="relative aspect-[16/9] overflow-hidden bg-[#0b111b]">
        <img
          src={course?.thumbnail}
          alt={course?.courseName || "Course thumbnail"}
          className="h-full w-full object-cover"
        />
        <span className="absolute bottom-3 left-3 inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-[#000814]/80 px-3 py-1.5 text-xs font-semibold text-white backdrop-blur">
          <BadgeCheck size={14} className="text-emerald-300" />
          Lifetime access
        </span>
      </div>

      <div className="p-5 sm:p-6">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#838894]">
          Course price
        </p>
        <p className="mt-1 text-3xl font-bold tracking-tight text-white">
          {Number(course?.price) > 0
            ? `₹${Number(course.price).toLocaleString("en-IN")}`
            : "Free"}
        </p>

        <div className="mt-5 grid gap-2.5">
          {enrolled ? (
            <button
              type="button"
              onClick={() => navigate("/dashboard/enrolled-courses")}
              className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-300 px-4 py-3 font-bold text-[#000814] transition hover:bg-emerald-200"
            >
              <BookOpenCheck size={18} />
              Go to your course
            </button>
          ) : instructor ? (
            <button
              type="button"
              disabled
              className="w-full cursor-not-allowed rounded-xl bg-[#424854] px-4 py-3 font-bold text-gray-300"
            >
              Instructor account
            </button>
          ) : (
            <>
              <button
                type="button"
                onClick={handleBuyCourse}
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-amber-300 px-4 py-3 font-bold text-[#000814] transition hover:bg-amber-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-200 focus-visible:ring-offset-2 focus-visible:ring-offset-[#161D29]"
              >
                <CreditCard size={18} />
                Enroll now
              </button>
              <button
                type="button"
                onClick={handleAddCart}
                disabled={inCart}
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-[#424854] px-4 py-3 font-semibold text-[#F1F2FF] transition hover:border-violet-300/50 hover:bg-violet-300/5 disabled:cursor-not-allowed disabled:opacity-60"
              >
                <ShoppingCart size={18} />
                {inCart ? "Added to cart" : "Add to cart"}
              </button>
            </>
          )}
        </div>

        <p className="mt-3 text-center text-xs leading-5 text-[#838894]">
          Secure checkout · One-time payment · Learn at your own pace
        </p>

        <div className="mt-5 space-y-3 border-t border-[#2C333F] pt-4 text-sm text-[#C5C7D4]">
          <p className="inline-flex items-center gap-2">
            <BookOpenCheck size={16} className="text-violet-300" />
            Full course and lesson access
          </p>
          <p className="inline-flex items-center gap-2">
            <UsersRound size={16} className="text-cyan-200" />
            Join a learning community
          </p>
          <p className="inline-flex items-center gap-2">
            <ShieldCheck size={16} className="text-emerald-300" />
            Secure payment processing
          </p>
        </div>

        <button
          type="button"
          onClick={handleShare}
          className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-lg py-2 text-sm font-semibold text-amber-200 transition hover:bg-amber-300/5"
        >
          <Share2 size={16} />
          Share course
        </button>
      </div>
    </aside>
  );
};

export default CourseDetailsCard;
