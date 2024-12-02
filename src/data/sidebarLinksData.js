import { MdDashboard } from "react-icons/md";
import { PiNotebookDuotone } from "react-icons/pi";
import { IoIosArrowDown } from "react-icons/io";

export const sidebarLinksData = [
  {
    title: "Category",
    link: "/dashboard/category",
    Icon: MdDashboard,
  },
  {
    title: "Blogs",
    Icon: PiNotebookDuotone,
    DropDownIcon: IoIosArrowDown,
    subLinks: [
      {
        title: "Manage Blogs",
        link: "/dashboard",
      },
      {
        title: "Add Blogs",
        link: "/dashboard/add-blogs",
      },
    ],
  },
];
