/** @type {import('tailwindcss').Config} */
const { default: plugin } = require('tailwindcss');
const pluginTail = require('tailwindcss/plugin');

module.exports = {
  // important: true,
  content: ['./src/*.{ts,js}', './src/**/*.{ts,js}', './src/*.html'],
  theme: {
    extend: {},
  },
  plugins: [
    pluginTail(function ({ addComponents }) {
      addComponents({
        '.btn': {
          padding: '.5rem 1rem',
          borderRadius: '.25rem',
          fontWeight: '600',
        },
        '.btn-blue': {
          backgroundColor: '#3490dc',
          color: '#fff',
          '&:hover': {
            backgroundColor: '#2779bd',
          },
        },
        '.btn-red': {
          backgroundColor: '#e3342f',
          color: '#fff',
          '&:hover': {
            backgroundColor: '#cc1f1a'
          },
        },
      });
    }),
  ],
};
