import { useContext, useEffect, useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import axios from "axios";

// Import icons and images
import darkLogo from "../imgs/logo-dark.png";
import lightLogo from "../imgs/logo-light.png";
import { ThemeContext, UserContext } from "../App.jsx";
import UserNavigationPanel from "./user-navigation.component.jsx";
import { storeInSession } from "../common/session.jsx";
import { SunIcon, MoonIcon } from "@heroicons/react/20/solid";

const Navbar = () => {
  // State management for search box and user navigation panel
  const [searchBoxVisibility, setSearchBoxVisibility] = useState(false);
  const [userNavPanel, setUserNavPanel] = useState(false);

  // Navigation hook for programmatic routing
  const navigate = useNavigate();

  // Context hooks for theme and user authentication
  const { theme, setTheme } = useContext(ThemeContext);
  const {
    userAuth,
    userAuth: {
      access_token,
      profile_img,
      new_notification_available,
      isAdmin,
    },
    setUserAuth,
  } = useContext(UserContext);

  // Effect to check for new notifications when user is authenticated
  useEffect(() => {
    if (access_token) {
      axios
        .get(import.meta.env.VITE_SERVER_DOMAIN + "/new-notifications", {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        })
        .then(({ data }) => {
          // Update user authentication state with new notification data
          setUserAuth({ ...userAuth, ...data });
        })
        .catch((err) => {
          console.error("Error fetching notifications:", err);
        });
    }
  }, [access_token]);

  // Toggle user navigation panel visibility
  const handleUserNavPanel = () => {
    setUserNavPanel(!userNavPanel);
  };

  // Handle search functionality
  const handleSearch = (e) => {
    const query = e.target.value;

    // Perform search when Enter is pressed and query is not empty
    if (e.key === "Enter" && query.length) {
      // Navigate to search results page
      navigate(`/search/${query}`);

      // Hide search box on mobile screens
      if (window.innerWidth < 768) {
        setSearchBoxVisibility(false);
      }
    }
  };

  // Handle search button click for mobile view
  const handleSearchButtonClick = () => {
    // Toggle search box visibility
    setSearchBoxVisibility((currentVal) => !currentVal);

    // Remove focus from search input when closing
    if (searchBoxVisibility) {
      const searchInput = document.querySelector('input[placeholder="Search"]');
      if (searchInput) {
        searchInput.blur();
      }
    }
  };

  // Blur handler for user navigation panel
  const handleBlur = () => {
    // Slight delay to allow click events to process
    setTimeout(() => {
      setUserNavPanel(false);
    }, 200);
  };

  // Theme toggle functionality
  const changeTheme = () => {
    // Switch between light and dark themes
    const newTheme = theme === "light" ? "dark" : "light";

    // Update theme in context and local storage
    setTheme(newTheme);
    document.body.setAttribute("data-theme", newTheme);
    storeInSession("theme", newTheme);
  };

  return (
    <>
      <nav className="navbar z-50">
        {/* Logo */}
        <Link to="/" className="flex-none w-20">
          <img
            src={theme === "light" ? darkLogo : lightLogo}
            className="w-full md:-ml-4 lg:-ml-10"
            alt="logo"
          />
        </Link>

        {/* Search Box - Responsive with mobile toggle */}
        <div
          className={
            "absolute bg-white w-full left-0 top-full mt-0.5 border-b border-grey py-4 px-[5vw] " +
            "md:border-0 md:block md:relative md:inset-0 md:p-0 md:w-auto md:show " +
            (searchBoxVisibility ? "show" : "hide")
          }
        >
          <div className="relative">
            <input
              type="text"
              placeholder="Search"
              className="w-full md:w-auto bg-grey 
                p-4 pl-6 pr-[12%] md:pr-6 rounded-full 
                placeholder:text-dark-gray 
                md:pl-12"
              onKeyDown={handleSearch}
            />
            <i className="fi fi-rr-search absolute right-[10%] md:left-5 top-1/2 -translate-y-1/2 text-xl text-dark-gray pointer-events-none"></i>
          </div>
        </div>

        {/* Right-side Navigation Items */}
        <div
          className="flex items-center gap-3 
            md:gap-6 ml-auto"
        >
          {/* Mobile Search Toggle Button */}
          <button
            className="md:hidden bg-grey w-12 h-12 rounded-full 
                flex items-center justify-center"
            onClick={handleSearchButtonClick}
          >
            <i className="fi fi-rr-search text-xl"></i>
          </button>

          {/* Conditional Admin Write Link */}
          {isAdmin && (
            <Link to="/editor" className="hidden md:flex gap-2 link">
              <i className="fi fi-rr-edit"></i>
              <span>Write</span>
            </Link>
          )}

          {/* Theme Toggle Button */}
          <button
            className="w-12 h-12 rounded-full bg-grey relative flex items-center justify-center hover:bg-black/10"
            onClick={changeTheme}
          >
            {theme === "light" ? (
              <MoonIcon className="w-8 h-8 text-2xl" />
            ) : (
              <SunIcon className="w-8 h-8 text-2xl" />
            )}
          </button>

          {/* Authentication-based Navigation */}
          {access_token ? (
            <>
              {/* Notifications Link */}
              <Link to="/dashboard/notifications">
                <button className="w-12 h-12 rounded-full bg-grey relative hover:bg-black/10">
                  <i className="fi fi-rr-bell text-2xl block mt-1"></i>

                  {new_notification_available && (
                    <span className="bg-red w-3 h-3 rounded-full absolute z-10 top-2 right-2"></span>
                  )}
                </button>
              </Link>

              {/* User Profile Navigation */}
              <div
                className="relative"
                onClick={handleUserNavPanel}
                onBlur={handleBlur}
              >
                <button className="w-12 h-12 mt-1">
                  <img
                    src={profile_img}
                    className="w-full h-full object-cover rounded-full"
                    alt="User profile"
                  />
                </button>
                {userNavPanel && <UserNavigationPanel />}
              </div>
            </>
          ) : (
            // Authentication Links for Logged Out Users
            <>
              <Link to="/signin" className="btn-light py-2 ">
                Sign In
              </Link>
              <Link to="/signup" className="btn-dark py-2 hidden md:block">
                Sign Up
              </Link>
            </>
          )}
        </div>
      </nav>

      {/* Outlet for nested routes */}
      <Outlet />
    </>
  );
};

export default Navbar;
