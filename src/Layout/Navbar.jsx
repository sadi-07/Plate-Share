import React, { useContext, Fragment } from "react";
import { Link, NavLink } from "react-router";
import { Menu, Transition } from "@headlessui/react";
import logo from "../assets/Logo.png";
import { AuthContext } from "../Contetexts/AuthProvider";

const Navbar = () => {
  const { user, removeUser } = useContext(AuthContext);

  const handleLogout = () => {
    removeUser();
  };

  // Common links
  const commonLinks = (
    <>
      <li>
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive ? "text-primary font-semibold" : "hover:text-primary"
          }
        >
          Home
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/availableFoods"
          className={({ isActive }) =>
            isActive ? "text-primary font-semibold" : "hover:text-primary"
          }
        >
          Available Foods
        </NavLink>
      </li>
    </>
  );

  // Private links for logged-in users
  const privateLinks = (
    <>
      <Menu.Item>
        {({ active }) => (
          <Link
            to="/addFood"
            className={`${
              active ? "bg-gray-100 dark:bg-gray-700" : ""
            } group flex rounded-md items-center w-full px-4 py-2 text-sm text-gray-900 dark:text-gray-100`}
          >
            Add Food
          </Link>
        )}
      </Menu.Item>
      <Menu.Item>
        {({ active }) => (
          <Link
            to="/manageMyFoods"
            className={`${
              active ? "bg-gray-100 dark:bg-gray-700" : ""
            } group flex rounded-md items-center w-full px-4 py-2 text-sm text-gray-900 dark:text-gray-100`}
          >
            Manage My Foods
          </Link>
        )}
      </Menu.Item>
      <Menu.Item>
        {({ active }) => (
          <Link
            to="/myFoodRequests"
            className={`${
              active ? "bg-gray-100 dark:bg-gray-700" : ""
            } group flex rounded-md items-center w-full px-4 py-2 text-sm text-gray-900 dark:text-gray-100`}
          >
            My Food Requests
          </Link>
        )}
      </Menu.Item>
      <Menu.Item>
        {({ active }) => (
          <button
            onClick={handleLogout}
            className={`${
              active ? "bg-gray-100 dark:bg-gray-700" : ""
            } group flex rounded-md items-center w-full px-4 py-2 text-sm text-red-600 dark:text-red-400`}
          >
            Logout
          </button>
        )}
      </Menu.Item>
    </>
  );

  return (
    <div className="shadow-sm w-full bg-base-200">
      <div className="navbar max-w-7xl mx-auto px-4 md:px-0">
        {/* Navbar Start */}
        <div className="navbar-start">
          {/* Mobile Hamburger Dropdown */}
          <Menu as="div" className="relative lg:hidden">
            <Menu.Button className="btn btn-ghost">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </Menu.Button>

            <Transition
              as={Fragment}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <Menu.Items className="absolute left-0 mt-2 w-56 origin-top-left bg-white dark:bg-gray-800 divide-y divide-gray-100 dark:divide-gray-700 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-50">
                <div className="px-1 py-2">
                  {user && (
                    <div className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                      Hello, {user.displayName || "User"}
                    </div>
                  )}
                  {commonLinks}
                  {!user && (
                    <li className="mt-2">
                      <Link
                        to="/login"
                        className="group flex rounded-md items-center w-full px-4 py-2 text-sm text-gray-900 dark:text-gray-100"
                      >
                        Login
                      </Link>
                    </li>
                  )}
                  {user && privateLinks}
                </div>
              </Menu.Items>
            </Transition>
          </Menu>

          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <img className="h-16 w-16 inline" src={logo} alt="Plate Share" />
            <h3 className="text-3xl font-bold inline">Plate Share</h3>
          </Link>
        </div>

        {/* Navbar Center */}
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1 text-lg text-gray-600 gap-8">
            {commonLinks}
          </ul>
        </div>

        {/* Navbar End */}
        <div className="navbar-end hidden lg:flex">
          {!user ? (
            <Link to="/login" className="btn px-8 py-2 hover:scale-105">
              Log In
            </Link>
          ) : (
            <Menu as="div" className="relative inline-block text-left">
              <div>
                <Menu.Button className="btn btn-ghost rounded-full w-12 h-12 overflow-hidden">
                  <img
                    src={user.photoURL || "/default-user.png"}
                    alt="User"
                    className="w-full h-full object-cover"
                  />
                </Menu.Button>
              </div>

              <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right bg-white dark:bg-gray-800 divide-y divide-gray-100 dark:divide-gray-700 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-50">
                  <div className="px-1 py-2">
                    <div className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                      Hello, {user.displayName || "User"}
                    </div>
                    {privateLinks}
                  </div>
                </Menu.Items>
              </Transition>
            </Menu>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
