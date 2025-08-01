import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-4 px-4 text-sm">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3 text-center md:text-left">
        <div>
          <span className="font-semibold text-white">City Pulse</span> &copy;{" "}
          {new Date().getFullYear()}
        </div>

        <div className="flex flex-col md:flex-row gap-2 md:gap-4 text-xs md:text-sm">
          <span>📧 msaif.sam@gmail.com</span>
        </div>

        <div className="flex gap-4">
          <a
            href="https://www.linkedin.com/in/msaif02/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white"
          >
            LinkedIn
          </a>
          <a
            href="https://saif0206.github.io/dev/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white"
          >
            Portfolio
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
