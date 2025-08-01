// tailwind.config.js
module.exports = {
  content: ["./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      animation: {
        fadeIn: "fadeIn 1s ease-out forwards",
        spinSlow: "spin 6s linear infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: 0, transform: "translateY(20px)" },
          "100%": { opacity: 1, transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [],
};
