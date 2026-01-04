import * as Icons from "react-icons/vsc";
import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { resetAll } from "../../../slices/Courseslice";

const Sidebarlinks = ({ link, iconName }) => {
  const Icon = Icons[iconName];
  const dispatch = useDispatch();

  return (
    <NavLink
      to={link.path}
      onClick={() => dispatch(resetAll())}
      className={({ isActive }) =>
        `relative px-8 py-2 text-sm font-medium transition-all duration-200 ${
          isActive
            ? "bg-yellow-800 text-yellow-200"
            : "bg-opacity-0 text-[#999DAA]"
        }`
      }
    >
      {({ isActive }) => (
        <>
          <span
            className={`absolute left-0 top-0 h-full w-[0.15rem] bg-[#FFD60A] ${
              isActive ? "opacity-100" : "opacity-0"
            }`}
          ></span>

          <div className="flex items-center gap-x-2">
            <Icon className="text-lg" />
            <span>{link.name}</span>
          </div>
        </>
      )}
    </NavLink>
  );
};

export default Sidebarlinks;
