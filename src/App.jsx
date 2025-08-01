import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import SplashScreen from "./pages/Splash";
import Home from "./pages/Home";
import EventDetails from "./pages/EventDetails";
import Favorites from "./pages/Favorites";
import Profile from "./pages/Profile";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Footer from "./components/Footer";
import BiometricLogin from "./pages/BiometricLogin";

function App() {
  const location = useLocation();
  const hideNavbarOnPaths = ["/"];
  const shouldHideNavbar = hideNavbarOnPaths.includes(location.pathname);

  return (
    <div className="flex flex-col min-h-screen">
      {!shouldHideNavbar && <Navbar />}

      <main className="flex-grow flex flex-col">
        <Routes>
          <Route path="/" element={<SplashScreen />} />
          <Route path="/home" element={<Home />} />
          <Route path="/event/:id" element={<EventDetails />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/biometric-login" element={<BiometricLogin />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}

export default App;
