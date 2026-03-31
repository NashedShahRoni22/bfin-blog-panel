import { PiNotebookDuotone } from "react-icons/pi";
import { IoIosArrowDown, IoMdGlobe } from "react-icons/io";
import { FaShoppingCart } from "react-icons/fa";

export const sidebarLinksData = [
  {
    title: "Orders",
    link: "/dashboard/orders",
    Icon: FaShoppingCart,
  },
  {
    title: "Websites",
    link: "/dashboard/websites",
    Icon: IoMdGlobe,
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
