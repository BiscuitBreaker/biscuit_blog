/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './app/**/*.{js,jsx,mdx}',
    './components/**/*.{js,jsx,mdx}',
    './content/**/*.{md,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        bg: '#0a0a0a',
        fg: '#e6e6e6',
        accent: {
          blue: '#60a5fa',
          pink: '#f472b6',
          teal: '#2dd4bf',
        },
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
};
