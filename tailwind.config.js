/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}", // Tailwind CSS가 적용될 파일 경로
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#1D4ED8", // 기본 파란색
          dark: "#1E40AF", // 어두운 파란색
        },
      },
      spacing: {
        128: "32rem", // 128 단위의 spacing 추가
      },
    },
  },
  plugins: [],
};
