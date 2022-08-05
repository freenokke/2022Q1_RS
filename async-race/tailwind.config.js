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
          boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)'
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
        '.btn-orange': {
          backgroundColor: 'rgb(252 211 77)',
          color: '#fff',
          '&:hover': {
            backgroundColor: 'rgb(217 119 6)'
          },
        },
        '.btn-pressed': {
          backgroundColor: 'rgb(203 213 225)',
          color: 'rgb(0, 0, 0)',
          boxShadow: '0px 5px 10px 2px rgba(34, 60, 80, 0.2) inset'
        },
      });
    }),
  ],
};
