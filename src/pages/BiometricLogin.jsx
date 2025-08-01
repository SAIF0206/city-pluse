import React from "react";
import { useNavigate, Link } from "react-router-dom";
import { startAuthentication } from "@simplewebauthn/browser";

const BiometricLogin = () => {
  const navigate = useNavigate();

  const handleBiometricLogin = async () => {
    try {
      const options = {
        challenge: Uint8Array.from("random-challenge", (c) => c.charCodeAt(0)),
        rpId: window.location.hostname,
        allowCredentials: [],
        userVerification: "preferred",
      };

      const result = await startAuthentication(options);
      console.log("Biometric login successful:", result);
      localStorage.setItem("user", JSON.stringify({ biometric: true }));
      navigate("/home");
    } catch (err) {
      console.error("Biometric login failed:", err);
      alert("Biometric login failed. Try password login.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-700 to-indigo-900 text-white">
      <div className="bg-white bg-opacity-10 p-10 rounded-lg backdrop-blur-md shadow-xl text-center max-w-md w-full">
        <h1 className="text-2xl font-semibold mb-6">Biometric Login</h1>

        <button
          onClick={handleBiometricLogin}
          className="bg-white text-blue-800 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition"
        >
          Use Face ID / Fingerprint
        </button>

        <p className="mt-4 text-sm">
          Or{" "}
          <Link
            to="/login"
            className="underline text-white hover:text-gray-300"
          >
            log in with email/password
          </Link>
        </p>
      </div>
    </div>
  );
};

export default BiometricLogin;
