import React from "react";
import { FcComboChart } from "react-icons/fc";
import {
  DASHBOARD_SIDEBAR_BOTTOM_LINKS,
  DASHBOARD_SIDEBAR_LINKS,
} from "../../Lib/Const/Navigation";
import { Link, useLocation } from "react-router-dom";
import classNames from "classnames";
import { RiLogoutBoxRLine } from "react-icons/ri";

const linkClass =
  "flex item gap-2 font-light px-3 py-2 hover:bg-neutral-700 rounded-sm";

function Sidebar() {
  return (
    <div className="bg-neutral-900 w-60 p-4 flex flex-col text-white">
      <div className="flex items-center gap-2 px-1 py-3">
        <FcComboChart size={24} />
        <span className="text-neutral-100 text-lg">Focodo Admin</span>
      </div>
      <div className="flex-1 py-8 flex flex-col gap-0.5">
        {DASHBOARD_SIDEBAR_LINKS.map((item) => (
          <SidebarLink key={item.key} item={item} />
        ))}
      </div>
      <div className="flex flex-col gap-0.5 pt-2 border-t border-neutral-700">
        {DASHBOARD_SIDEBAR_BOTTOM_LINKS.map((item) => (
          <SidebarLink key={item.key} item={item} />
        ))}
        <div className={linkClass}>
          <span className="flex items-center text-red-700">
            <RiLogoutBoxRLine className="text-red-700 mr-1.5" />
            Logout
          </span>
        </div>
      </div>
    </div>
  );
}

function SidebarLink({ item }) {
  const { pathname } = useLocation();
  return (
    <Link
      to={item.path}
      className={classNames(
        pathname === item.path ? "text-neutral-400" : "text-white",
        linkClass
      )}
    >
      <span className="flex items-center">{item.icon}</span>
      {item.label}
    </Link>
  );
}

export default Sidebar;
