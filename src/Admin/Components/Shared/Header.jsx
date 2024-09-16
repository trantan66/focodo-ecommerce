import {
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  Popover,
  PopoverButton,
  PopoverPanel,
} from "@headlessui/react";
import React from "react";
import { HiOutlineBell, HiOutlineChatAlt, HiOutlineCog } from "react-icons/hi";
import { ImProfile } from "react-icons/im";
import { IoIosSearch } from "react-icons/io";
import { RiLogoutBoxRLine } from "react-icons/ri";
import { Link } from "react-router-dom";

function Header() {
  return (
    <div className="bg-white h-16 px-4 flex justify-between items-center border-b border-gray-200">
      <div className="relative">
        <IoIosSearch
          fontSize={20}
          className="text-gray-400 absolute left-3 top-1/2 -translate-y-1/2"
        />
        <input
          type="text"
          placeholder="Search..."
          className="text-sm focus:outline-none border border-gray-300 w-[24rem] h-10 pl-10 pr-4 rounded-sm"
        />
      </div>

      <div className="flex items-center gap-4 mr-2">
        <Popover className="relative">
          <PopoverButton className="p-1.5 rounded-sm inline-flex items-center text-gray-700 hover:text-gray-900 focus:outline-none active:bg-gray-100">
            <HiOutlineChatAlt fontSize={24} />
            <div className="absolute bottom-0 right-0 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center text-white text-xs">
              3
            </div>
          </PopoverButton>

          <PopoverPanel className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
            <div className="py-2">
              <Link
                to="analytics"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                Analytics
              </Link>
              <p className="pl-8 text-xs text-gray-500">
                View detailed reports
              </p>

              <Link
                to="engagement"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                Engagement
              </Link>
              <p className="pl-8 text-xs text-gray-500">
                Track user interactions
              </p>

              <Link
                to="security"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                Security
              </Link>
              <p className="pl-8 text-xs text-gray-500">
                Manage security settings
              </p>

              <Link
                to="/integrations"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                Integrations
              </Link>
              <p className="pl-8 text-xs text-gray-500">
                Connect other services
              </p>
            </div>
          </PopoverPanel>
        </Popover>

        <Popover className="relative">
          <PopoverButton className="p-1.5 rounded-sm inline-flex items-center text-gray-700 hover:text-gray-900 focus:outline-none active:bg-gray-100">
            <HiOutlineBell fontSize={24} />
            <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-red-500 rounded-full"></div>
          </PopoverButton>

          <PopoverPanel className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
            <div className="py-2">
              <Link
                to="/notifications"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                New Notification
              </Link>
              <p className="pl-8 text-xs text-gray-500">
                You have 5 new notifications
              </p>

              <Link
                to="/alerts"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                System Alerts
              </Link>
              <p className="pl-8 text-xs text-gray-500">
                3 alerts from the system
              </p>
            </div>
          </PopoverPanel>
        </Popover>

        <Menu as="div" className="relative">
          <MenuButton className="focus:outline-none rounded-full inline-flex items-center p-1.5 active:bg-gray-100">
            <img
              src="https://cdn.tuoitre.vn/471584752817336320/2024/6/3/doraemon-3-17173722166781704981911.jpeg"
              alt="User Avatar"
              className="w-10 h-10 rounded-full object-cover"
            />
          </MenuButton>

          <MenuItems className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10">
            <div className="py-2">
              <MenuItem>
                {({ active }) => (
                  <Link
                    to="profile"
                    className={`flex items-center px-4 py-2 text-sm text-gray-700 ${
                      active ? "bg-gray-100" : ""
                    }`}
                  >
                    <ImProfile className="mr-2" fontSize={18} />
                    My profile
                  </Link>
                )}
              </MenuItem>
              <MenuItem>
                {({ active }) => (
                  <Link
                    to="settings"
                    className={`flex items-center px-4 py-2 text-sm text-gray-700 ${
                      active ? "bg-gray-100" : ""
                    }`}
                  >
                    <HiOutlineCog className="mr-2" fontSize={18} />
                    Settings
                  </Link>
                )}
              </MenuItem>
              <MenuItem>
                {({ active }) => (
                  <Link
                    to="/"
                    className={`flex items-center px-4 py-2 text-sm text-gray-700 ${
                      active ? "bg-gray-100" : ""
                    }`}
                  >
                    <RiLogoutBoxRLine className="mr-2" fontSize={18} />
                    Signout
                  </Link>
                )}
              </MenuItem>
            </div>
          </MenuItems>
        </Menu>
      </div>
    </div>
  );
}

export default Header;
