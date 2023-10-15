module.exports = {
  future: {
    removeDeprecatedGapUtilities: true,
  },
  content: [
    './public/**/*.html',
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    container: {
      center: true,
    }
  },
  variants: {},
  plugins: [
    require('@tailwindcss/aspect-ratio'),
  ],
  safelist: [
    'grid-cols-5',
    'grid-cols-6',
    'grid-cols-7',
    'grid-cols-8',
    'grid-cols-9',
    'grid-cols-10',
  ]
}
