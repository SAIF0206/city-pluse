import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const SplashScreen = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timeout = setTimeout(() => {
      navigate("/home");
    }, 3000);
    return () => clearTimeout(timeout);
  }, [navigate]);

  return (
    <div className="relative w-full h-screen overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center blur-sm brightness-75"
        style={{
          backgroundImage: `url(${require("../assets/abu-dhabi.jpg")})`,
        }}
      />

      <div className="relative z-10 flex flex-col items-center justify-center h-full text-white text-center px-6">
        <h1 className="text-4xl md:text-6xl font-bold animate-fade-in">
          City Pulse
        </h1>
        <p className="mt-4 text-lg md:text-xl animate-fade-in delay-500">
          Your City, Your Events, Your Beat
        </p>
      </div>
    </div>
  );
};

export default SplashScreen;
