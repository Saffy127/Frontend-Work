/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'metal-black': 'var(--color-metal-black)',
        'metal-gray': 'var(--color-metal-gray)',
        'metal-silver': 'var(--color-metal-silver)',
        'metal-gold': 'var(--color-metal-gold)',
        'metal-red': 'var(--color-metal-red)',
        'metal-purple': 'var(--color-metal-purple)',
      },
    },
  },
  plugins: [],
}