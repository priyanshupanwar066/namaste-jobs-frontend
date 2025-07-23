"use client";

import { useState, useEffect, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { Menu, X, Search, ChevronDown } from "lucide-react";
import { motion } from "framer-motion";
import { useAuth } from "@/context/AuthContext";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [categoryOpen, setCategoryOpen] = useState(false);
  const [locationOpen, setLocationOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState("");
  const router = useRouter();
  const pathname = usePathname();
  const categoryRef = useRef(null);
  const locationRef = useRef(null);
  const { user, logout } = useAuth();

  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const response = await fetch("/api/auth/me", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        if (response.ok) {
          const userData = await response.json();
          setIsLoggedIn(true);
          setUserRole(userData.role);
        } else {
          clearAuthState();
        }
      } catch (error) {
        clearAuthState();
      }
    };

    const handleClickOutside = (event) => {
      if (categoryRef.current && !categoryRef.current.contains(event.target)) {
        setCategoryOpen(false);
      }
      if (locationRef.current && !locationRef.current.contains(event.target)) {
        setLocationOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    checkAuthStatus();

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const clearAuthState = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    setUserRole("");
  };

  const handleLogout = () => {
    clearAuthState();
    router.push("/login");
  };

  const navigateToJobs = (type, value) => {
    router.push(`/jobs?${type}=${encodeURIComponent(value)}`);
    setCategoryOpen(false);
    setLocationOpen(false);
    setMenuOpen(false);
  };

  const handleSearch = (e) => {
    if (e.key === "Enter" && searchQuery.trim()) {
      router.push(`/jobs?search=${encodeURIComponent(searchQuery)}`);
      setSearchQuery("");
      setMenuOpen(false);
    }
  };

  

  return (
    <nav className="bg-white shadow-lg fixed w-full top-0 left-0 z-50 border-b border-gray-100">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <Link
          href="/"
          className="flex items-center space-x-2"
          onClick={() => setMenuOpen(false)}
        >
          <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Namaste Jobs
          </span>
        </Link>

        <div className="hidden md:flex items-center space-x-8">
          <div className="flex items-center space-x-6">
            {[
              { name: "Home", path: "/" },
              { name: "Jobs", path: "/jobs" },
              { name: "About", path: "/about" },
              { name: "Contact", path: "/contact" },
            ].map((item) => (
              <Link
                key={item.name}
                href={item.path}
                className={`relative text-gray-700 hover:text-blue-600 transition-colors ${
                  pathname === item.path ? "font-semibold text-blue-600" : ""
                }`}
                onClick={() => setMenuOpen(false)}
              >
                {item.name}
                {pathname === item.path && (
                  <motion.div
                    className="absolute -bottom-1 left-0 w-full h-0.5 bg-blue-600"
                    layoutId="nav-underline"
                  />
                )}
              </Link>
            ))}
          </div>

          <div className="flex items-center space-x-4">
            <div className="relative" ref={categoryRef}>
              <button
                onClick={() => setCategoryOpen(!categoryOpen)}
                className="flex items-center px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:shadow-lg transition-all"
              >
                Categories <ChevronDown className="ml-2 h-4 w-4" />
              </button>
              {categoryOpen && (
                <div className="absolute mt-2 w-48 bg-white shadow-xl rounded-lg py-2 z-50 border border-gray-100">
                  {[
                    "Software Developer",
                    "Web Developer",
                    "Design",
                    "IT",
                    "Marketing",
                    "Finance",
                    "Healthcare",
                    "Teacher",
                    "Education",
                    "Consulting",
                    "Other",
                  ].map((category) => (
                    <button
                      key={category}
                      onClick={() => navigateToJobs("category", category)}
                      className="block w-full px-4 py-3 text-left text-gray-700 hover:bg-blue-50 transition-colors"
                    >
                      {category}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="relative" ref={locationRef}>
              <button
                onClick={() => setLocationOpen(!locationOpen)}
                className="flex items-center px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:shadow-lg transition-all"
              >
                Locations <ChevronDown className="ml-2 h-4 w-4" />
              </button>
              {locationOpen && (
                <div className="absolute mt-2 w-48 bg-white shadow-xl rounded-lg py-2 z-50 border border-gray-100">
                  {[
                    "Delhi",
                    "Mumbai",
                    "Bangalore",
                    "Hyderabad",
                    "Pune",
                    "Kolkata",
                    "Chennai",
                    "Ahmedabad",
                    "Jaipur",
                    "Other",
                    "International",
                    "Remote",
                  ].map((location) => (
                    <button
                      key={location}
                      onClick={() => navigateToJobs("location", location)}
                      className="block w-full px-4 py-3 text-left text-gray-700 hover:bg-blue-50 transition-colors"
                    >
                      {location}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

           <div className="hidden md:flex items-center gap-6">
          

          {user ? (
            <>
              <Link href="/profile" className="text-sm text-gray-700 hover:text-blue-600">
                Profile
              </Link>
              {user.role === "admin" && (
                <Link href="/dashboard" className="text-sm text-gray-700 hover:text-blue-600">
                  Dashboard
                </Link>
              )}
              <button
                onClick={() => {
                  logout();
                  router.push("/login");
                }}
                className="text-sm text-red-600 hover:text-red-700"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                href="/register"
                className="text-sm bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              >
                Register
              </Link>
              <Link
                href="/login"
                className="text-sm border border-blue-600 text-blue-600 px-4 py-2 rounded hover:bg-blue-50"
              >
                Login
              </Link>
            </>
          )}
        </div>
          <div className="relative">
            <input
              type="text"
              placeholder="Search jobs..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={handleSearch}
              className="pl-4 pr-10 py-2 w-64 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <div className="absolute right-3 top-2.5 text-gray-400">
              <Search size={20} />
            </div>
          </div>
        </div>

        <button
          className="md:hidden text-gray-700 hover:text-blue-600 transition-colors"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {menuOpen && (
        <div className="md:hidden px-6 pb-4 space-y-4 bg-white">
          <div className="space-y-2">
            {[
              { name: "Home", path: "/" },
              { name: "Jobs", path: "/jobs" },
              { name: "About", path: "/about" },
              { name: "Contact", path: "/contact" },
            ].map((item) => (
              <Link
                key={item.name}
                href={item.path}
                className="block py-2 text-gray-700 hover:text-blue-600 transition-colors"
                onClick={() => setMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
          </div>

          <div className="space-x-4">
        {!user && (
          <>
            <Link href="/login">Login</Link>
            <Link href="/register">Register</Link>
          </>
        )}

        {user && (
          <>
            <Link href="/profile">Profile</Link>

            {user.role === "admin" && (
              <Link href="/dashboard">Dashboard</Link>
            )}

            <button onClick={logout} className="ml-2 bg-red-600 px-3 py-1 rounded">
              Logout
            </button>
          </>
        )}
      </div>


          <div className="pt-4 border-t border-gray-100">
            <input
              type="text"
              placeholder="Search jobs..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={handleSearch}
              className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
