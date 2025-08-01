import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useLanguage } from "../context/LanguageContext";
import avatar from "../assets/avatar.jpg";

const Navbar = () => {
  const { currentUser, logout } = useAuth();
  const { lang, toggleLanguage } = useLanguage();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const isArabic = lang === "ar";

  const handleLogout = async () => {
    try {
      await logout();
      setMenuOpen(false);
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error.message);
    }
  };

  const handleNav = (path) => {
    setMenuOpen(false);
    navigate(path);
  };

  return (
    <nav className="bg-white shadow sticky top-0 z-10">
      <div
        className={`max-w-7xl mx-auto px-4 py-3 flex items-center justify-between ${
          isArabic ? "flex-row-reverse" : ""
        }`}
      >
        <div className="flex items-center justify-between w-full md:w-auto">
          <Link
            to="/"
            onClick={() => setMenuOpen(false)}
            className="text-xl font-bold text-blue-600"
          >
            {isArabic ? "نبض المدينة 🎫 " : "🎫 City Pulse"}
          </Link>

          <button
            className="md:hidden text-gray-700 focus:outline-none"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {menuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        <div
          className={`flex-col md:flex-row md:flex items-center md:gap-4 w-full md:w-auto mt-4 md:mt-0 ${
            menuOpen ? "flex" : "hidden"
          } ${isArabic ? "text-right" : "text-left"}`}
        >
          <Link
            to="/home"
            onClick={() => setMenuOpen(false)}
            className="block px-2 py-1 text-gray-700 hover:text-blue-500"
          >
            {isArabic ? "الرئيسية" : "Home"}
          </Link>

          <Link
            to="/favorites"
            onClick={() => setMenuOpen(false)}
            className="block px-2 py-1 text-gray-700 hover:text-blue-500"
          >
            {isArabic ? "المفضلة" : "Favorites"}
          </Link>

          {currentUser && (
            <Link
              to="/profile"
              onClick={() => setMenuOpen(false)}
              className="block px-2 py-1 text-gray-700 hover:text-blue-500"
            >
              {isArabic ? "الملف الشخصي" : "Profile"}
            </Link>
          )}

          <button
            onClick={() => {
              toggleLanguage();
              setMenuOpen(false);
            }}
            className="text-sm border px-3 py-1 rounded hover:bg-gray-100 mt-2 md:mt-0"
          >
            {lang === "en" ? "AR ↔️" : "EN ↔️"}
          </button>

          {currentUser ? (
            <div className="flex items-center gap-2 mt-3 md:mt-0">
              <img
                src={avatar}
                alt="avatar"
                className="w-8 h-8 rounded-full object-cover border"
              />

              <span className="text-sm text-gray-600 hidden sm:inline">
                {currentUser.displayName || currentUser.email}
              </span>
              <button
                onClick={handleLogout}
                className="px-3 py-1 text-sm bg-red-100 text-red-600 rounded hover:bg-red-200"
              >
                {isArabic ? "تسجيل الخروج" : "Logout"}
              </button>
            </div>
          ) : (
            <div className="flex flex-col md:flex-row md:items-center gap-2 mt-3 md:mt-0">
              <Link
                to="/login"
                onClick={() => setMenuOpen(false)}
                className="text-sm text-blue-600 hover:underline"
              >
                {isArabic ? "تسجيل الدخول" : "Login"}
              </Link>
              <Link
                to="/signup"
                onClick={() => setMenuOpen(false)}
                className="text-sm text-blue-600 hover:underline"
              >
                {isArabic ? "إنشاء حساب" : "Sign Up"}
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
