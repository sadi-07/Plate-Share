import React, { useContext, Fragment } from "react";
import { Link, NavLink } from "react-router";
import { Menu, Transition } from "@headlessui/react";
import logo from "../assets/Logo.png";
import { AuthContext } from "../Contetexts/AuthProvider";

const Navbar = () => {
  const { user, removeUser } = useContext(AuthContext);

  const handleLogout = () => removeUser();

  const commonLinks = (
    <>
      <li>
        <NavLink to="/" className={({ isActive }) => isActive ? "text-primary font-semibold" : ""}>
          Home
        </NavLink>
      </li>
      <li>
        <NavLink to="/availableFoods" className={({ isActive }) => isActive ? "text-primary font-semibold" : ""}>
          Available Foods
        </NavLink>
      </li>
    </>
  );

  const privateLinks = (
    <>
      <Menu.Item>
        {({ active }) => (
          <Link to="/addFood" className={`${active ? "bg-gray-700/40" : ""} group flex rounded-md w-full px-4 py-2 text-sm text-gray-300`}>
            Add Food
          </Link>
        )}
      </Menu.Item>
      <Menu.Item>
        {({ active }) => (
          <Link to="/myFoods" className={`${active ? "bg-gray-700/40" : ""} group flex rounded-md w-full px-4 py-2 text-sm text-gray-300`}>
            Manage My Foods
          </Link>
        )}
      </Menu.Item>
      <Menu.Item>
        {({ active }) => (
          <Link to="/myFoodRequests" className={`${active ? "bg-gray-700/40" : ""} group flex rounded-md w-full px-4 py-2 text-sm text-gray-300`}>
            My Food Requests
          </Link>
        )}
      </Menu.Item>
      <Menu.Item>
        {({ active }) => (
          <button onClick={handleLogout} className={`${active ? "bg-gray-700/40" : ""} group flex rounded-md w-full px-4 py-2 text-sm text-red-400`}>
            Logout
          </button>
        )}
      </Menu.Item>
    </>
  );

  return (
    <div className="sticky top-0 z-40 shadow-sm w-full bg-base-200">
      <div className="navbar max-w-7xl mx-auto px-4 lg:px-0">

        <div className="navbar-start lg:hidden">
          <div className="dropdown">
            <button tabIndex={0} className="btn btn-ghost">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none"
                viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>

            <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52 z-50">
              {commonLinks}
            </ul>
          </div>
        </div>

        <div className="navbar-center lg:navbar-start">
          <Link to="/" className="flex items-center gap-2 mx-auto lg:mx-0">
            <img className="h-16 w-16" src={logo} alt="Plate Share" />
            <h3 className="text-3xl font-bold">Plate Share</h3>
          </Link>
        </div>

        <div className="navbar-center hidden lg:flex ml-[-120px]">
          <ul className="menu menu-horizontal px-1 text-xl font-semibold text-gray-700 gap-8">
            {commonLinks}
          </ul>
        </div>

        <div className="navbar-end">
          {!user ? (
            <Link to="/login" className="btn px-6 py-2 lg:flex">Log In</Link>
          ) : (
            <Menu as="div" className="relative">
              <Menu.Button className="rounded-full w-12 h-12 overflow-hidden border border-primary cursor-pointer">
                <img
                  src={user?.photoURL || "/default-user.png"}
                  alt={user?.displayName || "User"}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
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
                <Menu.Items className="absolute right-0 mt-2 w-56 bg-white dark:bg-gray-900 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 z-50">
                  <div className="px-4 py-3">
                    <p className="text-xl font-semibold text-primary">
                      <span className="text-base text-gray-300">Hello,</span> {user?.displayName}
                    </p>
                  </div>
                  <div className="px-1 py-2">{privateLinks}</div>
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
