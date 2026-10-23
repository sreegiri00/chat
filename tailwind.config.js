/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        whatsapp: {
          light: '#00a884',
          dark: '#111b21',
          panel: '#202c33',
          header: '#202c33',
          incoming: '#202c33',
          outgoing: '#005c4b',
          border: '#222d34',
          subtext: '#8696a0',
          hover: '#2a3942',
          active: '#222d34',
          input: '#2a3942',
          lightBg: '#efeae2',
          lightPanel: '#f0f2f5',
          lightHeader: '#f0f2f5',
          lightOutgoing: '#d9fdd3',
          lightIncoming: '#ffffff',
          lightBorder: '#e9edef',
          lightHover: '#f5f6f6'
        }
      }
    },
  },
  plugins: [],
}
