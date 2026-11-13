import React, { useState } from "react";
import * as Icons from "react-icons/vsc";
import { NavLink, useNavigate } from "react-router-dom";
import { MoreHorizontal, Settings, X } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { sidebarLinks } from "../../../data/dashboard-links";
import Sidebarlinks from "./Sidebarlinks";
import { VscSignOut } from "react-icons/vsc";
import ConfirmationModal from "../../../Common/ConfirmationModal";
import { logout } from "../../../Services/operations/Authapi";
import { resetAll } from "../../../slices/Courseslice";
import { ACCOUNT_TYPE } from "../../../utils/constant";

const primaryLinkIds = {
  [ACCOUNT_TYPE.STUDENT]: [5, 10, 6, 1],
  [ACCOUNT_TYPE.INSTRUCTOR]: [2, 3, 7, 1],
};

const mobileLabels = {
  1: "Profile",
  2: "Home",
  3: "Courses",
  5: "Learning",
  6: "Cart",
  7: "Go live",
  10: "Live",
};

const Sidebar = () => {
  const { user, loading: profileLoading } = useSelector(
    (state) => state.profile,
  );
  const { loading: authLoading } = useSelector((state) => state.auth);
  const [confirmationModal, setConfirmationModal] = useState(null);
  const [moreOpen, setMoreOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const availableLinks = sidebarLinks.filter(
    (link) => !link.type || user?.accountType === link.type,
  );
  const primaryIds = primaryLinkIds[user?.accountType] || [1];
  const primaryLinks = primaryIds
    .map((id) => availableLinks.find((link) => link.id === id))
    .filter(Boolean);
  const moreLinks = availableLinks.filter(
    (link) => !primaryIds.includes(link.id),
  );

  const handleLogout = () => {
    setMoreOpen(false);
    setConfirmationModal({
      text1: "Are you sure?",
      text2: "You will be logged out of your account.",
      btn1Text: "Logout",
      btn2Text: "Cancel",
      btn1Handler: () => dispatch(logout(navigate)),
      btn2Handler: () => setConfirmationModal(null),
    });
  };

  if (profileLoading || authLoading) {
    return (
      <div className="hidden h-[calc(100vh-3.5rem)] w-55 shrink-0 place-items-center border-r border-[#2C333F] bg-[#161D29] md:grid">
        <div className="spinner" />
      </div>
    );
  }

  return (
    <>
      <aside className="hidden h-[calc(100vh-3.5rem)] w-55 shrink-0 flex-col gap-2 overflow-y-auto border-r border-[#2C333F] bg-[#161D29] py-8 md:flex">
        <div className="flex flex-col">
          {availableLinks.map((link) => (
            <Sidebarlinks key={link.id} link={link} iconName={link.icon} />
          ))}
        </div>
        <div className="mx-auto my-5 h-px w-[85%] bg-[#424854]" />
        <Sidebarlinks
          link={{ name: "Settings", path: "/dashboard/settings" }}
          iconName="VscSettingsGear"
        />
        <button
          type="button"
          onClick={handleLogout}
          className="px-8 py-2 text-left text-sm font-medium text-[#838894] transition hover:text-white"
        >
          <span className="flex items-center gap-x-2">
            <VscSignOut className="text-lg" />
            <span>Logout</span>
          </span>
        </button>
      </aside>

      <nav
        aria-label="Dashboard navigation"
        className="fixed inset-x-0 bottom-0 z-50 border-t border-[#2C333F] bg-[#111827]/95 px-1 pb-[env(safe-area-inset-bottom)] pt-1 shadow-[0_-8px_24px_rgba(0,0,0,0.28)] backdrop-blur-xl md:hidden"
      >
        <div className="mx-auto grid max-w-lg grid-cols-5">
          {primaryLinks.map((link) => {
            const Icon = Icons[link.icon];
            return (
              <NavLink
                key={link.id}
                to={link.path}
                onClick={() => dispatch(resetAll())}
                aria-label={mobileLabels[link.id] || link.name}
                className={({ isActive }) =>
                  `relative flex min-w-0 flex-col items-center justify-center gap-1 px-1 py-2 text-[10px] font-medium transition sm:text-xs ${
                    isActive ? "text-amber-300" : "text-[#838894]"
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    {isActive && (
                      <span className="absolute left-1/2 top-0 h-0.5 w-8 -translate-x-1/2 rounded-full bg-amber-300" />
                    )}
                    {Icon && <Icon aria-hidden="true" className="text-xl" />}
                    <span className="max-w-full truncate">
                      {mobileLabels[link.id] || link.name}
                    </span>
                  </>
                )}
              </NavLink>
            );
          })}
          <button
            type="button"
            aria-expanded={moreOpen}
            aria-controls="dashboard-more-menu"
            onClick={() => setMoreOpen((open) => !open)}
            className={`flex min-w-0 flex-col items-center justify-center gap-1 px-1 py-2 text-[10px] font-medium transition sm:text-xs ${
              moreOpen ? "text-amber-300" : "text-[#838894]"
            }`}
          >
            {moreOpen ? <X size={21} /> : <MoreHorizontal size={21} />}
            <span>More</span>
          </button>
        </div>
      </nav>

      {moreOpen && (
        <div
          className="fixed inset-0 z-[60] bg-black/55 md:hidden"
          onClick={() => setMoreOpen(false)}
          role="presentation"
        >
          <section
            id="dashboard-more-menu"
            aria-label="More dashboard options"
            className="absolute inset-x-0 bottom-0 max-h-[75dvh] overflow-y-auto rounded-t-3xl border border-[#2C333F] bg-[#161D29] px-4 pb-24 pt-3 shadow-2xl"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="mx-auto mb-4 h-1 w-10 rounded-full bg-[#424854]" />
            <h2 className="mb-3 text-sm font-semibold text-[#C5C7D4]">
              More options
            </h2>
            <div className="grid gap-2">
              {moreLinks.map((link) => {
                const Icon = Icons[link.icon];
                return (
                  <NavLink
                    key={link.id}
                    to={link.path}
                    onClick={() => {
                      dispatch(resetAll());
                      setMoreOpen(false);
                    }}
                    className={({ isActive }) =>
                      `flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium ${
                        isActive
                          ? "bg-amber-300/10 text-amber-200"
                          : "text-[#C5C7D4] hover:bg-white/5"
                      }`
                    }
                  >
                    {Icon && <Icon aria-hidden="true" className="text-lg" />}
                    {link.name}
                  </NavLink>
                );
              })}
              <NavLink
                to="/dashboard/settings"
                onClick={() => {
                  dispatch(resetAll());
                  setMoreOpen(false);
                }}
                className={({ isActive }) =>
                  `flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium ${
                    isActive
                      ? "bg-amber-300/10 text-amber-200"
                      : "text-[#C5C7D4] hover:bg-white/5"
                  }`
                }
              >
                <Settings size={18} />
                Settings
              </NavLink>
              <button
                type="button"
                onClick={handleLogout}
                className="flex items-center gap-3 rounded-xl px-4 py-3 text-left text-sm font-medium text-rose-300 hover:bg-rose-400/10"
              >
                <VscSignOut className="text-lg" />
                Logout
              </button>
            </div>
          </section>
        </div>
      )}

      {confirmationModal && (
        <ConfirmationModal modelData={confirmationModal} />
      )}
    </>
  );
};

export default Sidebar;
