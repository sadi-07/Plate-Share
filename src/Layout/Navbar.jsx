import React, { useContext, Fragment } from "react";
import { Link, NavLink } from "react-router";
import { Menu, Transition } from "@headlessui/react";
import logo from "../assets/Logo.png";
import { AuthContext } from "../Contetexts/AuthProvider";

const Navbar = () => {
  const { user, removeUser } = useContext(AuthContext);
  console.log("Navbar user:", user);
  console.log(user.photoURL);
  console.log("NAVBAR PHOTO:", user?.photoURL);


  const handleLogout = () => {
    removeUser();
  };


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
            isActive ? "text-primary font-semibold" : ""
          }
        >
          Available Foods
        </NavLink>
      </li>
    </>
  );

  // Private dropdown items for logged-in users
  const privateLinks = (
    <>
      <Menu.Item>
        {({ active }) => (
          <Link
            to="/addFood"
            className={`${active ? "bg-gray-700/40" : ""
              } group flex rounded-md w-full px-4 py-2 text-sm text-gray-300`} // ★ FIX: text-gray-300
          >
            Add Food
          </Link>
        )}
      </Menu.Item>

      <Menu.Item>
        {({ active }) => (
          <Link
            to="/manageMyFoods"
            className={`${active ? "bg-gray-700/40" : ""
              } group flex rounded-md w-full px-4 py-2 text-sm text-gray-300`} // ★ FIX: text-gray-300
          >
            Manage My Foods
          </Link>
        )}
      </Menu.Item>

      <Menu.Item>
        {({ active }) => (
          <Link
            to="/myFoodRequests"
            className={`${active ? "bg-gray-700/40" : ""
              } group flex rounded-md w-full px-4 py-2 text-sm text-gray-300`} // ★ FIX: text-gray-300
          >
            My Food Requests
          </Link>
        )}
      </Menu.Item>

      <Menu.Item>
        {({ active }) => (
          <button
            onClick={handleLogout}
            className={`${active ? "bg-gray-700/40" : ""
              } group flex rounded-md w-full px-4 py-2 text-sm text-red-400`} // keep logout color visible but softer for contrast
          >
            Logout
          </button>
        )}
      </Menu.Item>
    </>
  );

  return (
    /* ★ FIX: make navbar sticky at top and above content with z-40 */
    <div className="sticky top-0 z-40 shadow-sm w-full bg-base-200">
      <div className="navbar max-w-7xl mx-auto px-4 lg:px-0">
        {/* Navbar Start */}
        <div className="navbar-start">
          {/* Mobile LEFT dropdown (hamburger) */}
          <Menu as="div" className="relative lg:hidden">
            <Menu.Button className="btn btn-ghost">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
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
              {/* ★ FIX: dropdown text color set to text-gray-300 for items below (applied to inner text) */}
              <Menu.Items className="absolute left-0 mt-2 w-56 origin-top-left bg-white dark:bg-gray-900 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 z-50">
                <div className="px-2 py-3">
                  <ul className="space-y-1">
                    <li>
                      <Link className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-600" to="/">
                        Home
                      </Link>
                    </li>
                    <li>
                      <Link className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-600" to="/availableFoods">
                        Available Foods
                      </Link>
                    </li>
                  </ul>
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

        {/* Navbar Center (Desktop only) */}
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1 text-lg font-semibold text-gray-700 gap-8">
            {commonLinks}
          </ul>
        </div>

        {/* Navbar End (Profile dropdown on right) */}
        <div className="navbar-end">
          {!user ? (
            <>
              {/* Mobile profile dropdown when NOT logged in */}


              {/* Desktop login button */}
              <Link to="/login" className="btn px-6 py-2 lg:flex">
                Log In
              </Link>
            </>
          ) : (
            <>





              {/* Mobile + Desktop profile dropdown WHEN LOGGED IN */}
              <Menu as="div" className="relative">




                <Menu.Button className="rounded-full w-12 h-12 overflow-hidden border border-primary">
                  <img
                    src={user?.photoURL}
                    alt="User"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover !brightness-100 !contrast-100"
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
                      {/* ★ FIX: greeting color */}
                      <p className="text-xl font-semibold text-primary"><span className="text-base text-gray-300">Hello,</span> {user.displayName || "User"}</p>
                    </div>

                    <div className="px-1 py-2">
                      {/* privateLinks uses text-gray-300 in the elements above */}
                      {privateLinks}
                    </div>
                  </Menu.Items>
                </Transition>
              </Menu>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
