import { useState } from "react";
import { Link } from "react-router-dom";
import { AiOutlineClose } from "react-icons/ai";
import { sidebarLinksData } from "../../data/sidebarLinksData";
import bfinitLogo from "../../assets/logo/bfinit-logo.png";

export default function Sidebar({ showSidebar, toggleSidebar }) {
  const [showSublinks, setShowSublinks] = useState("");

  const toggleSublinks = (links) => {
    showSublinks ? setShowSublinks("") : setShowSublinks(links);
  };

  return (
    <nav
      className={`absolute right-0 top-0 h-screen max-h-[1080px] w-44 bg-white p-5 lg:static lg:block ${showSidebar ? "block" : "hidden"}`}
    >
      <div className="flex items-center justify-end">
        <AiOutlineClose
          onClick={toggleSidebar}
          className="cursor-pointer text-2xl lg:hidden"
        />
      </div>

      <Link to="/dashboard" className="hidden lg:block">
        <img src={bfinitLogo} alt="bfinit logo" className="mx-auto w-20" />
      </Link>

      <ul className="mt-10 space-y-4">
        {sidebarLinksData.map((navItem, i) => (
          <li key={i}>
            {navItem.link ? (
              <Link
                to={navItem.link}
                className="flex w-full items-center gap-1.5 text-lg"
              >
                {<navItem.Icon />} {navItem.title}
              </Link>
            ) : (
              <>
                <button
                  onClick={() => toggleSublinks(navItem.title)}
                  className="flex w-full items-center justify-between text-lg"
                >
                  <p className="flex items-center gap-1.5">
                    {<navItem.Icon />} {navItem.title}
                  </p>
                  <p>
                    {navItem.DropDownIcon && (
                      <navItem.DropDownIcon
                        className={`transition-transform duration-300 ease-in-out ${showSublinks ? "-rotate-180" : "rotate-0"}`}
                      />
                    )}
                  </p>
                </button>
                {showSublinks === navItem.title &&
                  navItem.subLinks.map((subLink, i) => (
                    <Link
                      key={i}
                      to={subLink.link}
                      className="mt-2 block w-full pl-6"
                    >
                      {subLink.title}
                    </Link>
                  ))}
              </>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
}
