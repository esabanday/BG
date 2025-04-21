import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        orbitron: ['var(--font-orbitron)'],
      },
      colors: {
        'neon-blue': '#00A6FF',
        'neon-purple': '#BC00FF',
        'dark-bg': '#0A0A1F',
      },
    },
  },
  plugins: [],
};

export default config; 