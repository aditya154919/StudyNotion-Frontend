import { ACCOUNT_TYPE } from "../utils/constant"
export const sidebarLinks = [
  {
    id: 1,
    name: "My Profile",
    path: "/dashboard/myprofile",
    icon: "VscAccount",
  },
  {
    id: 2,
    name: "Dashboard",
    path: "/dashboard/instructor",
    type: ACCOUNT_TYPE.INSTRUCTOR,
    icon: "VscDashboard",
  },
  {
    id: 3,
    name: "My Courses",
    path: "/dashboard/my-courses",
    type: ACCOUNT_TYPE.INSTRUCTOR,
    icon: "VscVm",
  },
  {
    id: 4,
    name: "Add Course",
    path: "/dashboard/addcourse",
    type: ACCOUNT_TYPE.INSTRUCTOR,
    icon: "VscAdd",
  },
  {
    id: 5,
    name: "Enrolled Courses",
    path: "/dashboard/enrolled-courses",
    type: ACCOUNT_TYPE.STUDENT,
    icon: "VscMortarBoard",
  },
  {
    id: 6,
    name: "Your Cart",
    path: "/dashboard/cart",
    type: ACCOUNT_TYPE.STUDENT,
    icon: "VscHistory",
  },
  {
    id:7,
    name:"Start Stream",
    path:"/dashboard/livestream",
    type: ACCOUNT_TYPE.INSTRUCTOR,
    icon :"VscBroadcast"
  },
  {
    id:8,
    name:"Add Questions",
    path:"/dashboard/addQuestions",
    type: ACCOUNT_TYPE.INSTRUCTOR,
    icon: "VscAdd"
  },
  {
    id:9,
    name:"StudyCode",
    path:"/dashboard/code",
    type: ACCOUNT_TYPE.STUDENT,
    icon:"VscCodeOss"
  },
  {
    id:10,
    name:"Live class",
    path:"/dashboard/LiveRoom",
    type:ACCOUNT_TYPE.STUDENT,
    icon:"VscBroadcast"
  }
];
