import { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Shared/Sidebar";
import TopNavbar from "../components/Shared/TopNavbar";

export default function Main() {
  const [showSidebar, setShowSidebar] = useState(false);

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  return (
    <main className="relative mx-auto flex max-w-[1536px] flex-col bg-white md:flex-row">
      <TopNavbar toggleSidebar={toggleSidebar} />
      <Sidebar showSidebar={showSidebar} toggleSidebar={toggleSidebar} />
      <Outlet />
    </main>
  );
}
