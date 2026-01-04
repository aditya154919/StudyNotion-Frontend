import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { sidebarLinks } from "../../../data/dashboard-links";
import Sidebarlinks from "./Sidebarlinks";
import { VscSignOut } from "react-icons/vsc";
import ConfirmationModal from "../../../Common/ConfirmationModal";
import { logout } from "../../../Services/operations/Authapi";

const Sidebar = () => {
  const { user, loading: profileLoading } = useSelector(
    (state) => state.profile
  );
  const [confirmationModal, setConfirmationModal] = useState(null)
  const { loading: authLoading } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  if (profileLoading || authLoading) {
    return (
      <div className="grid h-[calc(100vh-3.5rem)] min-w-55 items-center border-r border-r-[#2C333F] bg-[#161D29]">
        <div className="spinner"></div>
      </div>
    );
  }
  return (
    <>
    <div className="flex h-[calc(100vh-3.5rem)] min-w-55 flex-col gap-2 border-r border-r-[#2C333F] bg-[#161D29] py-10">
      <div className="flex flex-col">
        {sidebarLinks.map((link) => {
          if (link.type && user?.accountType !== link.type) {
            return null;
          }
          return (
            <Sidebarlinks key={link.id} link={link} iconName={link.icon} />
          );
        })}
      </div>
      <div className="mx-auto w-[85%] mt-5  mb-6 h-px bg-[#2C333F] border border-gray-400"></div>
      <Sidebarlinks
        link={{ name: "Settings", path: "/dashboard/settings" }}
        iconName="VscSettingsGear"
      />

       <button
            onClick={() =>
              setConfirmationModal({
                text1: "Are you sure?",
                text2: "You will be logged out of your account.",
                btn1Text: "Logout",
                btn2Text: "Cancel",
                btn1Handler: () => dispatch(logout(navigate)),
                btn2Handler: () => setConfirmationModal(null),
              })
            }
            className="px-8 py-2 text-sm cursor-pointer font-medium text-[#838894]"
          >
            <div className="flex items-center gap-x-2">
              <VscSignOut className="text-lg" />
              <span>Logout</span>
            </div>
          </button>
    </div>
    {confirmationModal && <ConfirmationModal modelData={confirmationModal} />}
    </>
  );
};

export default Sidebar;
