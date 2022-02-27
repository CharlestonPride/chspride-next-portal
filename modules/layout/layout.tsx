import {
  faEnvelope,
  faHouse,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";
import { PropsWithChildren, useState } from "react";
import Nav from "./navbar";
import { Sidebar, SideNavBarItem } from "./sidebar";

const Layout = ({ children, title }: PropsWithChildren<{ title: string }>) => {
  const [pinned, setPinned] = useState(false);
  const handleToggle = () => setPinned(!pinned);

  return (
    <body
      className={`g-sidenav-show bg-gray-100 ${
        pinned ? "g-sidenav-pinned" : ""
      }`}
    >
      <Sidebar pinned={pinned}>
        <SideNavBarItem label="Dashboard" href="/dashboard" icon={faHouse} />
        <SideNavBarItem
          label="Applications"
          href="/applications"
          icon={faEnvelope}
        />
        <SideNavBarItem label="Team" href="/team" icon={faUsers} />
      </Sidebar>
      <main className="main-content position-relative max-height-vh-100 h-100 mt-1 border-radius-lg">
        <Nav title={title} onToggle={handleToggle} />
        {children}
      </main>
    </body>
  );
};

export default Layout;
