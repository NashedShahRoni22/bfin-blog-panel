import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineClose } from "react-icons/ai";
import { sidebarLinksData } from "../../data/sidebarLinksData";
import bfinitLogo from "../../assets/logo/bfinit-logo.png";
import { LiaSpinnerSolid } from "react-icons/lia";

export default function Sidebar({ showSidebar, toggleSidebar }) {
  const accessToken = localStorage.getItem("bfinitBlogAccessToken");
  const [showSublinks, setShowSublinks] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Toggle Sublinks on click
  const toggleSublinks = (links) => {
    showSublinks ? setShowSublinks("") : setShowSublinks(links);
  };

  // Handle Logout
  const handleLogout = () => {
    setLoading(true);
    fetch("https://api.blog.bfinit.com/api/v1/logout", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    })
    .then((res) => res.json())
    .then((data) => {
      if(data.status === "success"){
        setLoading(false);
        navigate("/");
        localStorage.removeItem("bfinitBlogAccessToken");
      }
      setLoading(false);
    })
  };

  return (
    <nav
      className={`bg-subtle-white fixed right-0 top-0 z-10 h-screen max-h-[1080px] min-w-72 p-5 lg:static lg:block ${showSidebar ? "block" : "hidden"}`}
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
                className="flex w-full items-center gap-1.5 text-lg text-neutral-700 hover:text-neutral-900"
              >
                {<navItem.Icon className="text-primary" />} {navItem.title}
              </Link>
            ) : (
              <>
                <button
                  onClick={() => toggleSublinks(navItem.title)}
                  className="group flex w-full items-center justify-between text-lg"
                >
                  <p className="flex items-center gap-1.5 text-neutral-700 group-hover:text-neutral-900">
                    {<navItem.Icon className="text-primary" />} {navItem.title}
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

        <button disabled={loading} onClick={handleLogout} className={`flex items-center justify-center gap-2 text-lg font-semibold transition-all duration-200 ease-in-out text-white w-full rounded-md py-2 ${loading ? "bg-primary/70" : "bg-primary hover:bg-primary-hover"}`}>Log out {loading && <LiaSpinnerSolid className="animate-spin text-2xl text-white" />}</button>
      </ul>
    </nav>
  );
}
