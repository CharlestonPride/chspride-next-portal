import { faEnvelope, IconDefinition } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { PropsWithChildren, ReactNode } from "react";
import { useRouter } from "next/router";

interface NavItem {
  label: string;
  icon: IconDefinition;
  href: string;
}

const SideNavBarItem = ({ label, icon, href }: NavItem) => {
  const router = useRouter();
  const active = router.asPath === href + "/";
  return (
    <li className="nav-item">
      <Link href={href} passHref>
        <a className={`nav-link ${active ? "active" : ""}`}>
          <div className="icon icon-shape icon-sm shadow border-radius-md bg-white text-center me-2 d-flex align-items-center justify-content-center">
            <FontAwesomeIcon
              icon={icon}
              size="lg"
              color={active ? "white" : ""}
            />
          </div>
          <span className="nav-link-text ms-1">{label}</span>
        </a>
      </Link>
    </li>
  );
};

const SideNavBarSection = () => {
  return (
    <li className="nav-item mt-3">
      <h6 className="ps-4 ms-2 text-uppercase text-xs font-weight-bolder opacity-6">
        Account pages
      </h6>
    </li>
  );
};

const Sidebar = ({ children }: PropsWithChildren<{}>) => {
  return (
    <aside
      className="sidenav navbar navbar-vertical navbar-expand-xs border-0 border-radius-xl my-3 fixed-start ms-3 "
      id="sidenav-main"
    >
      <div className="sidenav-header">
        <i
          className="fas fa-times p-3 cursor-pointer text-secondary opacity-5 position-absolute end-0 top-0 d-none d-xl-none"
          aria-hidden="true"
          id="iconSidenav"
        ></i>
        <span className="navbar-brand m-1">
          <h4 className="ms-1 font-weight-bold text-primary text-gradient">
            Charleston Pride
          </h4>
          <h3 className="ms-1 font-weight-bold text-primary text-gradient">
            Portal
          </h3>
        </span>
      </div>
      <hr className="horizontal dark mt-1" />
      <div
        className="collapse navbar-collapse  w-auto  max-height-vh-100 h-100"
        id="sidenav-collapse-main"
      >
        <ul className="navbar-nav">{children}</ul>
      </div>
    </aside>
  );
};

export { Sidebar, SideNavBarItem, SideNavBarSection };
