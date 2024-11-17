import { MdDashboard } from "react-icons/md";
import { PiNotebookDuotone } from "react-icons/pi";
import { IoIosArrowDown } from "react-icons/io";

export const sidebarLinksData = [
  {
    title: "Dashboard",
    link: "/dashboard",
    Icon: MdDashboard,
  },
  {
    title: "Blogs",
    Icon: PiNotebookDuotone,
    DropDownIcon: IoIosArrowDown,
    subLinks: [
      {
        title: "Manage Blogs",
        link: "/dashboard/manage-blogs",
      },
      {
        title: "Add Blogs",
        link: "/dashboard/add-blogs",
      },
    ],
  },
];
