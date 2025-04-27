// tailwind.config.js
export default {
    content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
      extend: {
        colors: {
          'custom-blue': '#1fb6ff',
          'custom-purple': '#7e5bef',
          'custom-pink': '#ff49db',
          'custom-grey': '#fff'
        }
      }
    },
    plugins: [],
  }