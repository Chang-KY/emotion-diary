// tailwind.config.ts
import type {Config} from "tailwindcss";

const config: Config = {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  darkMode: 'media', // 또는 'class'
  theme: {
    extend: {
      keyframes: {
        'slide-up': {
          '0%': {transform: 'translateY(100%)'},
          '100%': {transform: 'translateY(0%)'},
        },
      },
      animation: {
        'slide-up': 'slide-up 0.3s ease-out',
      },
    },
  },
  plugins: [],
};

export default config;
