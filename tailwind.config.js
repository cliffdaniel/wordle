/** @type {import('tailwindcss').Config} */
export default {
  purge: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      backgroundImage: {
        'checked': "url('/bg-checked.png')",
        'unchecked': "url('/bg-unchecked.png')",
      },
      backgroundColor: {
        'layout-dark': '#262B3C',
        'layout-white': '#FFFFFF',
        'header-light': '#F3F3F3',
        'header-dark': '#2c3141',
        'cell-light': 'rgba(147, 155, 159, 0.30)',
        'cell-dark': 'rgba(147, 155, 159, 0.20)',
        'keyboard-light': 'rgba(218, 220, 224, 0.30)',
        'keyboard-dark': 'rgba(218, 220, 224, 0.03)',
        'key-light': '#D3D6DA',
        'key-dark': '#565F7E',
      },
      colors: {
        'header-light': '#202537',
        'header-dark': '#DADCE0',
        'key-light': '#56575E',
        'key-dark': '#FFFFFF',
        primary: {
          light: '#64B5F6',
          DEFAULT: '#2196F3',
          dark: '#1976D2',
        },
        secondary: {
          light: '#FFD54F',
          DEFAULT: '#FFC107',
          dark: '#FFA000',
        },
        gray: {
          DEFAULT: '#818181',
        },
      },
    },
  },
  plugins: [],
}
