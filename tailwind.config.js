module.exports = {
  content: ['storyblok/**/*.{vue,js}', 'pages/**/*.vue'],
  safelist: ['bg-white', 'hover:bg-white', 'text-white', 'hover:text-white', 'border-white'],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: '1rem',
        lg: '2rem',
      },
    },
    fontFamily: {
      sans: 'Oxygen, sans-serif',
    },
    extend: {
      colors: {
        primary: '#437C90',
        primary_alt: '#2cafdc',
        //primary_alt: '#3794b4',
        secondary: '#D55672',
        tertiary: '#E8985E',
        light: '#f6f7f7',
        medium: '#bfc7c5',
        dark: '#152336',
      },
    },
  },
  plugins: [require('@tailwindcss/typography'), require('@tailwindcss/line-clamp')],
}
